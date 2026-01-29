document.addEventListener('DOMContentLoaded', () => {
    let timerDisplay = document.getElementById('timer');
    let playPauseBtn = document.getElementById('play-pause');
    let resetBtn = document.getElementById('reset');

    let timeLeft = 25 * 60; // 25 minutos em segundos
    let timerId = null;
    let isRunning = false;

    function updateDisplay() {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        timerDisplay.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        document.title = `${timerDisplay.innerText} - Smart Pomodoro`;
    }

    async function finishSession() {
        clearInterval(timerId);
        isRunning = false;
        playPauseBtn.innerText = "Iniciar Foco";
        
        const userName = localStorage.getItem('pomodoro_user') || "Dev";
        
        // Salva no banco via storage.js
        await Storage.saveSession(userName, 25);
        
        // Recarrega o histórico (função global no ai_agent.js)
        if (typeof loadHistory === 'function') {
            loadHistory(userName);
        }

        alert("Parabéns! Ciclo de foco concluído. A IA registrou seu progresso.");
        resetTimer();
    }

    function startTimer() {
        if (isRunning) return;
        isRunning = true;
        playPauseBtn.innerText = "Pausar";
        
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft <= 0) {
                finishSession();
            }
        }, 1000);
    }

    function pauseTimer() {
        isRunning = false;
        clearInterval(timerId);
        playPauseBtn.innerText = "Continuar";
    }

    function resetTimer() {
        pauseTimer();
        timeLeft = 25 * 60;
        updateDisplay();
        playPauseBtn.innerText = "Iniciar Foco";
    }

    playPauseBtn.addEventListener('click', () => {
        isRunning ? pauseTimer() : startTimer();
    });

    resetBtn.addEventListener('click', resetTimer);

    updateDisplay(); // Inicializa o visor
});