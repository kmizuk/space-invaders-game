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
// タッチ開始時のイベントリスナー
document.addEventListener('touchstart', function (event) {
    // タッチ位置に応じてプレイヤーの操作を行う
    const touchX = event.touches[0].clientX;
    const touchY = event.touches[0].clientY;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
  
    if (touchY < screenHeight / 2) {
      // 画面の上半分がタッチされた場合、弾を発射
      shootBullet();
    } else {
      if (touchX < screenWidth / 2) {
        // 画面の下半分の左側がタッチされた場合、プレイヤーを左に移動
        moveLeft = true;
      } else {
        // 画面の下半分の右側がタッチされた場合、プレイヤーを右に移動
        moveRight = true;
      }
    }
  });
  
  // タッチ終了時のイベントリスナー
  document.addEventListener('touchend', function (event) {
    // タッチ終了時の処理（例: プレイヤーの移動を停止）
    moveLeft = false;
    moveRight = false;
  });
  
  // 弾を発射する関数
  function shootBullet() {
    // ここに弾を発射するためのコードを記述
    // 弾のクラス定義
class Bullet {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.radius = 5;
      this.speed = 5;
    }
  
    // 弾の描画
    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.closePath();
    }
  
    // 弾の移動
    move() {
      this.y -= this.speed;
    }
  }
  
  // 弾のインスタンスを格納する配列
  let bullets = [];
  
  // 弾を発射する関数
  function shootBullet() {
    // 弾のインスタンスを生成し、配列に追加
    const bullet = new Bullet(player.x, player.y);
    bullets.push(bullet);
  }
  
  // ゲームループ内で弾を描画・移動
  function gameLoop() {
    // ...省略...
  
    // 弾の描画と移動
    for (let i = 0; i < bullets.length; i++) {
      bullets[i].draw(ctx);
      bullets[i].move();
    }
  
    // ...省略...
  }
  
  
  }
  