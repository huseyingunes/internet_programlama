<form method="post" action="12_post.php">
	En: <input type="text" name="en" value="<?=!empty($_POST["en"])?$_POST["en"]:""?>">
	<br>
	Boy: <input type="text" name="boy" value="<?=!empty($_POST["boy"])?$_POST["boy"]:""?>">
	<br>
	<input type="submit">
	<hr>
</form>
<?php
	echo $_POST["en"];
	echo "<hr>";
	echo $_POST["boy"];
	echo "<hr>";