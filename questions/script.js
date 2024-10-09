// Selecciona todos los botones de opción
const opciones = document.querySelectorAll('.opcion');

// Variable para controlar si ya se ha incrementado el nivel en la pregunta actual
let nivelIncrementado = false;

// Añade un evento de clic a cada botón
opciones.forEach(button => {
    button.addEventListener('click', function () {
        // Elimina la clase 'seleccionado' de todos los botones
        opciones.forEach(btn => btn.classList.remove('seleccionado'));

        // Añade la clase 'seleccionado' al botón clicado
        this.classList.add('seleccionado');

        // Llama a la función para verificar la respuesta
        checkAnswer(this.dataset.correct); // Usa el atributo data-correct
    });
});

function checkAnswer(selectedOption) {
    const feedbackElement = document.getElementById('feedback');

    let levelMax = parseInt(localStorage.getItem("levelMax")) || 0;
    let LevelTo = parseInt(localStorage.getItem("LevelTo")) || 1;
    let completedLevels = JSON.parse(localStorage.getItem("completedLevels")) || [];

    // Verifica si ya se incrementó el nivel para esta pregunta
    if (nivelIncrementado) {
        return; // No hace nada si ya se incrementó
    }

    if (selectedOption === 'true') {
        feedbackElement.textContent = '¡Correcto!';
        feedbackElement.className = 'feedback correct';

        // Solo actualiza el nivel si es el nivel correcto para avanzar
        if (LevelTo === levelMax + 1) {
            // Incrementa el nivel máximo
            levelMax++;
            localStorage.setItem("levelMax", levelMax);
            console.log(`Nuevo nivel máximo: ${levelMax}`);

            // Marca el nivel como completado
            completedLevels.push(levelMax);
            localStorage.setItem("completedLevels", JSON.stringify(completedLevels));

            // Actualiza el siguiente nivel a desbloquear
            LevelTo++;
            localStorage.setItem("LevelTo", LevelTo);

            // Marca que el nivel ya fue incrementado
            nivelIncrementado = true;

            console.log(`Niveles completados: ${completedLevels}`);
        }
    } else {
        feedbackElement.textContent = 'Incorrecto. Inténtalo de nuevo';
        feedbackElement.className = 'feedback incorrect';
    }
}

// Cargar preguntas desde db.json
fetch("../db.json")
    .then(res => res.json())
    .then(data => {
        const currentLevel = parseInt(localStorage.getItem("LevelTo")) || 1;
        const preguntaData = data.preguntas[currentLevel - 1];


        document.getElementById("pregunta").innerText = preguntaData.pregunta;
        document.getElementById("img").src = preguntaData.imagen;

        // Asigna opciones de respuestas
        document.getElementById("option1").innerText = preguntaData.opciones[0].texto;
        document.getElementById("option2").innerText = preguntaData.opciones[1].texto;
        document.getElementById("option3").innerText = preguntaData.opciones[2].texto;

        // Asigna el valor correcto o incorrecto a cada opción
        document.getElementById("option1").dataset.correct = preguntaData.opciones[0].esCorrecta;
        document.getElementById("option2").dataset.correct = preguntaData.opciones[1].esCorrecta;
        document.getElementById("option3").dataset.correct = preguntaData.opciones[2].esCorrecta;
    })
    .catch(error => {
        console.error("Error al obtener los datos:", error);
    });
