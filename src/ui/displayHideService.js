let displayNoneCounter;

function byId(id) {
  return document.querySelector(`#${id}`);
}

function updateDisplayNoneCounter(game) {
  const rowOffsetTop = byId('pokemon-names-div').offsetTop;
  const nextWordOffsetTop = document.querySelector(`#pokemon-names-div > span:nth-child(${game.currentIndex + 1})`).offsetTop;

  if (nextWordOffsetTop > rowOffsetTop + 15) {
    displayNoneCounter = game.currentIndex;
  }
}

function reset() {
  displayNoneCounter = 0;
}

function getCounter() {
  return displayNoneCounter;
}

export default {
  updateDisplayNoneCounter, getCounter, reset
}
