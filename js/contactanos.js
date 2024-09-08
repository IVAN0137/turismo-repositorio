document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-guide-form');
    const editForm = document.getElementById('edit-guide-form');
    const searchInput = document.getElementById('search-input');
    const cardsContainer = document.getElementById('cards-container');
    const editModal = document.getElementById('edit-modal'); // Modal de edición

    // Función para cargar guías turísticos
    const loadGuides = () => {
        fetch('get_guides.php')
            .then(response => response.json())
            .then(data => {
                cardsContainer.innerHTML = ''; // Limpiar el contenedor de tarjetas
                data.guides.forEach(guide => {
                    const card = document.createElement('div');
                    card.classList.add('card');
                    card.innerHTML = `
                        <img src="uploads/${guide.foto}" alt="Foto de ${guide.nombre}">
                        <h3>${guide.nombre}</h3>
                        <p><strong>Colonia:</strong> ${guide.colonia}</p>
                        <p><strong>Municipio:</strong> ${guide.municipio}</p>
                        <p><strong>Teléfono:</strong> ${guide.telefono}</p>
                        <p><strong>Correo:</strong> ${guide.correo}</p>
                        <p>${guide.descripcion}</p>
                        <button class="edit-btn" data-id="${guide.id}">Editar</button>
                        <button class="delete-btn" data-id="${guide.id}">Eliminar</button>
                    `;
                    cardsContainer.appendChild(card);
                });

                // Asignar eventos a los botones de edición y eliminación
                document.querySelectorAll('.edit-btn').forEach(btn => {
                    btn.addEventListener('click', handleEditClick);
                });

                document.querySelectorAll('.delete-btn').forEach(btn => {
                    btn.addEventListener('click', handleDeleteClick);
                });
            })
            .catch(error => console.error('Error:', error));
    };

    // Manejar el envío del formulario para agregar un nuevo guía turístico
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);

        fetch('add_guide.php', { 
            method: 'POST', 
            body: formData 
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                form.reset(); // Limpiar el formulario
                loadGuides();  // Volver a cargar los guías
            } else {
                alert(data.message || 'Error al agregar el guía turístico');
            }
        })
        .catch(error => console.error('Error:', error));
    });

    // Manejar el clic del botón de edición
    const handleEditClick = (e) => {
        const id = e.target.dataset.id;

        fetch(`get_guide.php?id=${id}`)
            .then(response => response.json())
            .then(guide => {
                if (guide) {
                    document.getElementById('edit-id').value = guide.id;
                    document.getElementById('edit-nombre').value = guide.nombre;
                    document.getElementById('edit-colonia').value = guide.colonia;
                    document.getElementById('edit-municipio').value = guide.municipio;
                    document.getElementById('edit-telefono').value = guide.telefono;
                    document.getElementById('edit-correo').value = guide.correo;
                    document.getElementById('edit-descripcion').value = guide.descripcion;
                    editModal.style.display = 'block'; // Mostrar modal de edición
                }
            })
            .catch(error => console.error('Error:', error));
    };

    // Manejar el envío del formulario para editar un guía turístico
    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(editForm);

        fetch('edit_guide.php', { 
            method: 'POST', 
            body: formData 
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                editModal.style.display = 'none'; // Cerrar modal de edición
                loadGuides(); // Volver a cargar guías
            } else {
                alert('Error al editar el guía turístico');
            }
        })
        .catch(error => console.error('Error:', error));
    });

    // Función para manejar la eliminación de un guía turístico
    const handleDeleteClick = (e) => {
        const id = e.target.dataset.id;

        fetch(`delete_guide.php?id=${id}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    loadGuides(); // Volver a cargar guías después de eliminar uno
                } else {
                    alert('Error al eliminar el guía turístico');
                }
            })
            .catch(error => console.error('Error:', error));
    };

    // Filtrar guías por búsqueda
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();

        document.querySelectorAll('.card').forEach(card => {
            const cardText = card.textContent.toLowerCase();
            if (cardText.includes(searchTerm)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Cargar guías cuando la página esté lista
    loadGuides();
});
