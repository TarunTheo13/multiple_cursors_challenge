<?php
$servername = "127.0.0.1";
$username = "root";
$password = "Gauranga";
$dbname = "cursor";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM coordinates";
$result = $conn->query($sql);

$resultarray = array();

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    array_push($resultarray, $row);
  }
}
$conn->close();
echo json_encode($resultarray);
?>
