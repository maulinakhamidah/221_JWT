# REST API Perpustakaan Komik & Autentikasi JWT

Proyek tugas praktikum **Pemrograman Web Service (PWS)** yang mengimplementasikan arsitektur RESTful API menggunakan Node.js, Express, Sequelize ORM, dan PostgreSQL dengan sistem autentikasi **JSON Web Token (JWT)**.

## Identitas Mahasiswa
- **Nama**: Maulina Khamidah
- **NIM**: 20240140221
- **Kelas**: C
- **Program Studi**: Teknologi Informasi
- **Fakultas**: Fakultas Teknik
- **Universitas**: Universitas Muhammadiyah Yogyakarta (UMY)

## Teknologi yang Digunakan
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL & pgAdmin
- **ORM**: Sequelize ORM
- **Keamanan & Autentikasi**: JSON Web Token (jsonwebtoken) & bcrypt

## Instalasi dan Menjalankan Proyek

### 1. Clone Repository & Install Dependensi
```bash
git clone https://github.com/maulinakhamidah/221_JWT.git
cd 221_JWT
npm install
```

### 2. Konfigurasi Environment (.env)
Buat berkas `.env` di direktori utama:
```env
DB_USER=postgres
DB_PASS=maulina123
DB_DATABASE=Perpustakaan
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DIALECT=postgres

JWT_SECRET=mySuperSecretKey123
JWT_EXPIRES_IN=1d
PORT=3000
```

### 3. Persiapan Database di pgAdmin
1. Buka **pgAdmin 4**.
2. Buat database baru bernama `Perpustakaan`.
3. Jalankan aplikasi, Sequelize akan otomatis melakukan sinkronisasi tabel `komiks` dan `users`.

### 4. Menjalankan Server
```bash
npm start
# Server berjalan di http://localhost:3000
```

## Spesifikasi Endpoint REST API

| Method | Endpoint | Akses | Header Wajib | Deskripsi |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/register` | Publik | `Content-Type: application/json` | Pendaftaran akun pengguna baru |
| `POST` | `/api/login` | Publik | `Content-Type: application/json` | Autentikasi user & perolehan JWT token |
| `GET` | `/api/komik` | Publik | - | Menampilkan seluruh data komik |
| `GET` | `/api/komik/:id` | Publik | - | Menampilkan detail komik berdasarkan ID |
| `POST` | `/api/komik` | **Terproteksi** | `Authorization: Bearer <TOKEN>` | Menambahkan komik baru |
| `PUT` | `/api/komik/:id` | **Terproteksi** | `Authorization: Bearer <TOKEN>` | Memperbarui data komik |
| `DELETE` | `/api/komik/:id` | **Terproteksi** | `Authorization: Bearer <TOKEN>` | Menghapus komik dari database |

## Panduan Pengujian API (cURL)

### 1. Registrasi User
```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"email": "maulina@umy.ac.id", "password": "password123"}'
```

### 2. Login User
```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email": "maulina@umy.ac.id", "password": "password123"}'
```

### 3. Tambah Komik Baru (Menggunakan JWT Bearer Token)
```bash
curl -X POST http://localhost:3000/api/komik \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN_HASIL_LOGIN>" \
  -d '{"title": "Detective Conan Vol. 100", "description": "Kasus misteri organisasi hitam", "author": "Gosho Aoyama"}'
```
