document.addEventListener('DOMContentLoaded', function() {
    const car = document.getElementById('car');
    const gameContainer = document.getElementById('game-container');
    const scoreValue = document.getElementById('score-value');

    let score = 0;
    let gameSpeed = 5;
    let obstacleInterval;

    // Add rain effect
    for (let i = 0; i < 50; i++) {
        const rainDrop = document.createElement('div');
        rainDrop.classList.add('rain');
        rainDrop.style.left = Math.random() * 100 + '%';
        rainDrop.style.animationDuration = Math.random() * 2 + 1 + 's';
        gameContainer.appendChild(rainDrop);
    }

    startGame();

    function startGame() {
        score = 0;
        scoreValue.textContent = score;
        car.style.left = '50%';
        gameSpeed = 5;
        obstacleInterval = setInterval(createObstacle, 1500);
        document.addEventListener('keydown', moveCar);
    }

    function moveCar(event) {
        if (event.key === 'ArrowLeft') {
            moveCarLeft();
        } else if (event.key === 'ArrowRight') {
            moveCarRight();
        }
    }

    function moveCarLeft() {
        const currentLeft = parseInt(getComputedStyle(car).left);
        const newLeft = currentLeft - 10;
        if (newLeft >= 0) {
            car.style.left = newLeft + 'px';
        }
    }

    function moveCarRight() {
        const currentLeft = parseInt(getComputedStyle(car).left);
        const newLeft = currentLeft + 10;
        if (newLeft <= gameContainer.offsetWidth - car.offsetWidth) {
            car.style.left = newLeft + 'px';
        }
    }

    function createObstacle() {
        const obstacle = document.createElement('div');
        obstacle.classList.add('obstacle');
        obstacle.style.left = Math.random() * (gameContainer.offsetWidth - 50) + 'px';
        gameContainer.appendChild(obstacle);
        moveObstacle(obstacle);
    }

    function moveObstacle(obstacle) {
        let obstacleIntervalId = setInterval(function() {
            const currentTop = parseInt(getComputedStyle(obstacle).top);
            if (currentTop > gameContainer.offsetHeight) {
                clearInterval(obstacleIntervalId);
                obstacle.remove();
            } else {
                obstacle.style.top = currentTop + 10 + 'px';
                checkCollision(obstacle);
            }
        }, 20);
    }

    function checkCollision(obstacle) {
        const carRect = car.getBoundingClientRect();
        const obstacleRect = obstacle.getBoundingClientRect();

        if (
            carRect.left < obstacleRect.right &&
            carRect.right > obstacleRect.left &&
            carRect.top < obstacleRect.bottom &&
            carRect.bottom > obstacleRect.top
        ) {
            endGame();
        }
    }

    function endGame() {
        clearInterval(obstacleInterval);
        document.removeEventListener('keydown', moveCar);
        alert('¡Choque! Puntaje final: ' + score);
        startGame();
    }

    setInterval(function() {
        score += 1;
        scoreValue.textContent = score;
        if (score % 100 === 0) {
            gameSpeed += 1;
        }
    }, 1000);
});
