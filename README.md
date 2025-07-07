# Kedai Fuyooo - Aplikasi Pemesanan Minuman

Aplikasi web e-commerce yang dibangun untuk Kedai Fuyooo, memungkinkan pelanggan untuk melihat, mencari, dan memesan produk minuman secara online. Aplikasi ini dibangun menggunakan React, Tailwind CSS untuk styling, dan React Router untuk navigasi.

## Fitur Utama

- **Navigasi Multi-Halaman (Routing):** Aplikasi *Single Page Application* (SPA) dengan `react-router-dom` untuk navigasi yang lancar antara halaman Beranda, Produk, Tentang, dan Pembayaran.
- **Katalog dan Pencarian Produk:** Menampilkan produk dengan fitur pencarian *real-time* yang dioptimalkan dengan *debounce*.
- **Manajemen Keranjang Belanja:** Pengguna dapat menambah, mengurangi kuantitas, atau menghapus item dari keranjang belanja.
- **Proses Checkout dan Pembayaran:** Halaman pembayaran dengan ringkasan pesanan, form detail pengiriman, dan pilihan metode pembayaran.
- **Desain Responsif:** Antarmuka yang dapat beradaptasi dengan baik di berbagai ukuran layar, dari desktop hingga mobile.

---

## Panduan Instalasi dan Menjalankan Proyek

Berikut adalah panduan lengkap untuk menyiapkan dan menjalankan proyek ini di lingkungan pengembangan lokal Anda.

### 1. Prasyarat

Sebelum memulai, pastikan sistem Anda telah memenuhi persyaratan berikut:

- **Node.js:** Aplikasi ini memerlukan Node.js. Direkomendasikan menggunakan versi LTS (Long-Term Support). Anda bisa mengunduhnya dari [nodejs.org](https://nodejs.org/).
- **npm (Node Package Manager):** npm biasanya terinstal secara otomatis bersama Node.js.
- **Git (Opsional):** Diperlukan jika Anda ingin menyalin (clone) repositori ini dari sumber seperti GitHub.

Anda dapat memeriksa apakah Node.js dan npm sudah terinstal dengan menjalankan perintah berikut di terminal Anda:

```bash
npm -v
node -v
```

### 2. Instalasi Proyek

Ikuti langkah-langkah berikut untuk menginstal semua dependensi yang dibutuhkan oleh proyek.

**a. Dapatkan Kode Proyek**

Jika proyek ini berada di repositori Git, cara terbaik adalah dengan melakukan *clone*:

```bash
# Ganti URL_REPOSITORI dengan URL Git yang sesuai
git clone https://github.com/nama-user/nama-repositori.git

# Masuk ke direktori proyek yang baru dibuat
cd nama-repositori
```

Jika Anda tidak menggunakan Git, cukup salin semua file proyek ke dalam satu direktori dan buka terminal di dalam direktori tersebut.

**b. Instal Dependensi**

Setelah berada di direktori root proyek, jalankan perintah berikut untuk menginstal semua paket yang tercantum dalam file `package.json`:

```bash
npm install
```

Perintah ini akan membuat folder `node_modules` yang berisi semua library yang diperlukan (seperti React, React Router, dll.) untuk menjalankan aplikasi.

### 3. Menjalankan Aplikasi dalam Mode Pengembangan

Setelah instalasi selesai, Anda siap untuk menjalankan aplikasi.

1.  **Mulai Server Pengembangan**

    Jalankan perintah berikut di terminal:

    ```bash
    npm start
    ```

2.  **Lihat Aplikasi di Browser**

    Perintah di atas akan memulai server pengembangan lokal (biasanya di `http://localhost:3000`). Buka browser Anda dan kunjungi alamat tersebut.

3.  **Fitur Live Reload**

    Server pengembangan ini mendukung *live reload*. Artinya, setiap kali Anda menyimpan perubahan pada file kode (misalnya, `KedaiFuyoooApp.js`), aplikasi di browser akan secara otomatis diperbarui untuk mencerminkan perubahan tersebut.

### 4. Skrip Tambahan (Opsional)

Proyek berbasis Create React App biasanya menyertakan skrip lain yang berguna:

- **Membuat Build untuk Produksi:**
  Untuk membuat versi aplikasi yang dioptimalkan untuk *deployment* (produksi), jalankan:
  ```bash
  npm run build
  ```
  Perintah ini akan membuat folder `build` yang berisi file statis yang siap di-hosting di server web.

- **Menjalankan Tes:**
  Jika proyek memiliki unit test, Anda dapat menjalankannya dengan:
  ```bash
  npm test
  ```