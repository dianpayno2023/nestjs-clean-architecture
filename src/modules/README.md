# Struktur `src/modules`

Setiap folder di dalam `modules` mewakili satu fitur bisnis.

Contoh:

- `user`: semua logic yang berhubungan dengan user.
- `product`: nanti bisa ditambah dengan pola yang sama.

Saat menambah fitur baru, biasanya file minimum yang perlu dibuat:

1. `controllers`
2. `services`
3. `repositories`
4. `infrastructure/postgres`
5. `dto`
6. `interfaces`
7. `feature.module.ts`

