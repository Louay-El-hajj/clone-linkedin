<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, Accept");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    
    http_response_code(200);
    exit;
}
$servername = "localhost";
$username = "root";
$password = "";
$database = "linkedin";

$conn = new mysqli($servername, $username, $password, $database);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>