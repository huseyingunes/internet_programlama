<?php
    $a = 5;
    var_dump(is_nan($a));
    echo "<hr>";
    $b = "5";
    var_dump(is_nan($b));
    echo "<hr>";
    $c = "a";
    var_dump(is_nan($c));
?>