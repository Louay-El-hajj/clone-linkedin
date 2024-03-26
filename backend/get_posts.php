<?php

header("Content-Type: application/json; charset=UTF-8");

include 'db_config.php';

$sql = "SELECT posts.id as id,  posts.content as content ,users.name as name, users.user_id as user_id FROM posts inner join users on users.user_id=posts.user_id";
$result = $conn->query($sql);

$posts = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $posts[] = $row;
    }
}

echo json_encode($posts);
$conn->close();
?>
