<?php
header("Content-Type: application/json; charset=UTF-8");

include 'db_config.php';
$data = json_decode(file_get_contents('php://input'), true);

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if the action parameter is set
    if (isset($data['action'])) {
        // Handle adding experience
        if ($data['action'] === 'addExperience') {
            // Retrieve data from the POST request
            $userId = $data['userId'];
            $company = $data['company'];
            $position = $data['position'];
            $startDate = $data['startDate'];
            $endDate = $data['endDate'];
            $description = $data['description'];
            

             $query = "INSERT INTO experience (user_id, company, position, start_date, end_date, description) VALUES ($userId, '$company', '$position', '$startDate', '$endDate','$description')";
              if ($conn->query($query) === TRUE) {
                    // Signup successful
                    echo json_encode(array('success' => true, 'message' => 'added successful'));
                } else {
                    // Signup failed
                    echo json_encode(array('success' => false, 'message' => 'Error: ' . $conn->error));
                }
        }
        // Handle adding skills
        elseif ($data['action'] === 'addSkills') {
            // Retrieve data from the POST request
            $userId = $data['userId'];
            $skillName = $data['skillName'];
            $proficiency = $data['proficiency'];
            

             $query = "INSERT INTO skills (user_id, skill_name, proficiency) VALUES ($userId, '$skillName', '$proficiency')";
            
                if ($conn->query($query) === TRUE) {
                    // Signup successful
                    echo json_encode(array('success' => true, 'message' => 'added successful'));
                } else {
                    // Signup failed
                    echo json_encode(array('success' => false, 'message' => 'Error: ' . $conn->error));
                }
            
            // Return success or failure response
        }
        // Handle adding education
        elseif ($data['action'] === 'addEducation') {
            // Retrieve data from the POST request
            $userId = $data['userId'];
            $institution = $data['institution'];
            $degree = $data['degree'];
            $fieldOfStudy = $data['fieldOfStudy'];
            $startDate = $data['startDate'];
            $endDate = $data['endDate'];
            $description = $data['description'];

             $query = "INSERT INTO education (user_id, institution, degree, field_of_study, start_date, end_date, description) VALUES ($userId, '$institution', '$degree','$fieldOfStudy', '$startDate', '$endDate','$description')";
            if ($conn->query($query) === TRUE) {
                    // Signup successful
                    echo json_encode(array('success' => true, 'message' => 'added successful'));
                } else {
                    // Signup failed
                    echo json_encode(array('success' => false, 'message' => 'Error: ' . $conn->error));
                }
        }
    }
}
?>
