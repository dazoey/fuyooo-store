
# Kedai Fuyooo - Aplikasi Pemesanan Minuman

Ini adalah aplikasi web e-commerce sederhana yang dibuat untuk Kedai Fuyooo, memungkinkan pelanggan untuk melihat, mencari, dan memesan produk minuman secara online. Aplikasi ini dibangun menggunakan React, Tailwind CSS untuk styling, dan React Router untuk navigasi.

## Fitur Utama

Aplikasi ini memiliki beberapa fitur utama untuk memberikan pengalaman pengguna yang lengkap:

1.  Navigasi Multi-Halaman (Routing):
    - Menggunakan `react-router-dom` untuk membuat aplikasi menjadi Single Page Application (SPA).
    - Navigasi yang lancar antara halaman Beranda, Produk, Tentang, dan Pembayaran tanpa perlu me-refresh browser.
    - URL yang bersih dan intuitif untuk setiap halaman (misalnya, `/products`, `/about`).

2.  Katalog dan Pencarian Produk:
    - Menampilkan semua produk minuman yang tersedia di halaman Produk.
    - Fitur pencarian (search bar) yang fungsional untuk memfilter produk secara real-time berdasarkan nama atau kategori.
    - Pencarian dioptimalkan dengan debounce untuk mencegah pemanggilan fungsi yang berlebihan saat pengguna mengetik.

3.  Manajemen Keranjang Belanja (Shopping Cart):
    - Pengguna dapat menambahkan produk ke keranjang dari halaman produk atau beranda.
    - Ikon keranjang di header menunjukkan jumlah total item yang ada di dalamnya.
    - Pengguna dapat menambah/mengurangi kuantitas atau menghapus item dari ringkasan keranjang.

4.  Proses Checkout dan Pembayaran:
    - Halaman pembayaran yang terstruktur di mana pengguna dapat melihat ringkasan pesanan akhir.
    - Form untuk mengisi detail pengiriman seperti nama, alamat, dan nomor telepon.
    - Opsi untuk memilih berbagai metode pembayaran (Bayar di Tempat, Transfer Bank, E-Wallet).
    - Halaman konfirmasi setelah pesanan berhasil dibuat.

5.  Desain Responsif:
    - Antarmuka (UI) dirancang dengan Tailwind CSS agar dapat beradaptasi dengan baik di berbagai ukuran layar, mulai dari desktop hingga perangkat mobile.
    - Termasuk menu navigasi mobile-friendly (hamburger menu).

## Cara Menjalankan Aplikasi

Untuk menjalankan proyek ini di lingkungan lokal Anda, ikuti langkah-langkah berikut.

### Prasyarat

- Pastikan Anda memiliki Node.js dan npm (Node Package Manager) yang terinstal di sistem Anda. Anda bisa mengunduhnya dari [nodejs.org](https://nodejs.org/).

### Langkah-langkah Instalasi

1.  Salin semua file proyek ke dalam sebuah direktori di komputer Anda.

2.  Buka terminal atau command prompt, lalu navigasikan ke direktori root proyek tersebut.
    ```bash
    cd path/to/your/project-directory
    ```

3.  Instal semua dependensi yang diperlukan oleh proyek dengan menjalankan perintah:
    bash
    npm install

    Perintah ini akan mengunduh semua library yang tercantum di `package.json`, seperti React, React Router, dan lainnya.



### Menjalankan Aplikasi

1.  Setelah semua dependensi terinstal, jalankan aplikasi dengan perintah:
    bash
    npm start
    

2.  Perintah ini akan memulai server pengembangan lokal.

Aplikasi akan berjalan dan akan otomatis me-refresh setiap kali Anda menyimpan perubahan pada file kode.
