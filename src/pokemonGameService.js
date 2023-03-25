import pokemons from "./resources/pokemons.js";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function newPokemonGame() {
  return {
    currentIndex: 0,
    target: shuffleArray(pokemons),
    inputs: [],
    remainingTimeInSeconds: 15,
    interval: null
  }
}

function startTimer(game) {
  game.interval = setInterval(() => {
    if (game.remainingTimeInSeconds > 0) {
      game.remainingTimeInSeconds--;
    }
  }, 1000);
}

function setCurrentUserInput(game, input) {
  if (game.interval == null) {
    startTimer(game);
  }
  game.inputs[game.currentIndex] = input;
}

function incrementCurrentIndex(game) {
  game.currentIndex++;
}

function isInputProvidedForIndex(game, ix) {
  return !!game.inputs[ix];
}

function isInputCorrectAtIndex(game, ix) {
  if (game.inputs[ix].length !== game.target[ix].name.length) {
    return false;
  }

  for (let i = 0; i < game.inputs[ix].length; i++) {
    if (game.inputs[ix][i] !== game.target[ix].name[i]) {
      return false;
    }
  }

  return true;
}

function getCurrentInput(game) {
  return game.inputs[game.currentIndex];
}

function isInputSoFarCorrect(game) {
  const currentValue = game.target[game.currentIndex];
  const userInput = game.inputs[game.currentIndex];

  for (let i = 0; i < userInput.length; i++) {
    if (userInput[i] !== currentValue.name[i]) {
      return false;
    }
  }

  return true;
}

function isInputWrongAtIndex(game, ix) {
  return game.target[ix].name !== game.inputs[ix];
}

function getCorrectPokemonCount(game) {
  let correctPokemonNameCount = 0;

  for (let i = 0; i < game.currentIndex; i++) {
    if (game.inputs[i] === game.target[i].name) {
      correctPokemonNameCount++;
    }
  }

  return correctPokemonNameCount;
}

function getWrongPokemonCount(game) {
  let wrongPokemonCount = 0;

  for (let i = 0; i < game.currentIndex; i++) {
    if (game.inputs[i] !== game.target[i].name) {
      wrongPokemonCount++;
    }
  }

  return wrongPokemonCount;
}

function getCurrentPokemonName(game) {
  return game.target[game.currentIndex].name;
}

function getPokemonNameAtIndex(game, idx) {
  return game.target[idx].name;
}

function getCurrentPokemonImageId(game) {
  return game.target[game.currentIndex].id;
}

function getNextPokemonImageId(game) {
  return game.target[game.currentIndex + 1].id;
}

// This actually exports an object
// if it was exporting in the form of
// export {newFastFingersGame, getCurrentWord..}
// then it would have looked like it was exporting
// an object where in reality it is just exporting
// a list of separate values.
// The difference is between `export` and `export default`
export default {
  newPokemonGame,
  setCurrentUserInput,
  incrementCurrentIndex,
  isInputProvidedForIndex,
  isInputCorrectAtIndex,
  isInputSoFarCorrect,
  isInputWrongAtIndex,
  getCorrectPokemonCount,
  getWrongPokemonCount,
  getCurrentPokemonName,
  getPokemonNameAtIndex,
  getCurrentPokemonImageId,
  getNextPokemonImageId,
  getCurrentInput,
}