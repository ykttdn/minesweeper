import type { Timer } from "@/types/timer";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useTimerStore = defineStore("timer", () => {
  const timer = ref<Timer>({
    id: 0,
    current: 0,
  });

  const startTimerIfStopped = (): void => {
    if (timer.value.id === 0) {
      timer.value.id = window.setInterval(() => {
        timer.value.current++;
      }, 1000);
    }
  };

  const stopTimer = (): void => {
    window.clearInterval(timer.value.id);
  };

  const resetTimer = (): void => {
    stopTimer();
    timer.value.id = 0;
    timer.value.current = 0;
  };

  return { resetTimer, startTimerIfStopped, stopTimer, timer };
});
