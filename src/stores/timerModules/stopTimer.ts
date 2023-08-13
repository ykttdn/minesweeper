import type { Timer } from "@/types/timer";

export const stopTimer = (timer: Timer): void => {
  window.clearInterval(timer.id);
};
