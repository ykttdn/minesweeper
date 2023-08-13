import type { Timer } from "@/types/timer";
import { defineStore } from "pinia";
import { ref } from "vue";
import { startTimer } from "./timerModules/startTimer";
import { stopTimer } from "./timerModules/stopTimer";
import { resetTimer } from "./timerModules/resetTimer";

export const useTimerStore = defineStore("timer", () => {
  const timer = ref<Timer>({
    id: 0,
    current: 0,
  });

  return { resetTimer, startTimer, stopTimer, timer };
});
