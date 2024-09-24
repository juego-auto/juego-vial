const ball = document.getElementById('ball');
const levels = document.querySelectorAll('.level');
const playWindow = document.getElementById('play-window');
const lockedWindow = document.getElementById('locked-window');
const playButton = document.getElementById('play-button');
const levelNumber = document.getElementById('level-number');
const lockedMessage = document.getElementById('locked-message');

let posX = window.innerWidth / 2 - ball.offsetWidth / 2;
let posY = window.innerHeight / 2 - ball.offsetHeight / 2;
let currentLevel = parseInt(localStorage.getItem("nivel actual")) || 0; // Nivel que está desbloqueado

window.onload = function() {
    ball.style.transform = `translate(${posX}px, ${posY}px)`;
    unlockLevels(); // Desbloquear niveles según currentLevel
};

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp': posY -= 30; break;
        case 'ArrowDown': posY += 30; break;
        case 'ArrowLeft': posX -= 30; break;
        case 'ArrowRight': posX += 30; break;
    }

    posX = Math.max(0, Math.min(window.innerWidth - ball.offsetWidth, posX));
    posY = Math.max(0, Math.min(window.innerHeight - ball.offsetHeight, posY));

    ball.style.transform = `translate(${posX}px, ${posY}px)`;
    checkCollision();
});

function checkCollision() {
    let isCollision = false;

    levels.forEach(level => {
        const rect1 = ball.getBoundingClientRect();
        const rect2 = level.getBoundingClientRect();
        const levelNum = parseInt(level.getAttribute('data-level'));

        if (rect1.left < rect2.right && rect1.right > rect2.left && rect1.top < rect2.bottom && rect1.bottom > rect2.top) {
            // Permitir acceso a nivel 1 y a los niveles hasta currentLevel
            if (levelNum <= currentLevel + 1) {
                level.style.transform = 'scale(1.5)';
                levelNumber.textContent = level.textContent;
                playWindow.style.display = 'block';
                lockedWindow.style.display = 'none';
                isCollision = true;
            } else {
                level.style.transform = 'scale(1.5)';
                lockedMessage.textContent = `Debes jugar el ${levelNum - 1} para desbloquear el nivel ${levelNum}.`;
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

function unlockLevels() {
    levels.forEach(level => {
        const levelNum = parseInt(level.getAttribute('data-level'));
        if (levelNum <= currentLevel) {
            level.classList.remove('locked');
        } else {
            level.classList.add('locked');
        }
    });
}

// Manejador del botón "Jugar"
playButton.addEventListener('click', () => {
    // LevelNum es el nivel en donde el cursor esta apoyado
    const levelNum = (levelNumber.textContent);
    console.log(levelNum)
    if (levelNum <= currentLevel + 1 ) {// Permitir jugar el siguiente nivel
         localStorage.setItem("LevelTo", levelNum);
        window.location.href = `questions/index.html`;
    } else {
        alert('Este nivel está bloqueado.');
    }
});

// Inicializa el almacenamiento si es necesario
if (localStorage.getItem("nivel actual") == null) {
    localStorage.setItem("nivel actual", "0");
}

console.log(localStorage.getItem("nivel actual"));


