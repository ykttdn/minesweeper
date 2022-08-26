const remains = document.getElementsByClassName("remains")[0];
const setMineCounter = (remainingMines: number) => {
  if (remains === undefined) {
    return;
  }

  if (remainingMines <= -100) {
    remains.textContent = "-99";
  } else if (remainingMines <= -10) {
    remains.textContent = `${remainingMines}`;
  } else if (remainingMines <= -1) {
    remains.textContent = `- ${-remainingMines}`;
  } else if (remainingMines <= 9) {
    remains.textContent = `00${remainingMines}`;
  } else if (remainingMines <= 99) {
    remains.textContent = `0${remainingMines}`;
  } else if (remainingMines <= 999) {
    remains.textContent = `${remainingMines}`;
  } else {
    remains.textContent = "999";
  }
};

export default setMineCounter;
