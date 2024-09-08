// Archivo: mostrar_comentarios.php
<?php
$host = 'localhost';
$dbname = 'comentarios_db';
$user = 'root';
$pass = '';

// Conectar a la base de datos
$conn = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);

// Obtener los comentarios
$stmt = $conn->prepare("SELECT rating, comentario FROM comentarios ORDER BY id DESC");
$stmt->execute();
$comentarios = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Mostrar comentarios
foreach ($comentarios as $comentario) {
    echo '<div class="comment">';
    echo '<strong>Rating: ' . $comentario['rating'] . '</strong>';
    echo '<p>' . $comentario['comentario'] . '</p>';
    echo '</div>';
}
?>
