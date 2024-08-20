const ball = document.getElementById('ball');
const levels = document.querySelectorAll('.level');
const playWindow = document.getElementById('play-window');
const lockedWindow = document.getElementById('locked-window');
const playButton = document.getElementById('play-button');
const closeLockedButton = document.getElementById('close-locked-button');
const levelNumber = document.getElementById('level-number');
const lockedMessage = document.getElementById('locked-message');

let posX = window.innerWidth / 2 - ball.offsetWidth / 2;
let posY = window.innerHeight / 2 - ball.offsetHeight / 2;
let currentLevel = 1; // Nivel que está desbloqueado
let activeLevel = null; // Nivel actualmente colisionado

// Colocar el "ball" en el centro de la pantalla al cargar la página
window.onload = function() {
    ball.style.transform = `translate(${posX}px, ${posY}px)`;
};

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            posY -= 30;
            break;
        case 'ArrowDown':
            posY += 30;
            break;
        case 'ArrowLeft':
            posX -= 30;
            break;
        case 'ArrowRight':
            posX += 30;
            break;
    }

    // Limitar el movimiento a la pantalla
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

        if (rect1.left < rect2.right &&
            rect1.right > rect2.left &&
            rect1.top < rect2.bottom &&
            rect1.bottom > rect2.top) {

            if (levelNum <= currentLevel) {
                // Si el nivel está desbloqueado, agrandar y mostrar ventana de "Jugar"
                level.style.transform = 'scale(1.5)';
                levelNumber.textContent = level.textContent;
                playWindow.style.display = 'block';
                lockedWindow.style.display = 'none'; // Ocultar la ventana bloqueada si estaba abierta
                isCollision = true;
                activeLevel = level; // Guardar el nivel activo
            } else {
                // Si el nivel está bloqueado, mostrar ventana de advertencia
                level.style.transform = 'scale(1.5)';
                lockedMessage.textContent = `Debes jugar el nivel ${levelNum - 1} para desbloquear el nivel ${levelNum}.`;
                lockedWindow.style.display = 'block';
                isCollision = true;
                activeLevel = level; // Guardar el nivel activo
            }
        } else {
            level.style.transform = 'scale(1.0)';
        }
    });

    // Ocultar ventanas si no hay colisión con ningún nivel
    if (!isCollision) {
        playWindow.style.display = 'none';
        lockedWindow.style.display = 'none';
        activeLevel = null; // Reiniciar el nivel activo
    }
}

playButton.addEventListener('click', () => {
    const levelNum = parseInt(levelNumber.textContent);

    if (levelNum <= currentLevel) {
        // Aquí puedes redirigir a la página correspondiente al nivel
        window.location.href = `juego-vial-main/index.html`;

        if (levelNum === currentLevel) {
            // Desbloquear el siguiente nivel
            currentLevel++;
            const nextLevel = document.querySelector(`.level[data-level="${currentLevel}"]`);
            if (nextLevel) {
                nextLevel.classList.remove('locked');
            }
        }
    } else {
        alert('Este nivel está bloqueado.');
    }
});
