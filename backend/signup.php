<?php

header("Access-Control-Allow-Origin: http://localhost:3000");

header('Content-Type: application/json');
include 'db_config.php';

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);


// Check if username and password are provided
if (isset($data['username']) && isset($data['password']) && isset($data['email']) && isset($data['name']) && isset($data['type'])) {
    $username = $conn->real_escape_string($data['username']);
    $password = password_hash($conn->real_escape_string($data['password']), PASSWORD_DEFAULT);
    $name = $conn->real_escape_string($data['name']);
    $email = $conn->real_escape_string($data['email']);
    $type = $conn->real_escape_string($data['type']);


$stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
$stmt->bind_param("s", $username);

$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(array('success' => false, 'message' => 'username already exists.'));
} else {
    // Insert user into database
    $sql = "INSERT INTO users (username, password,name,email,type) VALUES ('$username', '$password','$name','$email','$type')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(array('success' => true, 'message' => 'Signup successful'));
    } else {
        echo json_encode(array('success' => false, 'message' => 'Error: ' . $conn->error));
    }
}
} else {
    // Invalid request
    echo json_encode(array('success' => false, 'message' => 'Invalid request'));
}

$conn->close();
?>
