const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

class GameObject {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

const player = new GameObject(canvas.width / 2 - 25, canvas.height - 50, 50, 10, 'white');

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw();
    requestAnimationFrame(update);
    // update関数内に以下を追加
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const alien of aliens) {
        alien.draw();
    }

    for (const bullet of bullets) {
        bullet.y -= 5;
        bullet.draw();

        for (const alien of aliens) {
            if (collisionDetection(bullet, alien)) {
                alien.x = -1000;
                bullet.y = -1000;
                score += 10;
            }
        }
    }

    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);

    player.draw();
    requestAnimationFrame(update);
}

}

document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowLeft' && player.x > 0) {
        player.x -= 10;
    } else if (event.code === 'ArrowRight' && player.x < canvas.width - player.width) {
        player.x += 10;
    }
});

update();


// 以下を追加
const aliens = [];
const bullets = [];
const alienRows = 4;
const alienCols = 10;
const alienSpacing = 50;
const alienWidth = 30;
const alienHeight = 20;
let score = 0;

for (let i = 0; i < alienRows; i++) {
    for (let j = 0; j < alienCols; j++) {
        aliens.push(new GameObject(j * alienSpacing + 100, i * alienSpacing + 50, alienWidth, alienHeight, 'green'));
    }
}

function shoot() {
    bullets.push(new GameObject(player.x + player.width / 2 - 2, player.y, 4, 10, 'white'));
}

function collisionDetection(a, b) {
    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y;
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        shoot();
    }
});

let alienDirection = 1;
let alienSpeed = 0.5;
let alienFireRate = 2000; // エイリアンが弾を発射する間隔（ミリ秒）
let lastAlienShot = 0;
let playerLives = 3;
let gameRunning = true;
let currentLevel = 1;

function gameOver() {
    gameRunning = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '50px Arial';
    ctx.fillText('GAME OVER', canvas.width / 2 - 125, canvas.height / 2);
}

function nextLevel() {
    currentLevel += 1;
    alienSpeed += 0.2;
    alienFireRate -= 100;

    aliens.length = 0;

    for (let i = 0; i < alienRows; i++) {
        for (let j = 0; j < alienCols; j++) {
            aliens.push(new GameObject(j * alienSpacing + 100, i * alienSpacing + 50, alienWidth, alienHeight, 'green'));
        }
    }
}
