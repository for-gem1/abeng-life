# Bengkel Life v3.0.0

Game simulasi bengkel selama 30 hari. Bantu Dimas merawat bengkel Bapak, kumpulkan kas Rp4.000.000 setelah tagihan, lalu beli lapak Pak Haji.

## Memasang pembaruan

1. Ekstrak ZIP ini.
2. Unggah **seluruh isi folder hasil ekstrak** ke folder web yang sama dengan versi sebelumnya. `index.html`, `manifest.webmanifest`, `sw.js`, `apple-touch-icon.png`, `favicon.svg`, `favicon.ico`, dan folder `icons` harus tetap bersama.
3. Buka alamat HTTPS bengkel. Jika belum berubah, muat ulang halaman. Untuk pembaruan berikutnya, menu akan memberi pilihan ketika service worker baru siap.
4. Pakai browser dan alamat web yang sama untuk meneruskan progres v2 secara otomatis. Data v2 tidak dihapus. Progres dari alamat/domain lain tidak dapat dibaca otomatis.

Tidak memerlukan Node.js, instalasi paket, server aplikasi, akun, atau database. Berkas `index.html` memuat semua kode permainan dan gaya tampilannya. Aset terpisah dipakai untuk PWA dan ikon. Membuka HTML langsung bisa menjalankan permainan, tetapi pemasangan PWA dan service worker memerlukan web HTTPS (atau localhost untuk pengembangan).

## Pasang di iPhone

- Buka alamat HTTPS di Safari.
- Ketuk **Bagikan → Tambah ke Layar Utama / Add to Home Screen**.
- Aktifkan **Open as Web App** jika opsinya muncul, lalu Tambahkan.
- Ikon PNG 180 × 180 sudah disiapkan khusus iPhone, dengan ikon PWA 192 dan 512 piksel serta ikon maskable.
- Buka menu dan tunggu status **Offline siap** sebelum mencoba tanpa internet. Setiap pemasangan/browser baru perlu memuat aplikasi satu kali saat online.
- Jika pintasan lama masih menampilkan ikon lama, ekspor backup dulu. Perbarui pintasan dari Safari setelah aset terbaru terunggah. Hindari menghapus data situs sebelum progres diekspor.

Safari dan aplikasi Home Screen dapat memiliki penyimpanan yang berbeda. Pakai ekspor/impor jika progres tidak ikut muncul. Pengujian dilakukan pada browser desktop dan viewport mobile 390 × 844; pemasangan dan tampilan akhir di Safari iPhone perlu dicoba di perangkat asli.

## Yang baru

- Antarmuka baru dengan ilustrasi bengkel, navigasi Bengkel / Buku kas / Upgrade / Catatan, dan ruang aman di layar iPhone.
- Angka antrean menampilkan **margin setelah sparepart**, dengan rincian tarif dan biaya sebelum servis.
- Buku kas: transaksi masuk/keluar, tagihan tutup hari, saran cadangan sewa, riwayat, dan grafik perubahan kas.
- Tantangan harian otomatis, bonus Rp15.000 setiap tiga servis rapi beruntun, dua badge baru, dan antrean yang bertambah seiring kemajuan.
- Mini-game timing, urutan kerja, dan inspeksi akhir. Bantuan timing tersedia dari menu.
- Buku montir menyimpan diagnosa yang sudah ditemukan.
- Urut antrean menurut kedatangan, kesabaran, atau margin.
- Udin bisa bertugas/istirahat. Ia menangani pelanggan setiap 30 detik antrean aktif dengan peluang berhasil 85%. Gaji Rp35.000 terutang hanya setelah mulai menangani pelanggan hari itu; menonaktifkan Udin sesudahnya tidak membatalkan gaji.
- Setelah lapak dibeli, mode santai terbuka tanpa batas hari dan tanpa biaya sewa. Biaya operasional tetap perlu dibayar.
- Ikon Home Screen, favicon, manifest, cache offline, dan pemuatan pembaruan melalui menu.

## Aturan waktu dan penyimpanan

Waktu berjalan hanya saat tab **Bengkel** aktif, tanpa dialog/servis/jeda. Antrean tidak bergerak saat membuka tab lain, mengerjakan servis, membuka menu, atau saat aplikasi berada di latar. Tidak ada simulasi kemajuan atau penalti selama aplikasi ditutup.

Perubahan penting disimpan langsung. Kesabaran antrean disimpan paling lambat setiap lima detik dan saat aplikasi ditinggalkan. Hasil tutup hari, kejadian, tahap diagnosa, jumlah kesalahan, dan progres mini-game dipertahankan saat reload. Jika proses browser dihentikan paksa, beberapa detik terakhir yang belum sempat disimpan mungkin belum tercatat.

Progres disimpan secara lokal di perangkat/browser; tidak disinkronkan ke akun atau server. Browser dapat menghapus penyimpanan. **Ekspor backup** melalui menu untuk cadangan dan perpindahan perangkat. Impor menerima backup JSON v3 atau bentuk state v2 yang valid, maksimal 2 MB. Impor meminta konfirmasi sebelum mengganti progres. Ada cadangan lokal otomatis untuk membantu pemulihan data yang rusak, tetapi berkas backup terpisah tetap dianjurkan.

Tab kedua yang mendeteksi perubahan progres akan berhenti dan meminta memuat versi terbaru untuk mengurangi risiko saling menimpa.

## Perbaikan aturan permainan

- Tagihan tidak lagi dianggap lunas hanya karena saldo dibatasi ke nol. Kekurangan biaya tercatat dan mengakhiri perjalanan.
- Penutupan hari tidak bisa diproses dua kali saat reload.
- Kemenangan membayar Rp4 juta untuk membeli lapak, lalu menyimpan hasil permainan.
- Game over mempertahankan progres agar dapat diekspor.
- Hadiah misi, pembelian upgrade, dan penyelesaian servis tidak bisa dibayarkan dua kali.
- Biaya kesalahan ditampilkan dalam buku kas terpisah dari margin servis.
- Penyimpanan yang gagal menampilkan pesan agar pengguna membuat backup.

## Validasi

14 pengujian otomatis lulus: migrasi v2, pemulihan servis, rekonsiliasi kas, transaksi ganda, gaji Udin, penutupan hari, akhir permainan, validasi backup, fallback offline dalam subfolder, dan isolasi cache dari halaman lain. Simulasi 100 seed mencapai target dengan servis sempurna tanpa upgrade. Ini memastikan target dapat dicapai; bukan jaminan menang untuk setiap strategi.

Antrean, diagnosa, mini-game inspeksi, pemulihan setelah reload, buku kas, buku montir, jeda, status offline, dan laporan tutup hari diperiksa melalui browser pada tata letak desktop/mobile. Ikon dan berkas PWA diperiksa secara lokal. Ekspor JSON berhasil diuji melalui browser. Impor lewat pemilih berkas belum selesai diuji karena izin unggah browser tidak diberikan; validasi dan pemulihan state JSON telah diuji otomatis. Perilaku pemasangan iOS belum diuji pada perangkat fisik.

Rujukan teknis:
- Apple, ikon Home Screen: https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html
- Apple, pemasangan web app: https://support.apple.com/en-lamr/guide/iphone/iphea86e5236/ios
- MDN, service worker: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
