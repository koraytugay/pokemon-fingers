const userInputContainer = document.querySelector("#user-input-container");
const userInputTextArea = document.querySelector("#user-input-text");

function startGame() {
  userInputContainer.classList.remove("displayNone");
  userInputTextArea.value = '';
  userInputTextArea.focus();
}

function endGame() {
  userInputContainer.classList.add("displayNone");
}

function getUserInputTextArea() {
  return userInputTextArea;
}

export default {
  startGame, endGame, getUserInputTextArea
}
