import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dateTimePickerRef = document.getElementById('datetime-picker');
const startBtnRef = document.querySelector('[data-start]');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      resetTimerDisplay();
      startBtnRef.disabled = true;
    } else {
      Notiflix.Notify.success('You selected a valid future date');
      startBtnRef.disabled = false;
    }
  },
};
flatpickr('#datetime-picker', options);
startBtnRef.disabled = true;
let countdownInterval;
function updateTimer() {
  const currentDate = new Date();
  const targetDate = new Date(dateTimePickerRef.value);
  const timeDifference = targetDate - currentDate;
  if (timeDifference <= 0) {
    clearInterval(countdownInterval);
    resetTimerDisplay();
    return;
  }
  const { days, hours, minutes, seconds } = convertMs(timeDifference);
  daysRef.textContent = addLeadingZero(days);
  hoursRef.textContent = addLeadingZero(hours);
  minutesRef.textContent = addLeadingZero(minutes);
  secondsRef.textContent = addLeadingZero(seconds);
}
startBtnRef.addEventListener('click', () => {
  clearInterval(countdownInterval);
  updateTimer();
  countdownInterval = setInterval(updateTimer, 1000);
});
function resetTimerDisplay() {
  daysRef.textContent = '00';
  hoursRef.textContent = '00';
  minutesRef.textContent = '00';
  secondsRef.textContent = '00';
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
