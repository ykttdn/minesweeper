import { defineStore } from "pinia";
import { ref } from "vue";

export const useParametersStore = defineStore("parameters", () => {
  const hasGameStarted = ref(false);

  const initializeParameters = () => {
    hasGameStarted.value = false;
  };

  const isFlagModeOn = ref(false);

  return { hasGameStarted, initializeParameters, isFlagModeOn };
});
