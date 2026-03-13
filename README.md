# NestJS Clean Architecture With Raw Query

Project ini adalah contoh backend NestJS tanpa ORM, memakai PostgreSQL dan raw SQL query.

## Stack

- NestJS
- PostgreSQL
- `pg`
- Docker Compose

## Cara menjalankan dengan local machine

1. Copy file environment:

```bash
cp .env.example .env
```

2. Jalankan PostgreSQL:

```bash
docker compose up -d postgres
```

3. Install dependency:

```bash
npm install
```

4. Jalankan aplikasi:

```bash
npm run start:dev
```

API akan aktif di `http://localhost:3000`.

## Cara menjalankan full stack dengan Docker

1. Copy environment:

```bash
cp .env.example .env
```

2. Jalankan semua service:

```bash
docker compose up --build
```

## Endpoint contoh

### `POST /users`

```json
{
  "name": "Dian",
  "email": "dian@example.com"
}
```

### `GET /users`

Mengambil daftar user yang sudah tersimpan.

## Arsitektur request

1. `UserController` menerima request HTTP.
2. `UserService` menjalankan logic bisnis.
3. `UserRepositoryInterface` menjadi kontrak akses data.
4. `UserPostgresRepository` menjalankan query SQL.
5. `PostgresService` berbicara langsung ke PostgreSQL.

## Struktur folder penting

- `src/modules/user/controllers`: endpoint HTTP.
- `src/modules/user/services`: business logic.
- `src/modules/user/repositories`: kontrak repository.
- `src/modules/user/infrastructure/postgres`: query SQL dan implementasi repository Postgres.
- `src/modules/user/dto`: validasi request.
- `src/modules/user/interfaces`: bentuk data domain, pengganti model ORM.
- `src/infrastructure/database`: service koneksi database.
- `database/init`: SQL awal yang otomatis dijalankan oleh PostgreSQL di Docker.

## Tempat bikin file saat menambah fitur baru

- DTO baru: taruh di `src/modules/nama-fitur/dto`
- Bentuk data atau "model" tanpa ORM: taruh di `src/modules/nama-fitur/interfaces`
- Repository interface: taruh di `src/modules/nama-fitur/repositories`
- Query SQL dan repository Postgres: taruh di `src/modules/nama-fitur/infrastructure/postgres`
- Business logic: taruh di `src/modules/nama-fitur/services`
- Endpoint: taruh di `src/modules/nama-fitur/controllers`

## Catatan belajar

Di project ini, query SQL sengaja dipisahkan ke file `user.queries.ts` supaya repository lebih mudah dibaca. Ini cocok untuk kamu yang sedang belajar backend karena alur antara controller, service, repository, dan database jadi terlihat jelas.
