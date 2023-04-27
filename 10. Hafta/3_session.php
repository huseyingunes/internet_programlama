<?php
    session_start();
    echo $_SESSION["her_yerde"];
    $_SESSION["her_yerde"] = 55;
?>
<a href="4_session.php">4. Oturum Sayfası</a>