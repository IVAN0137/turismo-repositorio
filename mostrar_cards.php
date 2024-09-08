<?php
// Configura tus credenciales de base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "guias_turisticos"; // Cambia esto por el nombre de tu base de datos

// Crea conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Define la consulta SQL
$sql = "SELECT nombre, colonia, municipio, foto FROM guias_turisticos"; // Cambia "guias_turisticos" al nombre de tu tabla
$result = $conn->query($sql);

// Verifica si hay resultados
if ($result->num_rows > 0) {
    // Salida de cada fila
    while($row = $result->fetch_assoc()) {
        echo '<div class="card">';
        echo '<img src="uploads/' . htmlspecialchars($row['foto']) . '" alt="Foto de ' . htmlspecialchars($row['nombre']) . '">';
        echo '<div class="card-body">';
        echo '<h3>' . htmlspecialchars($row['nombre']) . '</h3>';
        echo '<p>Colonia: ' . htmlspecialchars($row['colonia']) . '</p>';
        echo '<p>Municipio: ' . htmlspecialchars($row['municipio']) . '</p>';
        echo '</div>';
        echo '</div>';
    }
} else {
    echo '<p>No hay guías turísticos disponibles.</p>';
}

// Cierra la conexión
$conn->close();
?>
