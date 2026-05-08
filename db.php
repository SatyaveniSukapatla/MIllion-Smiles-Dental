<?php
$host = "localhost";
$user = "u834764913_Filesie_Admin";   // change if hosting
$pass = "Dzire@4595";       // change password
$db   = "u834764913_MSD26DB"; // data base name

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
