// scripts/app.js
// Basic timer + mode switcher (no audio yet)

const modeCards = document.querySelectorAll('.mode-card');
const sessionSection = document.querySelector('.session');
const timerLabel = document.querySelector('.timer-label');
const progressCircle = document.querySelector('.progress');

const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const sessionLengthSel = document.getElementById('sessionLength');

let timer = null;
let totalSeconds = 15 * 60;   // default 15 min
let remainingSeconds = totalSeconds;

function updateTimerDisplay() {
  const minutes = String(Math.floor(remainingSeconds / 60)).padStart(2, '0');
  const seconds = String(remainingSeconds % 60).padStart(2, '0');
  timerLabel.textContent = `${minutes}:${seconds}`;

  // circumference of r=45 is ~282.743
  const circumference = 2 * Math.PI * 45;
  const progress = remainingSeconds / totalSeconds;
  progressCircle.style.strokeDashoffset = circumference * (1 - progress);
}

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    if (remainingSeconds > 0) {
      remainingSeconds--;
      updateTimerDisplay();
    } else {
      clearInterval(timer);
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
}

function resetTimer() {
  clearInterval(timer);
  remainingSeconds = totalSeconds;
  updateTimerDisplay();
}

// Mode cards → show the session area and initialize timer length
modeCards.forEach(card => {
  card.addEventListener('click', () => {
    document.querySelector('.mode-grid').classList.add('hidden');
    sessionSection.classList.remove('hidden');
    // set from dropdown
    totalSeconds = parseInt(sessionLengthSel.value, 10) * 60;
    remainingSeconds = totalSeconds;
    updateTimerDisplay();
  });
});

// Controls
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// When user changes the length
sessionLengthSel.addEventListener('change', (e) => {
  totalSeconds = parseInt(e.target.value, 10) * 60;
  remainingSeconds = totalSeconds;
  updateTimerDisplay();
});

// Initialize on first load
updateTimerDisplay();
