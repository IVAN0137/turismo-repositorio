<?php
$servername = "localhost";
$username = "root";
$password = ""; 
$dbname = "guia_turistica";

// Conexión a la base de datos
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Variables del formulario
$nombre = $_POST['nombre'];
$colonia = $_POST['colonia'];
$municipio = $_POST['municipio'];
$telefono = $_POST['telefono'];
$correo = $_POST['correo'];
$descripcion = $_POST['descripcion'];

// Manejo de la imagen subida
$foto = $_FILES['foto']['name'];
$foto_tmp = $_FILES['foto']['tmp_name'];
$foto_path = "uploads/" . basename($foto);

// Mover la imagen a la carpeta "uploads"
if (move_uploaded_file($foto_tmp, $foto_path)) {
    // Insertar los datos en la base de datos
    $sql = "INSERT INTO guias (nombre, colonia, municipio, telefono, correo, descripcion, foto)
            VALUES ('$nombre', '$colonia', '$municipio', '$telefono', '$correo', '$descripcion', '$foto')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al guardar en la base de datos']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Error al subir la imagen']);
}

$conn->close();
?>
