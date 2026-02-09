<?php
$host = "localhost";
$user = "root";   // change if hosting
$pass = "";       // change password
$db   = "your_database_name"; // data base name

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>