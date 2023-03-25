import pokemonGameService from "./pokemonGameService.js";
import displayHideService from "./ui/displayHideService.js";
import userInputService from "./ui/userInputService.js";

import pokemonImageComponent from "./ui/components/pokemonImageComponent.js";
import pokemonNamesComponent from "./ui/components/pokemonNamesComponent.js";
import timerComponent from "./ui/components/timerComponent.js";
import reportCardComponent from "./ui/components/reportCardComponent.js";

// utility method
function byId(id) {
  return document.querySelector(`#${id}`);
}

// state
let game = null;
let interval;

function startInterval() {
  interval = setInterval(() => {
    timerComponent(game);
    if (game.remainingTimeInSeconds === 0) {
      displayHideService.reset();
      userInputService.endGame();
      clearInterval(game.interval);
      pokemonImageComponent(game);
      pokemonNamesComponent(game);
      reportCardComponent(game);
      clearInterval(interval);
      interval = null;
    }
  }, 100);
}

function startNewGame() {
  game = pokemonGameService.newPokemonGame();
  userInputService.startGame();

  reportCardComponent(game);
  pokemonImageComponent(game);
  pokemonNamesComponent(game);
  timerComponent(game);
}

// add event listeners
byId('new-game-button').addEventListener('click', startNewGame);
byId('user-input-text').addEventListener('input', event => {
  if (interval == null) {
    startInterval();
  }

  if (event.data === " ") {
    pokemonGameService.incrementCurrentIndex(game);
    displayHideService.updateDisplayNoneCounter(game);
    userInputService.getUserInputTextArea().value = '';
  }
  else {
    pokemonGameService.setCurrentUserInput(game, event.target.value);
  }

  pokemonImageComponent(game);
  pokemonNamesComponent(game);
});

// start new game
startNewGame();
