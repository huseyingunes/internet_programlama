<?php
    session_start();
    echo $_SESSION["her_yerde"];
?>
<a href="3_session.php">3. Oturum Sayfası</a>
<?php
    $_SESSION["her_yerde"] = 33;
?>