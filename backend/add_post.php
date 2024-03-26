<?php
header("Content-Type: application/json; charset=UTF-8");


include 'db_config.php';

$data = json_decode(file_get_contents("php://input"));

$content = $conn->real_escape_string($data->content);
$user_id=$_GET["userId"];
$sql = "INSERT INTO posts (user_id, content) VALUES ('$user_id', '$content')";

if ($conn->query($sql) === TRUE) {
    $response = array("message" => "Post added successfully");
} else {
    $response = array("error" => "Error: " . $sql . "<br>" . $conn->error);
}

echo json_encode($response);
$conn->close();
?>
