'use strict';
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let computerGuess = 0;
let highScore = 0;
let computerWin = 0;
let youWin = 0;

const winColorChanger = function () {
  document.querySelector('body').style.backgroundColor = '#60b347';
};

const loseColorChanger = function () {
  document.querySelector('body').style.backgroundColor = '#222';
};

const textContentChanger = function (name, text) {
  document.querySelector(name).textContent = text;
};

const resetGame = function () {
  score = 20;
  textContentChanger('.message', 'Start guessing...');
  textContentChanger('.score', score);
  textContentChanger('.number', '?');
  document.querySelector('.guess').value = '';
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  loseColorChanger();
  computerGuess = 0;
  document.querySelector('.ComputerGuess').value = '';
  document.querySelector('.check').disabled = false;
  document.querySelector('.guess').disabled = false;
};

document.querySelector('.again').addEventListener('click', resetGame);

document.querySelector('.check').addEventListener('click', function () {
  computerGuess = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('.ComputerGuess').value = computerGuess;
  let guess = Number(document.querySelector('.guess').value);

  if (score > 1) {
    if (!guess) {
      textContentChanger('.message', '⛔ No number!');
      document.querySelector('.ComputerGuess').value = 0;
    } else if (guess === secretNumber) {
      textContentChanger(
        '.message',
        computerGuess === secretNumber ? '🎉 Both of you win!' : '🎉 You win!'
      );
      winColorChanger();
      textContentChanger('.number', secretNumber);
      youWin++;
      document.querySelector('.check').disabled = true;
      document.querySelector('.guess').disabled = true;
      if (highScore < score) {
        highScore = score;
        textContentChanger('.highscore', highScore);
      }
    } else if (guess !== secretNumber) {
      textContentChanger(
        '.message',
        guess > secretNumber
          ? computerGuess === secretNumber
            ? '📈 Too high 🎉 Computer wins!'
            : '📈 Too high'
          : computerGuess === secretNumber
          ? '📉 Too low 🎉 Computer wins!'
          : '📉 Too low'
      );

      if (computerGuess === secretNumber) {
        winColorChanger();
        computerWin++;
        document.querySelector('.check').disabled = true;
        document.querySelector('.guess').disabled = true;
      } else {
        loseColorChanger();
      }
      score--;
      textContentChanger('.score', score);
    }
  } else {
    textContentChanger('.message', '📈 Too high');
    textContentChanger('.number', secretNumber);
  }
  document.querySelector('.result').textContent = `${youWin} : ${computerWin}`;
});
