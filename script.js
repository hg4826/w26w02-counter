const FOCUS_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

let currentMode = "focus";
let timeLeft = FOCUS_TIME;
let timerId = null;
let isRunning = false;

const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");

const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

const focusModeBtn = document.getElementById("focusMode");
const breakModeBtn = document.getElementById("breakMode");

const statusText = document.getElementById("status");

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    minutesDisplay.textContent = String(minutes).padStart(2, "0");
    secondsDisplay.textContent = String(seconds).padStart(2, "0");

    document.title =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")} - Pomodoro`;
}

function startTimer() {
    if (isRunning) {
        pauseTimer();
        return;
    }

    isRunning = true;
    startBtn.textContent = "일시정지";

    timerId = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(timerId);
            timerId = null;
            isRunning = false;

            startBtn.textContent = "시작";

            if (currentMode === "focus") {
                changeMode("break");
            } else {
                changeMode("focus");
            }
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerId);

    timerId = null;
    isRunning = false;

    startBtn.textContent = "시작";
}

function resetTimer() {
    clearInterval(timerId);

    timerId = null;
    isRunning = false;

    startBtn.textContent = "시작";

    if (currentMode === "focus") {
        timeLeft = FOCUS_TIME;
    } else {
        timeLeft = BREAK_TIME;
    }

    updateDisplay();
}

function changeMode(mode) {
    clearInterval(timerId);

    timerId = null;
    isRunning = false;
    currentMode = mode;

    startBtn.textContent = "시작";

    if (mode === "focus") {
        timeLeft = FOCUS_TIME;

        focusModeBtn.classList.add("active");
        breakModeBtn.classList.remove("active");

        statusText.textContent = "집중할 시간입니다!";
    } else {
        timeLeft = BREAK_TIME;

        breakModeBtn.classList.add("active");
        focusModeBtn.classList.remove("active");

        statusText.textContent = "잠시 쉬어가세요!";
    }

    updateDisplay();
}

startBtn.addEventListener("click", startTimer);

resetBtn.addEventListener("click", resetTimer);

focusModeBtn.addEventListener("click", () => {
    changeMode("focus");
});

breakModeBtn.addEventListener("click", () => {
    changeMode("break");
});

updateDisplay();