import type { Timer } from "@/types/timer";
import { stopTimer } from "./stopTimer";

export const resetTimer = (timer: Timer): Timer => {
  stopTimer(timer);
  return { id: 0, current: 0 };
};
