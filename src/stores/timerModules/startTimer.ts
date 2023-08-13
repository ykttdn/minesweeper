import type { Timer } from "@/types/timer";

export const startTimer = (timer: Timer): Timer => {
  const newTimer = { ...timer };
  if (newTimer.id === 0) {
    newTimer.id = window.setInterval(() => {
      newTimer.current++;
    }, 1000);
  }
  return newTimer;
};
