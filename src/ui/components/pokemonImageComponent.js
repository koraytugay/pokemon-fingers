import pokemonGameService from "../../pokemonGameService.js"

function byId(id) {
  return document.querySelector(`#${id}`);
}

const pokemonImageEven = byId("pokemon-image-even");
const pokemonImageOdd = byId("pokemon-image-odd");
const imageBaseurl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/`;

export default function(game) {
  if (game.remainingTimeInSeconds === 0) {
    pokemonImageEven.style.display = "none";
    pokemonImageOdd.style.display = "none";
    return;
  }

  const pokemonImageContainer = byId("pokemon-image-container");
  const currentPokemonImageId = pokemonGameService.getCurrentPokemonImageId(game);

  if (pokemonImageContainer.getAttribute('pokemon-image-id') !== currentPokemonImageId.toString()) {
    pokemonImageContainer.setAttribute('pokemon-image-id', currentPokemonImageId.toString());

    const nextPokemonImageId = pokemonGameService.getNextPokemonImageId(game);
    const isCurrentIndexEven = game.currentIndex % 2 === 0;

    if (isCurrentIndexEven) {
      pokemonImageOdd.src = `${imageBaseurl}${nextPokemonImageId}.png`;

      pokemonImageOdd.style.display = "none";
      pokemonImageEven.style.display = "block";

      if (game.currentIndex === 0) {
        pokemonImageEven.src = `${imageBaseurl}${currentPokemonImageId}.png`;
      }
    }
    else {
      pokemonImageEven.src = `${imageBaseurl}${nextPokemonImageId}.png`;

      pokemonImageOdd.style.display = "block";
      pokemonImageEven.style.display = "none";
    }
  }

  applyOpacityToPokemonImage(game);
};

function applyOpacityToPokemonImage(game) {
  let currentPokemonName = pokemonGameService.getCurrentPokemonName(game);

  let correctLetterCount = 0;
  for (let i = 0; i < Math.min(currentPokemonName.length, byId("user-input-text").value.length); i++) {
    if (byId("user-input-text").value[i] === currentPokemonName[i]) {
      correctLetterCount++;
    }
    else {
      break;
    }
  }

  const isCurrentIndexEven = game.currentIndex % 2 === 0;
  const opacity = `${50 + (100 * correctLetterCount / currentPokemonName.length / 2)}%`;

  if (isCurrentIndexEven) {
    pokemonImageEven.style.opacity = opacity;
  }
  else {
    pokemonImageOdd.style.opacity = opacity;
  }
}
