import pokemonGameService from "../../pokemonGameService.js";

const reportCardDiv = document.querySelector("#report-card-container");
const correctCountSpan = document.querySelector("#correct-pokemon-count-span");
const wrongCountSpan = document.querySelector("#wrong-pokemon-count-span");

export default function(game) {
  if (game.remainingTimeInSeconds === 0) {
    correctCountSpan.textContent = pokemonGameService.getCorrectPokemonCount(game).toString();
    wrongCountSpan.textContent = pokemonGameService.getWrongPokemonCount(game).toString();
    reportCardDiv.style.display = "block";
  }
  else {
    reportCardDiv.style.display = "none";
  }
};