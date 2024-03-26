<?php
header('Content-Type: application/json');
include 'db_config.php';

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

// Check if username and password are provided
if (isset($data['username']) && isset($data['password'])) {
    $username = $conn->real_escape_string($data['username']);
    $password = $conn->real_escape_string($data['password']);

    // Fetch user from database
    $sql = "SELECT * FROM users WHERE username='$username'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        // Verify password
        if (password_verify($password, $row['password'])) {
            // Authentication successful
            echo json_encode(array('success' => true, 'message' => 'Login successful','userId'=>$row["user_id"]));
        } else {
            // Invalid password
            echo json_encode(array('success' => false, 'message' => 'Invalid username or password'));
        }
    } else {
        // User not found
        echo json_encode(array('success' => false, 'message' => 'User not found'));
    }
} else {
    // Invalid request
    echo json_encode(array('success' => false, 'message' => 'Invalid request'));
}

$conn->close();
?>
