<?php
// Configuración de la base de datos
$host = 'localhost';
$dbname = 'comentarios_db';
$user = 'root'; // Cambia según tu configuración
$pass = ''; // Cambia según tu configuración

// Conexión a la base de datos utilizando PDO
try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Error de conexión: ' . $e->getMessage()]);
    exit();
}

// Verificar si los datos han sido enviados por POST para guardar un comentario
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['rating']) && isset($_POST['comentario']) && !empty($_POST['rating']) && !empty($_POST['comentario'])) {
        $rating = $_POST['rating'];
        $comentario = $_POST['comentario'];

        // Insertar el comentario en la base de datos
        try {
            $stmt = $conn->prepare("INSERT INTO comentarios (rating, comentario) VALUES (?, ?)");
            $stmt->execute([$rating, $comentario]);

            // Responder con JSON de éxito
            echo json_encode([
                'status' => 'success',
                'rating' => $rating,
                'comentario' => $comentario
            ]);
        } catch (PDOException $e) {
            echo json_encode(['status' => 'error', 'message' => 'Error al insertar el comentario: ' . $e->getMessage()]);
        }
        exit();
    } else {
        // Respuesta si faltan campos
        echo json_encode(['status' => 'error', 'message' => 'Por favor completa todos los campos.']);
        exit();
    }
}

// Consultar los comentarios existentes para mostrarlos en la página
try {
    $stmt = $conn->prepare("SELECT rating, comentario, fecha FROM comentarios ORDER BY fecha DESC");
    $stmt->execute();
    $comentarios = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Devolver los comentarios en formato JSON
    echo json_encode([
        'status' => 'success',
        'comentarios' => $comentarios
    ]);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Error al obtener los comentarios: ' . $e->getMessage()]);
}
?>
