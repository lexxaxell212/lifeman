# Project Rules Index

Map: `glob` -> rule file. Rules are load-bearing; read matching files before editing.

## Rules

- `deploy/**`, `bootstrap/cache/**`, `.env*`, `config/**` → see below
- `resources/js/**` → see frontend

---

## Frontend / i18n

- All user-facing text lives in `resources/js/lib/i18n.tsx` (single `translations` object with `en`/`id` pairs, default `en`, persisted in localStorage key `lifeman.lang`, stored _as text not chars_). Any new UI string MUST be added as a key there and referenced via `const { t } = useI18n();`.
- In components, `useI18n()` is a hook — only callable in render. For module-scope strings (Inertia page `.layout = { breadcrumbs: [...] }`, static titles), use `getT()` imported from the same module: `const pageBreadcrumb = getT();` near module scope; it resolves the current language at call time.
- Class/static renderers (e.g. error boundary) use `getT()` too. Do NOT call `t`/`useI18n` in `lib/notification.ts` or similar non-component modules.
- React-Hooks lint: never rename non-hook helpers with a `use` prefix.
- Settings layout lives in `layouts/settings/layout.tsx`; it's intentionally compact (small heading variant, tight nav pills, `space-y-3` content). Keep it dense — do not widen back to `space-y-4`/`gap-12` without user request.

---

## Deploy & Cache

- This project relies heavily on Laravel caches: config, route, view, event, plus session/`file` cache and built Vite assets. After most code/config changes on this VPS you must rebuild the relevant cache or changes won't show up.
- `bootstrap/cache/` and `storage/` are owned by `www-data` with group `www-data`; `lexx` is in the `www-data` group and the dirs are `g+w`, so CLI runs as `lexx` can write. If a deploy re-created them without group write (fresh clone / `composer install`), re-run `sudo chmod -R g+w storage bootstrap/cache && sudo chmod -R g+s storage bootstrap/cache` or blade/view compile and `wayfinder:generate` (which compiles views into `storage/framework/views/`) fail with `tempnam(): file created in the system's temporary directory`.
- Always run cache commands as `sudo -u www-data php artisan ...` (or `sudo rm` + rebuild as www-data) when in doubt about stale results.
- Stale `bootstrap/cache/config.php` makes Laravel skip loading `.env` (dotenv skipped when config is cached), so a cached-from-old-env config resurrects old URLs — symptom: site redirects to a previous domain.
- Standard rebuild after deploy: `php artisan optimize:clear` then `sudo -u www-data php artisan config:cache` (route/view/event cache). `deploy/deploy.sh` does this for release deploys.
- Frontend changes need `npm run build` (or dev server) to be visible in the installed APK.