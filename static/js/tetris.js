const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const COLS = 10, ROWS = 10, BLOCK = 30;
// Color palette for shape IDs 1–7
const COLORS = [null, 'cyan', 'yellow', 'lime', 'red', 'blue', 'orange', 'magenta'];

let state;
let gameInterval;
let speed = 500; // Initial falling speed

function fetchState() {
  fetch('/api/state')
    .then(res => res.json())
    .then(data => {
      state = data;
      draw();
      updateInfo();
    });
}

function adjustSpeed() {
  const newSpeed = 500 - Math.floor(state.score / 10) * 50;
  if (newSpeed !== speed) {
    speed = Math.max(newSpeed, 100);
    clearInterval(gameInterval);
    gameInterval = setInterval(tick, speed);
  }
}

function tick() {
  fetch('/api/tick', { method: 'POST' })
    .then(res => res.json())
    .then(data => {
      state = data;
      updateInfo();
      draw();
      adjustSpeed();
      if (state.status) endGame(state.status);
    });
}

function move(dir) {
  fetch('/api/move', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ direction: dir })
  })
  .then(res => res.json())
  .then(data => {
    state = data;
    updateInfo();
    draw();
  });
}

// Arrow‐key controls
document.addEventListener('keydown', e => {
  if (e.keyCode === 37) move('left');
  if (e.keyCode === 39) move('right');
  if (e.keyCode === 40) tick(); //To fall faster, it is actually the down arrow
  if (e.keyCode === 38) move('rotate');
});

const startBtn = document.getElementById('startBtn');
startBtn.addEventListener('click', function() {
  // 1) Play music (user gesture)
  const bg = document.getElementById('backgroundMusic');
  bg.play().catch(console.error);

  // 2) Hide the button
  this.style.display = 'none';

  // 3) Fetch initial state & draw first frame
  fetchState();

  // 4) Start the tick loop
  gameInterval = setInterval(tick, speed);
});

function updateInfo() {
  document.getElementById('score').innerText = state.score;
  document.getElementById('lines').innerText = state.lines;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw border
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.strokeRect(0, 0, COLS * BLOCK, ROWS * BLOCK);

  // Draw each cell
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const val = state.grid[y][x];
      if (val) {
        ctx.fillStyle = COLORS[val] || 'gray';
        ctx.fillRect(x*BLOCK, y*BLOCK, BLOCK, BLOCK);
        ctx.strokeStyle = '#222';
        ctx.strokeRect(x*BLOCK, y*BLOCK, BLOCK, BLOCK);
      }
    }
  }
}

function endGame(status) {
  clearInterval(gameInterval);
  const msg = status === 'win' ? 'You Win!' : 'Game Over';
  const overlay = document.getElementById('message');
  overlay.innerText = msg;
  overlay.style.display = 'flex';
}