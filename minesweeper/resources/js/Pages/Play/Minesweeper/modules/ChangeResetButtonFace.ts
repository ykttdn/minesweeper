export const changeResetButtonFace = (face: string) => {
    const resetButton = document.getElementsByClassName("reset-button")[0];
    resetButton.className = face;
};
