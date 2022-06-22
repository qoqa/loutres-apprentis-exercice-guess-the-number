// States for the user guessed number
const guessNumberState = {
  TO_HIGH: 'is too high',
  TO_LOW: 'is too low',
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

  // 🦦 recupère la valeur du champ avec l'id "porposal" dans le HTML
  const proposalInput = 0;

  const guessedNumber = proposalInput.value;
  proposalInput.value = '';

  testProposal(Number(guessedNumber));
}

// test if the proposal is correct, low or high
function testProposal(guessedNumber) {
  if (numberToFind === undefined) {
    return;
  }

  let state = undefined;
  triesTimes += 1;

  if (guessedNumber === numberToFind) {
    state = guessNumberState.CORRECT;
  } else if (guessedNumber > numberToFind) {
    state = guessNumberState.TO_HIGH;
  } else {
    state = guessNumberState.TO_LOW;
  }

  renderResult(guessedNumber, state, triesTimes);
}

// update the UI with the result of the proposal, the state and the number of tries
function renderResult(guessedNumber, state, times) {
  const guessFormState = formWrapper.children['guess-form-state'];
  guessFormState.innerText = `${guessedNumber} ${state}`;
  guessFormState.style.display = 'block';
  guessFormState.classList.value = 'info';

  if (state === guessNumberState.CORRECT) {
    handleGame();
    guessFormState.classList.add('correct');
  }
  if (state === guessNumberState.TO_HIGH) {
    guessFormState.classList.add('to-high');
  }
  if (state === guessNumberState.TO_LOW) {
    guessFormState.classList.add('to-low');
  }

  const tryTimes = formWrapper.children['try-times'];
  tryTimes.innerText = `${times} tries`;
}
