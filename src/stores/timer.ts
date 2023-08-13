import type { Timer } from "@/types/timer";
import { defineStore } from "pinia";
import { ref } from "vue";
import { startTimer } from "./timerModules/startTimer";

export const useTimerStore = defineStore("timer", () => {
  const timer = ref<Timer>({
    id: 0,
    current: 0,
  });

  const stopTimer = (timer: Timer): void => {
    window.clearInterval(timer.id);
  };

  const resetTimer = (timer: Timer): Timer => {
    stopTimer(timer);
    return { id: 0, current: 0 };
  };

  return { resetTimer, startTimer, stopTimer, timer };
});
