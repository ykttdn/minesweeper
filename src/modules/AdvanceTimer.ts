export const advanceTimer = (intervalId: number) => {
  const timer = document.getElementsByClassName("timer")[0];
  if (timer.textContent === null) {
    return;
  }
  let currentTime = parseInt(timer.textContent, 10);
  currentTime++;
  if (currentTime < 10) {
    timer.textContent = `00${currentTime}`;
  } else if (currentTime < 100) {
    timer.textContent = `0${currentTime}`;
  } else if (currentTime < 1000) {
    timer.textContent = `${currentTime}`;
  } else {
    clearInterval(intervalId);
  }
};
