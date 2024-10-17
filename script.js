const ball = document.getElementById('ball');
const levels = document.querySelectorAll('.level');
const playWindow = document.getElementById('play-window');
const lockedWindow = document.getElementById('locked-window');
const playButton = document.getElementById('play-button');
const levelNumber = document.getElementById('level-number');
const lockedMessage = document.getElementById('locked-message');

let posX = window.innerWidth / 2 - ball.offsetWidth / 2;
let posY = window.innerHeight / 2 - ball.offsetHeight / 2;
let nivelMax =(localStorage.getItem("nivelMax")) || 0; // Nivel que está desbloqueado

// esto es para que el cursos se posicione en el centro de la pantalla
window.onload = function () {
    ball.style.transform = `translate(${posX}px, ${posY}px)`;
    unlockLevels(); // Desbloquear niveles según nivel maximo
};

// permite que el usuario se pueda mover con los botones WASD y las flechas del teclado
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp': posY -= 40; break;
        case 'ArrowDown': posY += 40; break;
        case 'ArrowLeft': posX -= 40; break;
        case 'ArrowRight': posX += 40; break;
        case 'w': posY -= 40; break;
        case 's': posY += 40; break;
        case 'a': posX -= 40; break;
        case 'd': posX += 40; break;
    }

    posX = Math.max(0, Math.min(window.innerWidth - ball.offsetWidth, posX));
    posY = Math.max(0, Math.min(window.innerHeight - ball.offsetHeight, posY));

    ball.style.transform = `translate(${posX}px, ${posY}px)`;
    checkCollision();
});

// los valores de levelTo y levelMax se almacenan
let levelMax = parseInt(localStorage.getItem("levelMax")) || 0;  // Nivel más alto alcanzado
let LevelTo = parseInt(localStorage.getItem("LevelTo")) || 1;  // Próximo nivel a jugar


function checkCollision() {
    let isCollision = false;

    levels.forEach(level => {
        const rect1 = ball.getBoundingClientRect();
        const rect2 = level.getBoundingClientRect();
        const levelNum = parseInt(level.getAttribute('data-level'));

        if (rect1.left < rect2.right && rect1.right > rect2.left && rect1.top < rect2.bottom && rect1.bottom > rect2.top) {
            if (levelNum <= LevelTo) {
                level.style.transform = 'scale(1.5)';
                levelNumber.textContent = level.textContent;
                playWindow.style.display = 'block';
                lockedWindow.style.display = 'none';
                isCollision = true;
            } else if (levelNum > LevelTo) {
                level.style.transform = 'scale(1.5)';
                lockedMessage.textContent = `Debes jugar el nivel ${LevelTo} antes de desbloquear este nivel.`;
                lockedWindow.style.display = 'block';
                isCollision = true;
            }
        } else {
            level.style.transform = 'scale(1.0)';
        }
    });

    if (!isCollision) {
        playWindow.style.display = 'none';
        lockedWindow.style.display = 'none';
    }
}


// esto desbloquea hasta el nivel maximo 
function unlockLevels() {
    levels.forEach(level => {
        const levelNum = parseInt(level.getAttribute('data-level'));
        if (levelNum <= levelMax) {
            level.classList.remove('locked');
        } else {
            level.classList.add('locked');
        }
    });
}


let completedLevels = [];

// Función para cargar los niveles completados desde 'db.json'
async function loadCompletedLevels() {
    try {
        const response = await fetch('db.json'); // Ruta del archivo JSON
        const data = await response.json();
        completedLevels = data.completedLevels || [];
        console.log("Niveles completados cargados:", completedLevels);
    } catch (error) {
        console.error('Error al cargar los niveles completados:', error);
    }
}

// Llama a la función para cargar los niveles al inicio
loadCompletedLevels();

// Manejador del botón "Jugar"
playButton.addEventListener('click', () => {
    const levelNum = parseInt(levelNumber.textContent);

    // Verifica si el nivel ya ha sido completado
    if (levelNum === LevelTo && !completedLevels.includes(levelNum)) {
        // Si necesitas guardar el progreso localmente:
        localStorage.setItem("completedLevels", JSON.stringify(completedLevels));

        // Incrementa LevelTo para jugar el siguiente nivel
        
        localStorage.setItem("LevelTo", LevelTo);

        // Redirigir a la página de preguntas del nivel
        window.location.href = 'questions/index.html';
    } else (completedLevels.includes(levelNum)); {
        alert('Ya has completado este nivel.');
    }
});



// se agrega el div del final del juego
const endContainerElement = document.getElementById('endContainer');

if(levelMax===10){
 endContainerElement.className = 'endContainer true';
}

else {
    
}




