<?php

header("Content-Type: application/json; charset=UTF-8");

include 'db_config.php';

$sql = "SELECT id,  content FROM posts";
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