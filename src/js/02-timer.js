import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import { selectors } from './refs_for_task2';
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
      selectors.startBtnRef.disabled = true;
    } else {
      Notiflix.Notify.success('You selected a valid future date');
      selectors.startBtnRef.disabled = false;
    }
  },
};
flatpickr('#datetime-picker', options);
selectors.startBtnRef.disabled = true;
let countdownInterval;
function updateTimer() {
  const currentDate = new Date();
  const targetDate = new Date(selectors.dateTimePickerRef.value);
  const timeDifference = targetDate - currentDate;
  if (timeDifference <= 0) {
    clearInterval(countdownInterval);
    resetTimerDisplay();
    return;
  }
  const { days, hours, minutes, seconds } = convertMs(timeDifference);
  selectors.daysRef.textContent = addLeadingZero(days);
  selectors.hoursRef.textContent = addLeadingZero(hours);
  selectors.minutesRef.textContent = addLeadingZero(minutes);
  selectors.secondsRef.textContent = addLeadingZero(seconds);
}
selectors.startBtnRef.addEventListener('click', () => {
  clearInterval(countdownInterval);
  updateTimer();
  countdownInterval = setInterval(updateTimer, 1000);
});
function resetTimerDisplay() {
  selectors.daysRef.textContent = '00';
  selectors.hoursRef.textContent = '00';
  selectors.minutesRef.textContent = '00';
  selectors.secondsRef.textContent = '00';
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
