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
function checkAnswer(selectedOption) {
    const correctAnswer = 'A'; // La respuesta correcta es la opción A
    const feedbackElement = document.getElementById('feedback');
    
    if (selectedOption === correctAnswer) {
        feedbackElement.textContent = '¡Correcto!';
        feedbackElement.className = 'feedback correct';
    } else {
        feedbackElement.textContent = 'Incorrecto. La respuesta correcta es A.';
        feedbackElement.className = 'feedback incorrect';
    }
}

