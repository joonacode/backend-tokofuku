-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 10 Sep 2020 pada 11.25
-- Versi server: 10.4.11-MariaDB
-- Versi PHP: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_tokoFuku`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `address`
--

CREATE TABLE `address` (
  `id` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `home` varchar(64) NOT NULL,
  `receiptName` varchar(64) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(64) NOT NULL,
  `receiptPhone` varchar(32) NOT NULL,
  `postalCode` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `categories`
--

INSERT INTO `categories` (`id`, `name`, `image`, `createdAt`, `updatedAt`) VALUES
(2, 'xxx', 'http://localhost:4000/uploads/svfc51rpjko.png', '2020-09-08 13:22:37', '2020-09-08 15:44:15'),
(3, 'Food', NULL, '2020-09-08 13:23:53', '2020-09-08 13:23:53'),
(4, 'Taco', 'http://localhost:4000/undefined', '2020-09-08 15:37:24', '2020-09-08 15:37:24'),
(5, 'Tacox', NULL, '2020-09-08 15:38:11', '2020-09-08 15:38:11'),
(6, 'Hole', NULL, '2020-09-08 15:38:38', '2020-09-08 15:38:38'),
(7, 'salmonna', 'http://localhost:4000/uploads/7nlc7t7erng.png', '2020-09-08 15:38:54', '2020-09-08 15:43:01');

-- --------------------------------------------------------

--
-- Struktur dari tabel `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `price` int(11) NOT NULL,
  `idCategory` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `color` varchar(64) NOT NULL,
  `size` varchar(64) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(255) NOT NULL,
  `conditionProduct` varchar(64) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `idCategory`, `stock`, `color`, `size`, `description`, `image`, `conditionProduct`, `createdAt`, `updatedAt`) VALUES
(1, 'Tess', 2555, 3, 5, '#fff, #000, #999', '29, 22, 23', 'Hello World', '', 'New', '2020-09-08 16:06:53', '2020-09-08 16:06:53'),
(2, 'Baru', 90000, 3, 5, '#fff', 'm', 'lorem', 'http://localhost:4000/uploads/e71c13eeaj.png', 'New', '2020-09-08 16:14:39', '2020-09-08 16:14:39'),
(3, 'Baru', 90000, 3, 5, '#fff', 'm', 'lorem', 'http://localhost:4000/uploads/d87hsrf88tg.png', 'New', '2020-09-08 16:15:13', '2020-09-08 16:15:13'),
(4, 'Baru', 90000, 3, 5, '#fff', 'm', 'lorem', 'http://localhost:4000/uploads/fpnr21rt7tg.png', 'New', '2020-09-08 16:15:42', '2020-09-08 16:15:42'),
(6, 'Naon Linux', 90000, 4, 5, '#fff', 'm', 'lorem', 'http://localhost:4000/uploads/do9vres0e98.png', 'New', '2020-09-08 16:19:00', '2020-09-08 16:23:46'),
(7, 'BaruX', 90000, 4, 5, '#fff', 'm', 'lorem', 'http://localhost:4000/uploads/2n5afeasad.png', 'New', '2020-09-09 02:46:39', '2020-09-09 02:46:39'),
(8, 'BaruX', 90000, 4, 5, '#fff', 'm', 'lorem', 'http://localhost:4000/uploads/11igd6cva2o.png', 'New', '2020-09-10 01:32:21', '2020-09-10 01:32:21');

-- --------------------------------------------------------

--
-- Struktur dari tabel `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `idProduct` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `description` text NOT NULL,
  `images` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `reviews`
--

INSERT INTO `reviews` (`id`, `idUser`, `idProduct`, `rating`, `description`, `images`, `createdAt`, `updatedAt`) VALUES
(3, 13, 1, 1, 'asd', 'http://localhost:4000/uploads/42uh2jv1r58.png', '2020-09-10 01:00:24', '2020-09-10 01:05:37'),
(4, 13, 1, 3, 'aokokok', 'http://localhost:4000/uploads/880udiq6jtg.png', '2020-09-10 01:00:24', '2020-09-10 01:00:24');

-- --------------------------------------------------------

--
-- Struktur dari tabel `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `role`
--

INSERT INTO `role` (`id`, `name`) VALUES
(1, 'Seller'),
(2, 'Custommer');

-- --------------------------------------------------------

--
-- Struktur dari tabel `token`
--

CREATE TABLE `token` (
  `token` varchar(255) NOT NULL,
  `idUser` int(11) NOT NULL,
  `type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `phone` varchar(64) DEFAULT NULL,
  `storeName` varchar(64) DEFAULT NULL,
  `storeDescription` text DEFAULT NULL,
  `storeImage` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `roleId` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `gender` char(1) DEFAULT NULL,
  `dateBirth` varchar(64) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone`, `storeName`, `storeDescription`, `storeImage`, `password`, `roleId`, `status`, `image`, `gender`, `dateBirth`, `createdAt`, `updatedAt`) VALUES
(13, 'Gunxx', 'cep@gmail.com', '0099', 'Halal Store', NULL, '', '$2b$12$DgpHCdv3zxg.w/yqFnrfS.GyG85gHSKm2L8YW9QiluswrUFwf2ODa', 1, 1, 'http://localhost:4000/uploads/dhp5ffkvbgo.png', 'm', '12-12-09', '2020-09-08 12:31:32', '2020-09-08 12:31:32'),
(14, 'Guna', 'guna@gmail.com', '69', 'Updated StoreXX', 'Asd', 'http://localhost:4000/uploads/o8nseu3oaeg.png', '$2b$12$2hCsL0HJ/qfzyo6ZQIPD/uPO77C2.XvEwEYBws1t5UtN3JpS.X49u', 2, 1, NULL, NULL, NULL, '2020-09-08 12:32:17', '2020-09-08 15:25:47'),
(18, 'Guna', 'laha@gmail.com', NULL, NULL, NULL, NULL, '$2b$12$Q1uIai9KmJWOVpsWiZM.iuKw3syoyQd5MQYir1O92Wg/TPQA.YjHG', 2, 1, NULL, NULL, NULL, '2020-09-09 11:22:16', '2020-09-09 11:22:16');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUser` (`idUser`);

--
-- Indeks untuk tabel `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idCategory` (`idCategory`);

--
-- Indeks untuk tabel `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idProduct` (`idProduct`),
  ADD KEY `idUser` (`idUser`);

--
-- Indeks untuk tabel `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `token`
--
ALTER TABLE `token`
  ADD PRIMARY KEY (`token`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `address`
--
ALTER TABLE `address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `address_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`);

--
-- Ketidakleluasaan untuk tabel `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`idCategory`) REFERENCES `categories` (`id`);

--
-- Ketidakleluasaan untuk tabel `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`idProduct`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
