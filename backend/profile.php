<?php
// Handle API requests for following/unfollowing users

require 'db_config.php';

header("Access-Control-Allow-Origin: *");

// Function to fetch user profile data
function getUserProfile($userId) {
    global $conn;
    $sql = "SELECT * FROM users WHERE user_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    $userProfile = $result->fetch_assoc();

    $sql = "SELECT * FROM follows WHERE followed_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    if($result->num_rows > 0){
    $follows = array();
    while ($row = $result->fetch_assoc()) {
        $follows[] = $row;
    }
    $userProfile["follows"] = $follows;
    }
    $sql2 = "SELECT * FROM experience WHERE user_id = ?";
    $stmt2 = $conn->prepare($sql2);
    $stmt2->bind_param("i", $userId);
    $stmt2->execute();
    $result2 = $stmt2->get_result();
    //var_dump($result2);
    if($result2->num_rows > 0){ 
        $experience = array();
    while ($row = $result2->fetch_assoc()) {
        $experience[] = $row;
    }
    $userProfile["experience"] = $experience;}
    else
    $userProfile["experience"]=[] ; 

    $sql2 = "SELECT * FROM education WHERE user_id = ?";
    $stmt2 = $conn->prepare($sql2);
    $stmt2->bind_param("i", $userId);
    $stmt2->execute();
    $result2 = $stmt2->get_result();
    if($result2->num_rows > 0){
    $education = array();
    while ($row = $result2->fetch_assoc()) {
        $education[] = $row;
    }
    $userProfile["education"] = $education;
    }
    else
    $userProfile["education"]=[] ; 


     $sql2 = "SELECT * FROM skills WHERE user_id = ?";
    $stmt2 = $conn->prepare($sql2);
    $stmt2->bind_param("i", $userId);
    $stmt2->execute();
    $result2 = $stmt2->get_result();
    if($result2->num_rows > 0){ 
        $skills = array();
    while ($row = $result2->fetch_assoc()) {
        $skills[] = $row;
    }
    $userProfile["skills"] = $skills;}
    else
    $userProfile["skills"]=[]  ;
    return $userProfile;
}

// Function to update user profile data
function updateUserProfile($userId, $profileData) {
    global $conn;
    // Implement updating user profile data in the database
}


function followUser($followerId, $followedId) {
    global $conn;
    $sql = "INSERT INTO follows (follower_id, followed_id) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $followerId, $followedId);
    if ($stmt->execute()) {
        // Signup successful
        echo json_encode(array('success' => true, 'message' => 'follow successful'));
    } else {
        // Signup failed
        echo json_encode(array('success' => false, 'message' => 'Error: ' . $conn->error));
    }
    $stmt->close();
}


function unfollowUser($followerId, $followedId) {
    global $conn;
    $sql = "DELETE FROM follows WHERE follower_id = ? AND followed_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $followerId, $followedId);
    if ($stmt->execute()) {
        // Signup successful
        echo json_encode(array('success' => true, 'message' => 'unfollow successful'));
    } else {
        // Signup failed
        echo json_encode(array('success' => false, 'message' => 'Error: ' . $conn->error));
    }
    $stmt->close();
}

// Handle incoming requests
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Get user profile data
    if (isset($_GET['userId'])) {
        $userId = $_GET['userId'];
        $userProfile = getUserProfile($userId);
        echo json_encode($userProfile);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Update user profile data
    // Extract data from request body
    $data = json_decode(file_get_contents("php://input"), true);
    if (isset($_GET['userId']) && isset($data['profileData'])) {
        $userId = $_GET['userId'];
        $profileData = $data['profileData'];
        updateUserProfile($userId, $profileData);
        // Respond with success message or status code
        // Implement your own response logic here
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Follow or unfollow a user
    // Extract data from request body
    $data = json_decode(file_get_contents("php://input"), true);
    if (isset($data['followerId']) && isset($data['followedId']) && isset($data['action'])) {
        $followerId = $data['followerId'];
        $followedId = $data['followedId'];
        $action = $data['action'];
        if ($action === 'follow') {

            $follow=followUser($followerId, $followedId);
            echo json_encode($follow);
        } elseif ($action === 'unfollow') {
            $unfollow=unfollowUser($followerId, $followedId);
            echo json_encode($unfollow);
        }
        // Respond with success message or status code
        // Implement your own response logic here
    }
}

?>


