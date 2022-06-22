// States for the user guessed number
const GUESS_NUMBER_STATE = {
  TOO_HIGH: 'is too high',
  TOO_LOW: 'is too low',
  CORRECT: 'is CORRECT !',
};

// number of tries before the user find the number
let triesTimes = 0;
// generated number by the computer
let numberToFind = undefined;

// get needed elements
const guessForm = document.querySelector('#guess-form');
const gameButton = document.querySelector('#game-button');
const formWrapper = document.querySelector('#form-wrapper');

// add event listeners
guessForm.addEventListener('submit', onSubmit);
gameButton.addEventListener('click', handleGame);

// this function will be called when the user click on the button when it's start or stop
// it's why we check the numbertoFind to know if we need to start or stop the game
function handleGame() {
  if (numberToFind !== undefined) {
    stopGame();
    return;
  }
  startGame();
}

function stopGame() {
  handleField(false);
  numberToFind = undefined;
}

function startGame() {
  numberToFind = Math.floor(Math.random() * 100) + 1;
  triesTimes = 0;

  handleField(true);
}

function handleField(start) {
  gameButton.innerText = start ? 'Start' : 'Stop';
  guessForm[0].disabled = !start;
  guessForm[1].disabled = !start;
  formWrapper.children['guess-form-info'].style.display = start ? 'none' : 'block';
}

// on submit button clicked
function onSubmit(event) {
  event.preventDefault();

  // 🦦 recupère le champ avec l'id "porposal" dans le HTML
  const proposalInput = undefined; // 💣 supprime undefined et remplace par la bonne valeur

  // 🦦 recupère la valeur du champ proposalInput
  const guessedNumber = undefined; // 💣 supprime undefined et remplace par la bonne valeur

  // 🦦 change la valeur de proposalInput par "" <- text vide
  // 🐽 proposalInput.

  testProposal(Number(guessedNumber));
}

// test if the proposal is correct, low or high
function testProposal(guessedNumber) {
  // if the game is not started, we don't do anything
  if (numberToFind === undefined) {
    return;
  }

  // variable qui vas stocké le state de la ligne 1
  let state = undefined;
  // 🦦 incrémente le nombre de tentative (triesTimes) de 1
  // 🐽 triesTimes

  // 🦦 vérifie si la valeur de guessedNumber est plus grande que la valeur de numberToFind
  // puis si c'est le cas, on assigne le state à TO_HIGH
  // 🦦 fait la même chose si c'est trop petit avec le state TO_LOW
  if (guessedNumber === numberToFind) {
    state = GUESS_NUMBER_STATE.CORRECT;
  }

  renderResult(guessedNumber, state, triesTimes);
}

// update the UI with the result of the proposal, the state and the number of tries
function renderResult(guessedNumber, state, tries) {
  const guessFormState = formWrapper.children['guess-form-state'];
  guessFormState.innerText = `${guessedNumber} ${state}`;
  guessFormState.style.display = 'block';
  guessFormState.classList.value = 'info';

  // 🦦 en fonction du state, ajoute la class correspondante à la div guessFormState
  // state = CORRECT -> 'correct'
  // state = TOO_HIGH -> 'too-high'
  // state = TOO_LOW -> 'too-low'

  if (state === GUESS_NUMBER_STATE.CORRECT) {
    handleGame();
    guessFormState.classList.add('correct');
  }

  const tryTimes = formWrapper.children['try-times'];
  // 🦦 affiche le nombre de tentative (tries) dans l'element try-times
  // 🐽 innerText
}
