<?php
    include("baglan.php");
    $kayitNo = $_GET['did'];
    $sorgu = "SELECT * FROM musteri where id =".$kayitNo;
    $sonuc = $baglanti->query($sorgu);
    $kayit = $sonuc->fetch_assoc();
    echo json_encode($kayit);