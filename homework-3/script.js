let countdown;
let timeLeft = 0;

const input = document.getElementById('countdown');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const display = document.getElementById('timer');

startButton.addEventListener('click', () => {
    if (countdown) clearInterval(countdown);
    timeLeft = parseInt(input.value);

    if (isNaN(timeLeft) || timeLeft <= 0) {
        display.textContent = "Lütfen geçerli bir sayı girin.";
        return;
    }

    display.textContent = timeLeft;

    countdown = setInterval(() => {
        timeLeft--;
        if (timeLeft < 0) {
            clearInterval(countdown);
            display.textContent = "Süre doldu!";
        } else {
            display.textContent = timeLeft;
        }
    }, 1000);
});

resetButton.addEventListener('click', () => {
    clearInterval(countdown);
    input.value = '';
    display.textContent = '';
    timeLeft = 0;
    countdown = null;
    input.focus();
});

