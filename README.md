# lifeman

Personal finance management app built on **Laravel 13 + Inertia (React) + Capacitor**. Accessible as a web app (`lifeman.dzfee.id`) and an Android app.

## What's Inside

| Folder | Description |
| ------ | ----------- |
| `app/` | App logic (models, controllers, Filament admin, jobs, etc.) |
| `resources/js/` | React frontend (Inertia) — components, pages, hooks (including the Capacitor back-handler) |
| `public/` | Web root — `index.php`, build assets, storage symlink |
| `server/` | Copy of the nginx site config for `lifeman.dzfee.id` |
| `database/` | Migrations & seeders |
| `scripts/`, `deploy/` | Extra utilities & deployment |

## How to Use

### Prerequisites
- PHP 8.5 + Composer
- Node 20+ and npm

### Setup

```bash
composer install
cp .env.example .env        # set APP_KEY (php artisan key:generate), DB_, etc.
npm install
php artisan storage:link
php artisan migrate --seed
NODE_ENV=production npm run build   # build frontend assets
```

### Run

```bash
npm run dev                 # development mode (Vite HMR)
php artisan serve           # or via nginx → public/
```

For Android/Capacitor:

```bash
npx cap sync
npx cap open android
```

### Deploy

- Nginx root: `~/lifeman/public` (see `server/lifeman.dzfee.id`)
- After any change: `php artisan optimize:clear && php artisan optimize`