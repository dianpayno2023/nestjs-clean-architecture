# Struktur `src/infrastructure/database`

Folder ini menyimpan service koneksi database.

- `postgres.service.ts`: pembungkus `pg.Pool` untuk menjalankan raw query ke PostgreSQL.

Kenapa dipisah?

Supaya code koneksi database tidak diulang di setiap repository.

