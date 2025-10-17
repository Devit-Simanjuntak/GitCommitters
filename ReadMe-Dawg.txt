versi Package untuk Dockerize yang lebih stabil (by Opung GPT)

| Package               | Tipe                     | Versi Disarankan | Keterangan                                    |
| --------------------- | ------------------------ | ---------------- | --------------------------------------------- |
| `express`             | dependency               | `^4.18.2`        | Framework Node.js untuk API                   |
| `cors`                | dependency               | `^2.8.5`         | Mengizinkan frontend (React) akses ke backend |
| `pg`                  | dependency               | `^8.12.0`        | Driver PostgreSQL untuk Node.js               |
| `dotenv`              | dependency               | `^16.3.1`        | Load variabel environment dari `.env`         |
| `bcryptjs`            | dependency               | `^2.4.3`         | Hashing password untuk login                  |
| `jsonwebtoken`        | dependency               | `^9.0.0`         | JWT untuk autentikasi                         |
| `@prisma/client`      | dependency               | `^4.15.0`        | Client Prisma untuk query database runtime    |
| `prisma`              | devDependency            | `^4.15.0`        | CLI Prisma untuk migrasi, generate schema     |
| `nodemon`             | devDependency            | `^3.0.3`         | Auto restart server saat kode berubah         |
| `typescript`          | devDependency (opsional) | `^5.2.2`         | Jika menggunakan TypeScript                   |
| `ts-node`             | devDependency (opsional) | `^10.9.1`        | Jalankan TypeScript langsung tanpa compile    |
| `@types/express`      | devDependency (opsional) | `^4.17.21`       | TypeScript type definitions                   |
| `@types/node`         | devDependency (opsional) | `^20.4.2`        | TypeScript type definitions                   |
| `@types/cors`         | devDependency (opsional) | `^2.8.13`        | TypeScript type definitions                   |
| `@types/bcryptjs`     | devDependency (opsional) | `^2.4.2`         | TypeScript type definitions                   |
| `@types/jsonwebtoken` | devDependency (opsional) | `^9.0.2`         | TypeScript type definitions                   |


Guide Instalansi.

1. Depedencies

Frontend (client)
aman langsung dari package.json

Backend (server)
dependencies : {
    "cors": "^2.8.5",
    "express": "^5.1.0",
    "jsonwebtoken": "^9.0.2",
    "nodemon": "^3.1.10",
    "pg": "^8.16.3",
}

kemudian ketik perintah
npm install

lalu, install lagi menggunakan command line (Mencegah error dependencies)
npm install -g prisma @prisma/client

Kemudian, pastikan Database dan Schema PostgreSQL sudah ada terlebih dahulu

setelah itu, jalankan perintah
prisma init

kemudian, di folder server akan tergenerate folder prisma. di folder prisma pilih schema.prisma, pada bagian berikut

generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma" ==> Hapus bagian ini, kalau tidak nanti saat di generate tidak akan mengarah ke server/node_modules/@prisma/client
}

Pastikan model yang dikembangkan sebelumnya juga sudah ada di schema.prisma. jika sudah, cari dan klik file: .env

ganti nilai variabel dari DATABASE_URL dengan url yang mengarah ke database dan schema yang sudah dibuat. rumusan isi dari valuenya
DATABASE_URL="postgresql://{username}:{password}@{ip}:{port}/{nama_database}?schema={nama_schema}"

jika sudah, jalankan perintah ini
prisma migrate dev --name init (ini akan membuat model tabel yang dibuat di schema.prisma ke schmema database)
prisma generate (sesuai dengan namanya)

sekarang, pastikan di directory 'server/node_modules/@prisma/client' sudah terisi program api-api prisma.

jika sudah maka sudah selesai pengaturan koneksi database postgresqlnya.
	