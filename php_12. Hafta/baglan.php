<?php
$sunucu_adresi = "localhost";
$kullanici_adi = "root";
$sifre = "";
$veri_tabani = "stok";

$baglanti = new mysqli($sunucu_adresi, $kullanici_adi, $sifre, $veri_tabani);

if ($baglanti->connect_error) {
  die("Bağlantı Hatası: " . $conn->connect_error);
}
