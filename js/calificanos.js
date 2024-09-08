// Función para cargar comentarios desde la base de datos
function cargarComentarios() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'guardar_comentario.php', true); // Petición GET para obtener los comentarios guardados
    xhr.setRequestHeader('Accept', 'application/json');

    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            var response = JSON.parse(xhr.responseText);
            if (response.status === 'success') {
                var comentariosDiv = document.getElementById('comentarios');
                comentariosDiv.innerHTML = ''; // Limpiar la sección de comentarios

                // Iterar sobre los comentarios recibidos y agregarlos al DOM
                response.comentarios.forEach(function(comentario) {
                    var newComment = document.createElement('div');
                    newComment.className = 'comment';
                    newComment.innerHTML = '<strong>Rating: ' + comentario.rating + '</strong><p>' + comentario.comentario + '</p><small>' + comentario.fecha + '</small>';
                    comentariosDiv.appendChild(newComment);
                });
            } else {
                alert('Error al cargar los comentarios.');
            }
        } else {
            alert('Error en la solicitud.');
        }
    };

    xhr.send();
}

// Manejar el envío del formulario de calificación
document.getElementById('ratingForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío tradicional del formulario

    var formData = new FormData(this);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', this.action, true);
    xhr.setRequestHeader('Accept', 'application/json');

    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            var response = JSON.parse(xhr.responseText);
            if (response.status === 'success') {
                // Recargar los comentarios para reflejar el nuevo comentario
                cargarComentarios();

                // Limpiar el formulario después del envío
                document.getElementById('ratingForm').reset();
            } else {
                alert('Error al enviar el comentario.');
            }
        } else {
            alert('Error en la solicitud.');
        }
    };

    xhr.send(formData);
});

// Cargar los comentarios cuando la página cargue por primera vez
window.onload = function() {
    cargarComentarios();
};
