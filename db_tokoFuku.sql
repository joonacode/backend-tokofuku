-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 09 Sep 2020 pada 10.07
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
(7, 'BaruX', 90000, 4, 5, '#fff', 'm', 'lorem', 'http://localhost:4000/uploads/2n5afeasad.png', 'New', '2020-09-09 02:46:39', '2020-09-09 02:46:39');

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
  `idUser` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `token`
--

INSERT INTO `token` (`token`, `idUser`) VALUES
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoxNiwiaWF0IjoxNTk5NTczMTIwLCJleHAiOjE1OTk1ODM5MjB9.2Ml-q_hMPdpUO_3v98SNuPHqcbZ_tuIWf2OkJqnVnqA', 16),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoxNSwiaWF0IjoxNTk5NTY4NDMzLCJleHAiOjE1OTk1NzkyMzN9.0j8eaeNBpdvjXWKXdvkfsttxFR0UNuEu1fJznLHTnAc', 15),
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoxNywiaWF0IjoxNTk5NTczMTkwLCJleHAiOjE1OTk1ODM5OTB9.1hiUvz5SNNAmKRLH_HfeAHzDXWzfvBhHmj-_sdf0S5g', 17);

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
(14, 'Guna', 'guna@gmail.com', '69', 'Updated StoreXX', 'Asd', 'http://localhost:4000/uploads/o8nseu3oaeg.png', '$2b$12$Mj198i5q0rkTCbl12/J2mevwQOzFv2hoHAIwXCqw73PPBP2WP2z3y', 2, 1, NULL, NULL, NULL, '2020-09-08 12:32:17', '2020-09-08 15:25:47'),
(15, 'Guna', 'cepgunawidodo@gmail.com', NULL, NULL, NULL, '', '$2b$12$UCYuwO7lZAfts7zN5yWaLOIO4ioi6ma0IwXEwpQ/jOJfjP5TvvCYq', 2, 0, NULL, NULL, NULL, '2020-09-08 12:33:53', '2020-09-08 12:33:53');

--
-- Indexes for dumped tables
--

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
-- AUTO_INCREMENT untuk tabel `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`idCategory`) REFERENCES `categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
