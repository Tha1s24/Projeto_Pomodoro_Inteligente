document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('welcome-modal');
    const startBtn = document.getElementById('start-btn');
    const nameInput = document.getElementById('user-name-input');
    const greeting = document.getElementById('greeting');
    const aiStatus = document.getElementById('ai-status');
    const historyList = document.getElementById('history-list');

    // 1. Função para buscar conselho da IA no Backend
    async function fetchAiAdvice(name) {
        try {
            aiStatus.innerText = "IA está pensando...";
            const response = await fetch('/api/ai-advice', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name })
            });
            const data = await response.json();
            aiStatus.innerText = data.message;
        } catch (error) {
            console.error("Erro ao chamar IA:", error);
            aiStatus.innerText = "Não consegui conectar com a IA, mas estou aqui para te ajudar!";
        }
    }

    // 2. Função para carregar histórico do banco de dados
    async function loadHistory(name) {
        try {
            const response = await fetch(`/api/history/${name}`);
            const sessions = await response.json();
            
            historyList.innerHTML = ''; // Limpa a lista atual
            document.getElementById('session-count').innerText = `${sessions.length} sessões hoje`;

            sessions.forEach(session => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>⏱️ ${session.duration} min</span>
                    <span>${session.date}</span>
                `;
                historyList.appendChild(li);
            });
        } catch (error) {
            console.error("Erro ao carregar histórico:", error);
        }
    }

    // 3. Evento de Clique no Botão do Modal
    startBtn.addEventListener('click', () => {
        const userName = nameInput.value.trim();

        if (userName) {
            // Salva o nome no localStorage para não pedir toda hora (UX)
            localStorage.setItem('pomodoro_user', userName);
            
            // Personaliza a interface
            greeting.innerText = `Olá, ${userName}!`;
            modal.style.display = 'none';

            // Chama as funções do backend
            fetchAiAdvice(userName);
            loadHistory(userName);
        } else {
            alert("Por favor, digite seu nome para começar!");
        }
    });

    // Check automático: Se já tiver nome salvo, pula o modal
    const savedName = localStorage.getItem('pomodoro_user');
    if (savedName) {
        modal.style.display = 'none';
        greeting.innerText = `Olá, ${savedName}!`;
        fetchAiAdvice(savedName);
        loadHistory(savedName);
    }
});