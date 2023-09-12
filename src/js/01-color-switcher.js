function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
const btnStartRef = document.querySelector('[data-start]');
const btnStopRef = document.querySelector('[data-stop]');
btnStopRef.disabled = true;
let timerId = null;
btnStartRef.addEventListener('click', () => {
  btnStartRef.disabled = true;
  btnStopRef.disabled = false;
  timerId = setInterval(() => {
    const randomColor = getRandomHexColor();
    document.body.style.backgroundColor = randomColor;
  }, 1000);
});
btnStopRef.addEventListener('click', () => {
  clearInterval(timerId);
  btnStartRef.disabled = false;
  btnStopRef.disabled = true;
});
