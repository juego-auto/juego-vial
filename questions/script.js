

// Selecciona todos los botones de opción
const opciones = document.querySelectorAll('.opcion');


// Añade un evento de clic a cada botón
opciones.forEach(button => {
    button.addEventListener('click', function() {
        // Elimina la clase 'seleccionado' de todos los botones
        opciones.forEach(btn => btn.classList.remove('seleccionado'));

        // Añade la clase 'seleccionado' al botón clicado
        this.classList.add('seleccionado');

        // Llama a la función para verificar la respuesta
        checkAnswer(this.dataset.option); // Usa el atributo data-option
        console.log(this);
    });
});

function checkAnswer(selectedOption) {
    const correctAnswer = 'A'; // La respuesta correcta es la opción A
    const feedbackElement = document.getElementById('feedback');
    
    // Verifica si el nivel ya ha sido incrementado
    let currentLevel = parseInt(localStorage.getItem("nivel actual")) || 0;
    const levelIncremented = localStorage.getItem("levelIncremented") === 'true';

    if (selectedOption === correctAnswer) {
        feedbackElement.textContent = '¡Correcto!';
        feedbackElement.className = 'feedback correct';

        // Solo incrementa si no se ha hecho antes
        if (!levelIncremented) {
            currentLevel++;
            localStorage.setItem("nivel actual", currentLevel);
            localStorage.setItem("levelIncremented", 'true'); // Marca que el nivel ha sido incrementado
            console.log(`Nivel actual: ${currentLevel}`); // Para verificar el nivel actualizado
        }
    } else {
        feedbackElement.textContent = 'Incorrecto. La respuesta correcta es A.';
        feedbackElement.className = 'feedback incorrect';
    }
}

// Código para el JSON (si es necesario)
fetch("../db.json")
    .then(res => res.json())
    .then(data => {
        console.log(data)
        document.getElementById("pregunta").innerText =data.preguntas[localStorage.getItem('LevelTo')-1].pregunta;
        document.getElementById("img").src =data.preguntas[localStorage.getItem('LevelTo')-1].imagen;
        document.getElementById("option1").innerText = data.preguntas[localStorage.getItem('LevelTo')-1].opciones[0].texto;
        document.getElementById("option1").innerText=opcion.text[localStorage.getItem('LevelTo')-1].opcion.dataset.correct=opcion.correct;
        opcion.innerText=opcion.text;
        opcion.dataset.correct=opcion.correct;
        document.getElementById("option2").innerText = data.preguntas[localStorage.getItem('LevelTo')-1].opciones[1].texto;
        document.getElementById("option3").innerText=data.preguntas[localStorage.getItem('LevelTo')-1].opciones[2].texto;
    })
    
    .catch(error => {
        console.error("Error al obtener los datos:", error);
    });

// Inicializa el localStorage si es la primera vez que se carga
if (localStorage.getItem("nivel actual") == null) {
    localStorage.setItem("nivel actual", "0");
    localStorage.setItem("levelIncremented", 'false'); // Asegúrate de que se pueda incrementar
}

console.log(localStorage.getItem("nivel actual"));
