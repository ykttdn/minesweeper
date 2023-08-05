import { defineStore } from "pinia";
import { ref } from "vue";

type Timer = {
  id: number;
  current: number;
};

export const useTimerStore = defineStore("timer", () => {
  const timer = ref<Timer>({
    id: 0,
    current: 0,
  });

  const startTimer = (timer: Timer): Timer => {
    if (timer.id === 0) {
      timer.id = window.setInterval(() => {
        timer.current++;
      }, 1000);
    }
    return timer;
  };

  const stopTimer = (timer: Timer): void => {
    window.clearInterval(timer.id);
  };

  const resetTimer = (timer: Timer): Timer => {
    stopTimer(timer);
    timer.id = 0;
    timer.current = 0;
    return timer;
  };

  return { resetTimer, startTimer, stopTimer, timer };
});
