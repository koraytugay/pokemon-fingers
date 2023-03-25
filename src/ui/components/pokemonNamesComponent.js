import pokemonGameService from "../../pokemonGameService.js"
import displayHideService from "../displayHideService.js";

export default function(game) {
  const words = document.querySelector("#pokemon-names-div");

  if (game.remainingTimeInSeconds === 0) {
    words.style.display = "none";
  }
  else {
    words.style.display = "block";
  }

  words.innerHTML = '';
  for (let i = 0; i < game.target.length; i++) {
    // current word gets special treatment
    if (i === game.currentIndex) {
      const wordSpan = document.createElement('span');
      wordSpan.classList.add('current-word');
      wordSpan.classList.add("pokemon-name");

      const letters = pokemonGameService.getCurrentPokemonName(game).split('');
      for (let j = 0; j < letters.length; j++) {
        const letterSpan = document.createElement('span');
        letterSpan.classList.add('current-word-letter');
        letterSpan.innerText = letters[j];

        if (pokemonGameService.getCurrentInput(game)) {
          if (pokemonGameService.getCurrentInput(game)[j]) {
            if (pokemonGameService.getCurrentInput(game)[j] === letters[j]) {
              letterSpan.classList.add("correct");
            }
            else {
              letterSpan.classList.add("wrong");
            }
          }
        }

        wordSpan.appendChild(letterSpan);
      }

      words.appendChild(wordSpan);
      continue;
    }

    const wordSpan = document.createElement('span');
    wordSpan.innerText = pokemonGameService.getPokemonNameAtIndex(game, i);
    wordSpan.classList.add("pokemon-name");

    if (pokemonGameService.isInputProvidedForIndex(game, i)) {
      if (i === game.currentIndex) {
        if (!pokemonGameService.isInputSoFarCorrect(game, i)) {
          wordSpan.classList.add('wrong');
        }
      }
      else {
        if (pokemonGameService.isInputWrongAtIndex(game, i)) {
          wordSpan.classList.add('wrong');
        }
        if (pokemonGameService.isInputCorrectAtIndex(game, i)) {
          wordSpan.classList.add('correct');
        }
      }
    }
    words.appendChild(wordSpan);
  }

  for (let i = 1; i <= displayHideService.getCounter(); i++) {
    document.querySelector(`#pokemon-names-div > span:nth-child(${i})`).style.display = 'none';
  }
}
