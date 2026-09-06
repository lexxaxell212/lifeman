# lifeman

Aplikasi manajemen keuangan pribadi berbasis **Laravel 13 + Inertia (React) + Capacitor**. Diakses sebagai web (`lifeman.lxx.my.id`) dan Android app.

## Isi Repo

| Folder | Deskripsi |
| ------ | --------- |
| `app/` | Logika aplikasi (models, controllers, Filament admin, jobs, dll.) |
| `resources/js/` | Frontend React (Inertia) — komponen, halaman, hooks (termasuk back-handler Capacitor) |
| `public/` | Web root — `index.php`, build assets, storage symlink |
| `server/` | Salinan konfigurasi nginx site `lifeman.lxx.my.id` |
| `database/` | Migrations & seeders |
| `scripts/`, `deploy/` | Utilitas tambahan & deploy |

## Cara Penggunaan

### Prasyarat
- PHP 8.5 + Composer
- Node 20+ dan npm

### Setup

```bash
composer install
cp .env.example .env        # isi APP_KEY (php artisan key:generate), DB_, dll.
npm install
php artisan storage:link
php artisan migrate --seed
NODE_ENV=production npm run build   # bangun aset frontend
```

### Menjalankan

```bash
npm run dev                 # mode development (Vite HMR)
php artisan serve           # atau via nginx → public/
```

Untuk menjalankan di Android/Capacitor:

```bash
npx cap sync
npx cap open android
```

### Deploy

- Nginx root: `~/lifeman/public` (lihat `server/lifeman.lxx.my.id`)
- Setelah setiap perubahan: `php artisan optimize:clear && php artisan optimize`