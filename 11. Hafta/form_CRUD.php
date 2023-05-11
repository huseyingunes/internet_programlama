<!doctype html>
<?php
 // PHP Hata iletileri ile ilgili ayrıntılı bilgiler
 // https://www.php.net/manual/en/errorfunc.examples.php
 
 include("baglan.php");
?> 
<?php
	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		if (isset($_POST['silinecek_id'])){
			$sorgu = "DELETE FROM musteri WHERE id=".$_POST['silinecek_id'];
			if ($baglanti->query($sorgu) === TRUE) {
				echo "Kayıt başaryıla silindi";
			} else {
				echo "silinirken hata oluştu: " . $baglanti->error;
			}
		}
		else if (isset($_POST['duzenlenecek_id'])){
$sorgu = "UPDATE `musteri` SET `ad` ='".$_POST['ad']."', `soyad`='".$_POST['soyad']."' WHERE `musteri`.`id`=".$_POST['duzenlenecek_id'].";";

			if ($baglanti->query($sorgu) === TRUE) {
				echo "Kayıt başaryıla düzenlendi";
			} else {
				echo "silinirken hata oluştu: " . $baglanti->error;
			}
		}
		else
		{
			$ad = $_POST['ad'];
			$soyad = $_POST['soyad'];
			$kullanici_adi = $_POST['kullanici_adi'];
			$sifre_1 = $_POST['sifre_1'];
			$sifre_2 = $_POST['sifre_2'];
			$eposta = $_POST['eposta'];
			$adres = $_POST['adres'];
			$sehir = $_POST['sehir'];
			$sart_kabul = isset($_POST['sart_kabul'])?1:0;
			$reklam_gonder = isset($_POST['reklam_gonder'])?1:0;
			$odemeYontemi = $_POST['odemeYontemi'];
			$sporlar = $_POST['sporlar'];
			$fotograf = $_FILES['fotograf'];
			
			$yuklenen_dosya = $_FILES["fotograf"]["name"];
			
			$sorgu = "INSERT INTO `musteri` (`id`, `ad`, `soyad`, `kullanici_adi`, `sifre`, `eposta`, `adres`, `sehir`, `sart_kabul`, `reklam_gonder`, `odeme_yontemi`, `sevilen_sporlar`, `fotograf`) VALUES (NULL, '$ad', '$soyad', '$kullanici_adi', '$sifre_1', '$eposta', '$adres', '$sehir', '$sart_kabul', '$reklam_gonder', '$odemeYontemi', NULL, '$yuklenen_dosya')";
			
			if ($baglanti->query($sorgu) === TRUE) {
				echo "Kayıt başarıyla eklendi...";
				
				$hedef_klasor = "yukleme/";
				$hedef_dosya = $hedef_klasor . basename($_FILES["fotograf"]["name"]);
				move_uploaded_file($_FILES["fotograf"]["tmp_name"], $hedef_dosya);
			} else {
				echo "Error: " . $sorgu . "<br>" . $baglanti->error;
			}
			
			/*
				echo "Ad : ".$ad."<hr>";
				echo "Soyad : ".$soyad."<hr>";
				echo "Kullanıcı Adı : ".$kullanici_adi."<hr>";
				echo "Şifre 1 : ".$sifre_1."<hr>";
				echo "Şifre 2 : ".$sifre_2."<hr>";
				echo "E-Posta : ".$eposta."<hr>";
				echo "Adres : ".$adres."<hr>";
				echo "Şehir : ".$sehir."<hr>";
				echo "Şart Kabul : ".$sart_kabul."<hr>";
				echo "Reklam Gönder : ".$reklam_gonder."<hr>";
				echo "Ödeme Yöntemi : ".$odemeYontemi."<hr>";
				echo "Sporlar : "; print_r($sporlar); echo "<hr>";
				echo "Fotoğraf : "; print_r($fotograf); echo "<hr>";
			*/
		}
	}
?>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet">

    <title>Form</title>
  </head>
	<body>
	<h1>Müşteriler</h1>
	<hr>
	<h2>Müşteri Listesi</h2>
	
	<table class="table table-hover">
        <thead>
            <tr>
                <th>#</th>
                <th>Ad</th>
                <th>Soyad</th>
                <th>Kullanıcı Adı</th>
                <th>E-Posta</th>
                <th>Adres</th>
                <th>Şehir</th>
                <th>Şart Kabul</th>
                <th>Reklam Göster</th>
                <th>Ödeme Yöntemi</th>
                <th>Sevdiği Sporlar</th>
                <th>Fotoğraf</th>
                <th>Düzenle</th>
            </tr>
        </thead>
        <tbody id="kayit_listeleme_alani">
		<?php
			$sorgu = "SELECT * FROM `musteri`";
			$musteriler = $baglanti->query($sorgu);
			if ($musteriler->num_rows > 0) {
				while($musteri = $musteriler->fetch_assoc()) {
					echo "<tr>";
						echo "<td>".$musteri["id"]."</td>";
						echo "<td>".$musteri["ad"]."</td>";
						echo "<td>".$musteri["soyad"]."</td>";
						echo "<td>".$musteri["kullanici_adi"]."</td>";
						echo "<td>".$musteri["eposta"]."</td>";
						echo "<td>".$musteri["adres"]."</td>";
						$sehir="";
						switch($musteri["sehir"])
						{
							case 10: $sehir="Balıkesir"; break;
							case 34: $sehir="İstanbul"; break;
							case 39: $sehir="Kırklareli"; break;
							default: $sehir="Balıkesir";
						}
						echo "<td>".$sehir."</td>";
						$sart_kabul = "";
						if ($musteri["sart_kabul"])
							$sart_kabul = "<img src='resim/secili.png' width='36'>";
						else
							$sart_kabul = "<img src='resim/secilmemis.png' width='36'>";
						echo "<td>".$sart_kabul."</td>";
						
						$reklam_gonder = "";
						if ($musteri["reklam_gonder"])
							$reklam_gonder = "<img src='resim/secili.png' width='36'>";
						else
							$reklam_gonder = "<img src='resim/secilmemis.png' width='36'>";
						
						echo "<td>".$reklam_gonder."</td>";
						echo "<td>".$musteri["odeme_yontemi"]."</td>";
						echo "<td>".$musteri["sevilen_sporlar"]."</td>";
						if ($musteri["fotograf"] != "")
						{
							echo "<td>";
								echo "<a href='yukleme/".$musteri["fotograf"]."' target='_blank'>";
									echo "<img src='yukleme/".$musteri["fotograf"]."' width='100'>";
								echo "</a>";
							echo "</td>";
							
						}
						else
							echo "<td></td>";
						echo "<td>";
							//echo "<form method='post' action='$_SERVER[PHP_SELF]'>";
								//echo "<input type='hidden' name='silinecek_id' value='$musteri[id]'>";
echo "<button type='submit' class='btn btn-danger silDugmesi' data-kayitno='".$musteri["id"]."'>Sil</button>&nbsp;";
echo "<button type='submit' class='btn btn-info duzenleDugmesi' data-kayitno='".$musteri["id"]."'>Düzenle</button></td>";
							//echo "</form>";
						echo "</td>"; 
					echo "</tr>";
				}
			} else {
			  echo "Kayıt yok";
			}
		?>
            
        </tbody>
    </table>
	
	<hr>
	<h2>Müşteri Ekle</h2>
		<form method="post" action="<?php echo $_SERVER['PHP_SELF'];?>" enctype="multipart/form-data">
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<h4 class="mb-3">Tüm Form Elemanları PHP Örneği</h4>
						  <div class="row g-3">
							<div class="col-sm-6">
							  <label class="form-label">Adınız</label>
							  <input type="text" class="form-control" name="ad" value="Ahmet">
							</div>

							<div class="col-sm-6">
							  <label class="form-label">Soyadınız</label>
							  <input type="text" class="form-control" name="soyad" value="MEHMET">
							</div>

							<div class="col-12">
							  <label for="username" class="form-label">
							  Kullanıcı Adı (Kullanıcı adı girilince veri tabanında kontrol edilerek uygun olup olmadığı belirtilsin. Daha önce alınmışsa kırmızı, alınmamışsa yeşil olsun)
							  </label>
							  <div class="input-group has-validation">
								<span class="input-group-text">@</span>
								<input type="text" class="form-control" name="kullanici_adi" value="kullanici_1" required>
							  </div>
							</div>
							
							<div class="col-6">
							  <label class="form-label">Şifre (Şifre en az 8 karakter. Özel karakter, büyük küçük harf ve rakam içermeli)<span class="text-muted"></span></label>
							  <input type="password" class="form-control" name="sifre_1" value="1234">
							</div>
							<div class="col-6">
							  <label class="form-label">Şifre (Tekrar) (Aynı olup olmadığı giriş anında kontrol edilmeli)<span class="text-muted"></span></label>
							  <input type="password" class="form-control" name="sifre_2" value="1234">
							</div>

							<div class="col-12">
							  <label class="form-label">E-Posta <span class="text-muted"></span></label>
							  <input type="email" class="form-control" name="eposta" value="sen@balikesir.edu.tr">
							</div>

							<div class="col-12">
							  <label class="form-label">Adres</label>
							  <textarea type="text" class="form-control" name="adres">Bizim adres, kapıda yazıyor</textarea>
							</div>

							<div class="col-md-12">
							  <label class="form-label">Şehir</label>
							  <select class="form-select" name="sehir">
								<option value="0">Seçiniz...</option>
								<option value="34">İstanbul</option>
								<option selected value="10">Balıkesir</option>
								<option value="39">Kırklareli</option>
							  </select>

							</div>


							<hr class="my-4">

							<div class="form-check">
								<input type="checkbox" class="form-check-input" name="sart_kabul" checked>
								<label class="form-check-label">Tüm şartları kabul ediyorum</label>
							</div>

							<div class="form-check">
								<input type="checkbox" class="form-check-input" name="reklam_gonder">
								<label class="form-check-label">Bana reklam gönderebilirsiniz</label>
							</div>

          <hr class="my-4">

							<h4 class="mb-3">Ödeme Yöntemi</h4>

							<div class="my-3">
								<div class="form-check">
									<input id="credit" name="odemeYontemi"  value="Kredi Kartı" type="radio" class="form-check-input">
									<label class="form-check-label">Kredi Kartı</label>
								</div>
								<div class="form-check">
									<input id="debit" name="odemeYontemi"  value="Havale" type="radio" class="form-check-input">
									<label class="form-check-label">Havale</label>
								</div>
								<div class="form-check">
									<input id="paypal" name="odemeYontemi" value="Kripto Para" type="radio" class="form-check-input" checked>
									<label class="form-check-label">Kripto Para</label>
								</div>
							</div>

							<div class="row gy-3">
								<div class="col-md-3">
								  <label for="cc-name" class="form-label">Sevdiğiniz Sporlar</label>
								  <select class="form-select" name="sporlar[]" multiple>
									<option selected>Basketbol</option>
									<option>Futbol</option>
									<option>Voleybol</option>
									<option selected>Güreş</option>
								  </select>
								</div>
								<div class="col-md-9">
									<label class="form-label">Fotoğraf seçiniz</label>
									<input class="form-control" type="file" name="fotograf">
								</div>

							</div>


          <hr class="my-4">

          <button class="w-100 btn btn-primary btn-lg" type="submit">Kaydet</button>
        </form>
      </div>
				</div>
			</div>
			
		</form>

<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script>
	$(".silDugmesi").on("click", function() {
		$("#silinecekKayitGizliNesnesi").val($(this).data("kayitno"));
		$("#silPenceresi").modal('show');
} );

$(".duzenleDugmesi").on("click", function() {
	$.getJSON("kayitDuzenlemekIcinVeriGetir.php?did="+$(this).data("kayitno"), function(result){
		$("#duzenle_ad").val(result.ad);
		$("#duzenle_soyad").val(result.soyad);
	});
		$("#duzenlenecek_id_nesnesi").val($(this).data("kayitno"));
		$("#duzenlePenceresi").modal('show');
} );

</script>

<div class="modal fade" id="duzenlePenceresi" tabindex="-1" 
			aria-labelledby="exampleModalLabel" 
			aria-hidden="true" data-bs-backdrop="static">
  <div class="modal-dialog">
  <form method='post' action='<?=$_SERVER['PHP_SELF']?>'>
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Düzenleme</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
		<div class="col-sm-12">
			<label class="form-label">Adınız</label>
			<input type="text" class="form-control" name="ad" id="duzenle_ad" value="">
		</div>
     
		<div class="col-sm-12">
			<label class="form-label">Soyadınız</label>
			<input type="text" class="form-control" name="soyad" id="duzenle_soyad" value="">
		</div>
	  </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success" data-bs-dismiss="modal">Hayır</button>
		<input type='hidden' name='duzenlenecek_id' value='' id="duzenlenecek_id_nesnesi">
        <button type="submit" class="btn btn-danger">Evet</button>
      </div>
    </div>
</form>
  </div>
</div>

<!-- Modal -->
<div class="modal fade" id="silPenceresi" tabindex="-1" 
			aria-labelledby="exampleModalLabel" 
			aria-hidden="true" data-bs-backdrop="static">
  <div class="modal-dialog">
  <form method='post' action='<?=$_SERVER['PHP_SELF']?>'>
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Uyarı</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">İlgili kaydı silmek istediğinizden emin misiniz?</div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success" data-bs-dismiss="modal">Hayır</button>
		<input type='hidden' name='silinecek_id' value='' id="silinecekKayitGizliNesnesi">
        <button type="submit" class="btn btn-danger">Evet</button>
      </div>
    </div>
</form>
  </div>
</div>

		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js"></script>
	</body>
</html>