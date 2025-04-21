<?php
    $a = 10;
    $b = 20;

    $GLOBALS["universite"] = "Balıkesir";

    function topla($q, $w) {
        echo $GLOBALS["universite"];
        return $q + $q;
    }

    echo topla(3, 5);
?>
<a href="2_globals.php">2. Global Sayfası</a>