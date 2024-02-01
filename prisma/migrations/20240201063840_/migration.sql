-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(200) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `no_sk` VARCHAR(200) NOT NULL,
    `file_sk` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `foto_profile` VARCHAR(191) NULL,
    `no_telp` VARCHAR(14) NOT NULL,
    `alamat` VARCHAR(191) NULL,
    `setuju` ENUM('YA', 'TIDAK') NOT NULL,
    `isVerifikasi` ENUM('terVerifikasi', 'belumVerifikasi') NULL,
    `isRole` ENUM('ADMIN', 'USER') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaksi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `TglReg` DATETIME(3) NOT NULL,
    `TglNaskah` DATETIME(3) NOT NULL,
    `Hal` VARCHAR(200) NOT NULL,
    `nama_instansi` VARCHAR(200) NOT NULL,
    `file_surat` VARCHAR(191) NOT NULL,
    `file_surat_name` VARCHAR(191) NOT NULL,
    `tgl_verifikasi` DATETIME(3) NULL,
    `nama_kegiatan` VARCHAR(255) NOT NULL,
    `start_kegiatan` DATETIME(3) NOT NULL,
    `end_kegiatan` DATETIME(3) NOT NULL,
    `jumlah_peserta` INTEGER NOT NULL,
    `tempat` VARCHAR(191) NOT NULL,
    `isStatus` ENUM('Selesai', 'Proses') NOT NULL,
    `keterangan` VARCHAR(191) NULL,
    `file_laporan` VARCHAR(191) NULL,
    `balasan_surat` ENUM('sudahBalas', 'belumBalas') NOT NULL,
    `file_balasan` VARCHAR(191) NULL,
    `id_user` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `histori_login` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` VARCHAR(191) NOT NULL,
    `nama_instansi` VARCHAR(191) NOT NULL,
    `tgl_login` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Transaksi` ADD CONSTRAINT `Transaksi_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `histori_login` ADD CONSTRAINT `histori_login_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
