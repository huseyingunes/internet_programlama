<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php echo "<title>Document</title>";?>
    <style>
        <?php
        echo '
        body{
            color:blue;
        }
        '; ?>
    </style>
</head>
<body>
    <?php echo"HTML ile web sunucu dünyasına merhaba!"?>
    <p id="icerik_degisecek">Değişsin</p>
    <script type="text/javascript">
        <?php echo 'document.getElementById("icerik_degisecek").innerHTML = "İçerik Değişti";' ?>
    </script>
</body>
</html>
