'use strict';

//Selecting Elements
const score1El = document.querySelector('#score--0');
const score2El = document.querySelector('#score--1');

//Current score
const currentScore1 = document.getElementById('current--0');
const currentScore2 = document.getElementById('current--1');

//Buttons
const rollDiceBtn = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const restartBtn = document.querySelector('.btn--new');

//Selecting the Players Section
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

//Dice roll Image
const diceImg = document.querySelector('.dice');

//Starting Condition of Player Score
let scores, playing, currScore, activePlayer;
const init = function () {
  playing = true;
  currScore = 0;
  scores = [0, 0];
  activePlayer = 0;
  diceImg.classList.add('hidden');
  score1El.textContent = 0;
  score2El.textContent = 0;
  currentScore1.textContent = 0;
  currentScore2.textContent = 0;
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currScore = 0;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
};
//Clicking The Roll Dice Button
const rollingDice = function () {
  if (playing) {
    //1)generating a random number
    const diceRollNumber = Math.trunc(Math.random() * 6) + 1;

    //2) Displaying Dice Image
    diceImg.classList.remove('hidden');
    diceImg.src = `dice-${diceRollNumber}.png`; //Manipulating Image Src File

    //3) Switching Player If the dice roll Number is equal to 1
    if (diceRollNumber !== 1) {
      //add dice Number to current score
      currScore += diceRollNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currScore;
    } else {
      // If dice = 1 Switch player
      switchPlayer();
    }
  }
};

const holdDiceValue = function () {
  if (playing) {
    // 1)Add the Score of the Active player's score
    scores[activePlayer] += currScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2)Check for the score is >= 100
    if (scores[activePlayer] >= 100) {
      //finish the game
      playing = false;
      diceImg.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //3)Switch to the next player
      switchPlayer();
    }
  }
};

//Clicking Roll Dice
rollDiceBtn.addEventListener('click', rollingDice);
btnHold.addEventListener('click', holdDiceValue);

restartBtn.addEventListener('click', init);
