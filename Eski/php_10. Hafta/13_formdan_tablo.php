<h1>Eni Boyu Girilen Tabloyu Oluşturan Kodu Yazınız.</h1>
<h2>Tablonun her hücresinde rastgele bir renk olsun</h2>
<form method="post" action="13_formdan_tablo.php">
	En: <input type="text" name="en" value="<?=!empty($_POST["en"])?$_POST["en"]:""?>">
	<br>
	Boy: <input type="text" name="boy" value="<?=!empty($_POST["boy"])?$_POST["boy"]:""?>">
	<br>
	<input type="submit">
	<hr>
</form>
<?php
	function random_color_part() {
		return str_pad( dechex( mt_rand( 0, 255 ) ), 2, '0', STR_PAD_LEFT);
	}

	function random_color() {
		return random_color_part() . random_color_part() . random_color_part();
	}

	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		if (is_numeric($_POST["en"]) && is_numeric($_POST["boy"]))
		{
			echo "<table border='2'>";
			for ($i=0; $i<$_POST["boy"]; $i++)
			{
				echo "<tr>";
				for ($s=0; $s<$_POST["en"]; $s++)
				{
					echo "<td style='background-color:".random_color()."'>".($i+$s)."</td>";
				}
				echo "</tr>";
			}
			echo "</table>";
		}
	}
?>