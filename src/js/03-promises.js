import Notiflix from 'notiflix';
const delay = document.querySelector('[name="delay"]');
const step = document.querySelector('[name="step"]');
const amount = document.querySelector('[name="amount"]');
const btnCreatePromise = document.querySelector('[type="submit"]');
const form = document.querySelector('.form');
function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}
btnCreatePromise.addEventListener('click', e => {
  e.preventDefault();
  for (let i = 0; i < amount.value; i++) {
    createPromise(i + 1, Number(delay.value) + Number(step.value) * i)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `:bulb: Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `:hamster: Rejected promise ${position} in ${delay}ms`
        );
      });
  }
  form.reset();
});
