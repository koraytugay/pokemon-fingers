const timerContainer = byId("timer-span");

function byId(id) {
  return document.querySelector(`#${id}`);
}

export default function (game) {
  if (game != null) {
    timerContainer.textContent = game.remainingTimeInSeconds;
  }
  if (game.remainingTimeInSeconds === 0) {
    timerContainer.classList.add("displayNone");
  } else {
    timerContainer.classList.remove("displayNone");
  }
};
