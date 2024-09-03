// Selecciona todos los botones de opción
const opciones = document.querySelectorAll('.opcion');

// Añade un evento de clic a cada botón
opciones.forEach(button => {
    button.addEventListener('click', function() {
        // Elimina la clase 'seleccionado' de todos los botones
        opciones.forEach(btn => btn.classList.remove('seleccionado'));

        // Añade la clase 'seleccionado' al botón clicado
        this.classList.add('seleccionado');
    });

});

