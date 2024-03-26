<?php
// Allow requests from any origin
header("Access-Control-Allow-Origin: *");

// Allow requests with methods GET, POST, and OPTIONS
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// Allow requests with headers Origin, Content-Type, and Accept
header("Access-Control-Allow-Headers: Origin, Content-Type, Accept");

// Check if it's a preflight request (OPTIONS method)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Return status code 200 (OK) for preflight requests
    http_response_code(200);
    exit;
}
$servername = "localhost";
$username = "root";
$password = "";
$database = "linkedin";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
