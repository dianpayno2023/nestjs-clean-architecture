# Struktur `src`

Folder `src` adalah pusat code aplikasi NestJS.

## Isi folder

- `main.ts`: titik awal aplikasi. Di sini NestJS dibuat dan global validation diaktifkan.
- `app.module.ts`: module root yang menggabungkan semua module fitur.
- `modules/`: tempat semua fitur bisnis, misalnya `user`, `product`, dan seterusnya.
- `infrastructure/`: tempat hal teknis yang dipakai lintas module, misalnya koneksi database.

## Flow request

Request HTTP masuk ke `controller`, diteruskan ke `service`, lalu `service` memakai `repository interface`. Implementasi repository yang sebenarnya ada di `infrastructure/postgres`.

