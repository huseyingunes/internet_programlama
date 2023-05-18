<?php
	session_start();
	
	// remove all session variables
	session_unset();

	// destroy the session
	session_destroy();
	
	$_SESSION["ulke"] = "Türkiye";
	echo $_SESSION["ulke"];
?>
