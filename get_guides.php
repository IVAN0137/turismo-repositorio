<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "guia_turistica";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$sql = "SELECT * FROM guias";
$result = $conn->query($sql);

$guides = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $guides[] = $row;
    }
}

echo json_encode(['guides' => $guides]);

$conn->close();
?>
