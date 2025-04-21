<form method="get" action="11_get.php">
	  En: <input type="text" name="en" value="<?=!empty($_GET["en"])?$_GET["en"]:""?>">
	  <br>
	  Boy: <input type="text" name="boy" value="<?=!empty($_GET["boy"])?$_GET["boy"]:""?>">
	  <br>
	  <input type="submit">
	  <hr>
	</form>
<?php
	echo $_GET["en"];
	echo "<hr>";
	echo $_GET["boy"];
	echo "<hr>";
	echo '<a href="11_get.php?en=10&boy=20">En Boy Değerlerini GET ile Gönder</a>';
