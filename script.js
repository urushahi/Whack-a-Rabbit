const cursor = document.querySelector('.cursor');
const holes = [...document.querySelectorAll('.hole')];
const scoreEl = document.querySelector('.score span');
const finalScoreEl = document.querySelector('.gameover .score span');
const gameOver = document.querySelector('.gameover');
const btnStart = document.querySelector('#btnStart');
let score = 0;

const sound = new Audio('./assets/images/assets_smash.mp3');
const gameoversound = new Audio('./assets/images/gameover.wav');

const gameLimit = 10;
let countMouseClick = 0;

const startGame = function run() {
  const i = Math.floor(Math.random() * holes.length);
  const hole = holes[i];
  let timer = null;

  const img = document.createElement('img');
  img.classList.add('mole');
  img.src = './assets/images/Rabbit.png';
  btnStart.classList.add('d-none');
  img.addEventListener('click', () => {
    score += 10;
    sound.play();
    scoreEl.textContent = score;
    img.src = './assets/images/Rabbit-whacked.png';
    clearTimeout(timer);
    setTimeout(() => {
      hole.removeChild(img);
      run();
    }, 500);
  });

  hole.appendChild(img);

  timer = setTimeout(() => {
    hole.removeChild(img);
    run();
  }, 1200);

  if (countMouseClick >= gameLimit) {
    gameover();
    clearTimeout(timer);
    hole.removeChild(img);
  }
};

window.addEventListener('mousemove', (e) => {
  cursor.style.top = e.pageY + 'px';
  cursor.style.left = e.pageX + 'px';
});

window.addEventListener('mousedown', (e) => {
  cursor.classList.add('active');
  if (
    e.target.className !== 'mole' &&
    (e.target.className === 'board' || e.target.className === 'hole')
  ) {
    countMouseClick++;
  }
});

window.addEventListener('mouseup', (e) => {
  cursor.classList.remove('active');
});

function gameover() {
  finalScoreEl.textContent = score;
  gameoversound.play();
  gameOver.classList.add('show');
}

function restart() {
  gameOver.classList.remove('show');
  cursor.style.display = 'block';
  score = 0;
  countMouseClick = 0;
  startGame();
}
