<html>
<body>

	<form method="post" action="10_request.php">
	  Adınız: <input type="text" name="ad">
	  <input type="submit">
	</form>

	<?php
		echo "<hr>".$_SERVER["REQUEST_METHOD"]."<hr>";
		if ($_SERVER["REQUEST_METHOD"] == "POST") {
			$ad = $_REQUEST['ad'];
			if (empty($ad)) {
				echo "Ad boş";
			} else {
				echo $ad;
			}
		}
		else if ($_SERVER["REQUEST_METHOD"] == "GET") {
			$ad = $_REQUEST['ad'];
			if (empty($ad)) {
				echo "Ad boş";
			} else {
				echo $ad." ".$_REQUEST['soyad'];
			}
		}
	?>
	<hr>
	<a href="10_request.php?ad=anadolu&soyad=efes">Ad Değişkenini Get İle Gönder</a>

</body>
</html>