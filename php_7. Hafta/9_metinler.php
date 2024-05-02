<?php
    $a = "Merhaba";
    $b = "Dünya";
    echo $a." ".$b;
    echo "<hr>";
    echo strlen($a);
    echo "<hr>";
    echo str_word_count("Hello world!");
    echo "<hr>";
    echo strrev("Hello world!");
    echo "<hr>";
    $str = "Mary Had A Little Lamb and She LOVED It So";
    $str = strtolower($str);
    echo $str;
    echo "<hr>";
    $str = "Mary Had A Little Lamb and She LOVED It So";
    $str = strtoupper($str);
    echo $str;
?>