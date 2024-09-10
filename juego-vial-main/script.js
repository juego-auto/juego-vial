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
    const codetextElement = document.getElementById("codetext")
    const codigoElement = document.getElementById("codigo")
    const copyButton = document.getElementById('copy-button');
    
    if (selectedOption === correctAnswer) {
        feedbackElement.textContent = '¡Correcto!';
        feedbackElement.className = 'feedback correct';
        codetextElement.textContent = "El codigo para el siguiente nivel es:";
        codigoElement.textContent = 'Atento a las señales';
        copyButton.classList.remove('hidden'); // Muestra el botón
    }


         else {
        feedbackElement.textContent = 'Incorrecto. La respuesta correcta es A.';
        feedbackElement.className = 'feedback incorrect';
        codigoElement.textContent = "";
        codetextElement.textContent = "";
        copyButton.classList.add('hidden'); // Oculta el botón
    }
}

function copyToClipboard() {
    const textToCopy = document.getElementById('codigo').textContent;
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert('Texto copiado al portapapeles!');
    }).catch(err => {
        console.error('Error al copiar el texto: ', err);
    });
}

// codigo para el json

fetch("../db.json")
    .then(res => res.json())
    .then(data => {
        console.log(document.getElementById("pregunta"))
        document.getElementById("pregunta").innerText=data.preguntas[currentLevel].pregunta;
    })
    .catch(error => {
        console.error("Error al obtener los datos:", error);
    });

    console.log(localStorage.setItem("nivel actual", "0"));
    console.log(localStorage.getItem("nivel actual"));
    