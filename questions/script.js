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
        checkAnswer(this.dataset.correct); // Usa el atributo data-correct
        console.log(this);
    });
});

function checkAnswer(selectedOption) {
    const feedbackElement = document.getElementById('feedback');
    
    // Verifica si el nivel ya ha sido incrementado
    let LevelNum = (localStorage.getItem("nivelMax"))
    let currentLevel = parseInt(localStorage.getItem("nivelMax"));
    const levelIncremented = localStorage.getItem("levelIncremented") === 'true';


    if (selectedOption === 'true') {
        feedbackElement.textContent = '¡Correcto!';
        feedbackElement.className = 'feedback correct';

        if (LevelNum==currentLevel){
            currentLevel++;
            localStorage.setItem("nivelMax", currentLevel);
            console.log(`nivelMax: ${currentLevel}`);
        }
    }
    else {
        feedbackElement.textContent = 'Incorrecto. Intentalo de nuevo'; // Ajusta el mensaje según corresponda
        feedbackElement.className = 'feedback incorrect';
    }      
}


// Código para el JSON (si es necesario)
fetch("../db.json")
    .then(res => res.json())
    .then(data => {
        console.log(data);
        document.getElementById("pregunta").innerText = data.preguntas[localStorage.getItem('LevelTo') - 1].pregunta;
        document.getElementById("img").src = data.preguntas[localStorage.getItem('LevelTo') - 1].imagen;
        document.getElementById("option1").innerText = data.preguntas[localStorage.getItem('LevelTo') - 1].opciones[0].texto;
        document.getElementById("option2").innerText = data.preguntas[localStorage.getItem('LevelTo') - 1].opciones[1].texto;
        document.getElementById("option3").innerText = data.preguntas[localStorage.getItem('LevelTo') - 1].opciones[2].texto;
        document.getElementById("option1").dataset.correct = data.preguntas[localStorage.getItem('LevelTo') - 1].opciones[0].esCorrecta;
        document.getElementById("option2").dataset.correct = data.preguntas[localStorage.getItem('LevelTo') - 1].opciones[1].esCorrecta;
        document.getElementById("option3").dataset.correct = data.preguntas[localStorage.getItem('LevelTo') - 1].opciones[2].esCorrecta;
        
    })
    .catch(error => {
        console.error("Error al obtener los datos:", error);
    });

// Inicializa el localStorage si es la primera vez que se carga
if (localStorage.getItem("nivelMax") == null) {
    localStorage.setItem("nivelMax", "0");
    localStorage.setItem("levelIncremented", 'false'); // Asegúrate de que se pueda incrementar
}

console.log(localStorage.getItem("nivelMax"));
console.log(localStorage.getItem("nivelMax"))
