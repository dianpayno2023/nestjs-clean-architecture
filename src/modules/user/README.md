# Struktur `src/modules/user`

Folder ini adalah contoh implementasi satu fitur lengkap.

## Penjelasan folder

- `controllers/`: menerima request dari client dan memanggil service.
- `services/`: tempat business logic. Service tidak tahu detail SQL.
- `repositories/`: kontrak method yang harus tersedia, misalnya `create` dan `findAll`.
- `infrastructure/postgres/`: implementasi repository untuk PostgreSQL dan file query SQL.
- `dto/`: bentuk data request yang masuk dari client.
- `interfaces/`: bentuk data domain atau response. Ini adalah pengganti "model" saat tidak memakai ORM.

## Kalau mau bikin model, taruh di mana?

Karena project ini tidak memakai ORM, saya sarankan tidak membuat `model` seperti di Sequelize atau Prisma.

Gunakan:

- `interfaces/` untuk mendefinisikan bentuk object data, misalnya `User`.
- Kalau nanti butuh object domain yang lebih kompleks, kamu bisa buat folder `entities/`.

## Urutan kerja saat menambah fitur baru

1. Buat `dto` untuk validasi request.
2. Buat `interfaces` untuk bentuk data output.
3. Buat `repository interface` untuk kontrak data access.
4. Buat implementasi repository di `infrastructure/postgres`.
5. Buat `service` untuk business logic.
6. Buat `controller` untuk endpoint.
7. Daftarkan semuanya di `feature.module.ts`.

