<?php
header('Content-Type: application/json');
include 'db_config.php';


$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['username']) && isset($data['password'])) {
    $username = $conn->real_escape_string($data['username']);
    $password = $conn->real_escape_string($data['password']);

    
    $sql = "SELECT * FROM users WHERE username='$username'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        
        if (password_verify($password, $row['password'])) {
            
            echo json_encode(array('success' => true, 'message' => 'Login successful'));
        } else {
            
            echo json_encode(array('success' => false, 'message' => 'Invalid username or password'));
        }
    } else {
        
        echo json_encode(array('success' => false, 'message' => 'User not found'));
    }
} else {
   
    echo json_encode(array('success' => false, 'message' => 'Invalid request'));
}

$conn->close();
?>