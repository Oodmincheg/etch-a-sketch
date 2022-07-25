//create canvas with settings
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');

const MOVE_LENGTH = 10;
const LINE_WIDTH = 20;

const ARROW_KEYS = {
  up: 'ArrowUp',
  down: 'ArrowDown',
  left: 'ArrowLeft',
  right: 'ArrowRight',
};

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = LINE_WIDTH;

const { width, height } = canvas;

function getRandom(num) {
  return Math.floor(Math.random() * num);
}

let x;
let y;

function initGame() {
  x = getRandom(width);
  y = getRandom(height);

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x, y);
  ctx.stroke();
}

initGame();
//function draw
function draw({ key }) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  switch (key) {
    case ARROW_KEYS.up:
      y -= MOVE_LENGTH;
      break;
    case ARROW_KEYS.down:
      y += MOVE_LENGTH;
      break;
    case ARROW_KEYS.left:
      x -= MOVE_LENGTH;
      break;
    case ARROW_KEYS.right:
      x += MOVE_LENGTH;
      break;
    default:
      throw new Error('what the key?');
  }
  ctx.lineTo(x, y);
  ctx.stroke();
}
//listener for arrow keys
function handleKeyDown(event) {
  if (event.key.includes('Arrow')) {
    event.preventDefault();
    draw({ key: event.key });
  }
}
document.body.addEventListener('keydown', handleKeyDown);

//function clear for shake button
function clear() {
  ctx.clearRect(0, 0, width, height);
  canvas.classList.add('shake');
  canvas.addEventListener(
    'animationend',
    () => {
      canvas.classList.remove('shake');
    },
    { once: true },
  );
  initGame();
}

const clearButton = document.querySelector('.shake');
clearButton.addEventListener('click', clear);
