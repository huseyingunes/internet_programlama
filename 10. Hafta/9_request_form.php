<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="" method="get">
        a : <input name="a"><br>
        b : <input name="b"><br>
        <input type="submit" value="Gönder">
    </form>
    <hr>
    <?php
        var_dump($_REQUEST);
        echo "<hr>";
        var_dump($_GET);
    ?>
</body>
</html>