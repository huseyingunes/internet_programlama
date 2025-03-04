-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 06 May 2023, 00:34:47
-- Sunucu sürümü: 10.4.28-MariaDB
-- PHP Sürümü: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `stok`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `musteri`
--

CREATE TABLE `musteri` (
  `id` int(11) NOT NULL,
  `ad` varchar(50) DEFAULT NULL,
  `soyad` varchar(50) DEFAULT NULL,
  `kullanici_adi` varchar(50) NOT NULL,
  `sifre` varchar(64) NOT NULL,
  `eposta` varchar(100) NOT NULL,
  `adres` text DEFAULT NULL,
  `sehir` int(11) DEFAULT NULL,
  `sart_kabul` tinyint(1) DEFAULT NULL,
  `reklam_gonder` tinyint(1) DEFAULT NULL,
  `odeme_yontemi` enum('Kredi Kartı','Havale','Kripto Para','') DEFAULT NULL,
  `sevilen_sporlar` int(11) DEFAULT NULL,
  `fotograf` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `musteri`
--

INSERT INTO `musteri` (`id`, `ad`, `soyad`, `kullanici_adi`, `sifre`, `eposta`, `adres`, `sehir`, `sart_kabul`, `reklam_gonder`, `odeme_yontemi`, `sevilen_sporlar`, `fotograf`) VALUES
(1, 'Ayşe', 'FATMA', 'ayse_fatma', '123456', 'ayse@fatma.com', 'Adres bilgisi', 10, 0, 1, 'Havale', NULL, NULL),
(2, 'Ayşe 2', 'FATMA 2', 'ayse_fatma2', '12345622', 'ayse@fatma.com', 'Adres bilgisi', 10, 1, 0, 'Kripto Para', NULL, NULL),
(6, 'Ahmet', 'MEHMET', 'kullanici_1', '1234', 'sen@balikesir.edu.tr', 'Bizim adres, kapıda yazıyor', 39, 1, 0, 'Kripto Para', NULL, '0L7A5823.JPG'),
(7, 'Ahmetghfdg', 'MEHMET', 'kullanici_1', '1234', 'sen@balikesir.edu.tr', 'Bizim adres, kapıda yazıyor', 10, 1, 0, 'Kripto Para', NULL, '0L7A5761.JPG');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `urun`
--

CREATE TABLE `urun` (
  `id` int(11) NOT NULL,
  `ad` varchar(50) NOT NULL,
  `boyut` int(11) DEFAULT NULL,
  `miktar` int(11) DEFAULT NULL,
  `fiyat` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `urun`
--

INSERT INTO `urun` (`id`, `ad`, `boyut`, `miktar`, `fiyat`) VALUES
(1, 'Bilgisayar', 1, 5, 10000),
(2, 'Paraşüt', 50, 2, 250),
(5, 'Cep Telefonu', 7, 8, 9),
(6, 'asdfasd', 2, 3, 4),
(7, 'asdfasd', 2, 3, 4),
(8, 'asdfasd', 2, 3, 4);

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `musteri`
--
ALTER TABLE `musteri`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `urun`
--
ALTER TABLE `urun`
  ADD PRIMARY KEY (`id`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `musteri`
--
ALTER TABLE `musteri`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Tablo için AUTO_INCREMENT değeri `urun`
--
ALTER TABLE `urun`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
