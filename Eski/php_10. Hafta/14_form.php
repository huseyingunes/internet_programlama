<!doctype html>
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
		<form method="post" action="<?php echo $_SERVER['PHP_SELF'];?>" enctype="multipart/form-data">
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<h4 class="mb-3">Tüm Form Elemanları PHP Örneği</h4>
						  <div class="row g-3">
							<div class="col-sm-6">
							  <label class="form-label">Adınız</label>
							  <input type="text" class="form-control" name="ad" value="" required>
							</div>

							<div class="col-sm-6">
							  <label class="form-label">Soyadınız</label>
							  <input type="text" class="form-control" name="soyad" value="" required>
							</div>

							<div class="col-12">
							  <label for="username" class="form-label">
							  Kullanıcı Adı (Kullanıcı adı girilince veri tabanında kontrol edilerek uygun olup olmadığı belirtilsin. Daha önce alınmışsa kırmızı, alınmamışsa yeşil olsun)
							  </label>
							  <div class="input-group has-validation">
								<span class="input-group-text">@</span>
								<input type="text" class="form-control" name="kullanici_adi" required>
							  </div>
							</div>
							
							<div class="col-6">
							  <label class="form-label">Şifre (Şifre en az 8 karakter. Özel karakter, büyük küçük harf ve rakam içermeli)<span class="text-muted"></span></label>
							  <input type="password" class="form-control" name="sifre_1">
							</div>
							<div class="col-6">
							  <label class="form-label">Şifre (Tekrar) (Aynı olup olmadığı giriş anında kontrol edilmeli)<span class="text-muted"></span></label>
							  <input type="password" class="form-control" name="sifre_2">
							</div>

							<div class="col-12">
							  <label class="form-label">E-Posta <span class="text-muted"></span></label>
							  <input type="email" class="form-control" name="eposta" placeholder="sen@balikesir.edu.tr">
							</div>

							<div class="col-12">
							  <label class="form-label">Adres</label>
							  <textarea type="text" class="form-control" name="adres"></textarea>
							</div>

							<div class="col-md-12">
							  <label class="form-label">Şehir</label>
							  <select class="form-select" name="sehir">
								<option value="">Seçiniz...</option>
								<option>İstanbul</option>
								<option>Balıkesir</option>
								<option>Kırklareli</option>
							  </select>

							</div>


							<hr class="my-4">

							<div class="form-check">
								<input type="checkbox" class="form-check-input" name="sart_kabul">
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
									<input id="credit" name="odemeYontemi" type="radio" class="form-check-input">
									<label class="form-check-label">Kredi Kartı</label>
								</div>
								<div class="form-check">
									<input id="debit" name="odemeYontemi" type="radio" class="form-check-input">
									<label class="form-check-label">Havale</label>
								</div>
								<div class="form-check">
									<input id="paypal" name="odemeYontemi" type="radio" class="form-check-input">
									<label class="form-check-label">Kripto Para</label>
								</div>
							</div>

							<div class="row gy-3">
								<div class="col-md-3">
								  <label for="cc-name" class="form-label">Sevdiğiniz Sporlar</label>
								  <select class="form-select" name="sporlar[]" multiple>
									<option>Basketbol</option>
									<option>Futbol</option>
									<option>Voleybol</option>
									<option>Güreş</option>
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
	
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js"></script>
	</body>
</html>