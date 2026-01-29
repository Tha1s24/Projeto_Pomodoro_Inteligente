const Storage = {
    // Salva a sessão no banco de dados SQLite via Flask
    async saveSession(name, duration) {
        try {
            const response = await fetch('/api/session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, duration })
            });
            return await response.json();
        } catch (error) {
            console.error("Erro ao salvar sessão:", error);
        }
    }
};