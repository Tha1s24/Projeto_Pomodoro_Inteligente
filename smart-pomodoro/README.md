# 🍅 Smart Pomodoro AI Agent

Um cronômetro Pomodoro inteligente que utiliza Inteligência Artificial para motivar o usuário e persiste dados em um banco SQLite. Este projeto demonstra habilidades Fullstack, integração de APIs de terceiros e manipulação de banco de dados.

---

## 🚀 Funcionalidades

- **Agente de IA:** Saudação personalizada e dicas de foco geradas via API da OpenAI (GPT).
- **Persistência de Dados:** Histórico de sessões salvo em banco de dados SQLite usando SQLAlchemy.
- **Interface Moderna:** Modal de boas-vindas para personalização e design responsivo com efeito de desfoque.
- **Monitoramento:** Contador de sessões concluídas no dia.

## 🛠️ Tecnologias Utilizadas

- **Backend:** Python + Flask
- **Banco de Dados:** SQLite + SQLAlchemy
- **IA:** OpenAI API (GPT-3.5/4)
- **Frontend:** HTML5, CSS3 (Variáveis e Flexbox) e JavaScript (Async/Await)

---

## 📦 Como rodar o projeto

### 1. Clonar o repositório
```bash
git clone [https://github.com/seu-usuario/smart-pomodoro-ai.git](https://github.com/seu-usuario/smart-pomodoro-ai.git)
cd smart-pomodoro-ai

```

### 2. Configurar o ambiente virtual

```bash
python -m venv venv
# No Windows:
venv\Scripts\activate
# No Mac/Linux:
source venv/bin/activate

```

### 3. Instalar dependências

```bash
pip install -r requirements.txt

```

### 4. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto e adicione sua chave:

```env
OPENAI_API_KEY=sua_chave_aqui

```

### 5. Inicializar o Banco de Dados

```bash
python init_db.py

```

### 6. Iniciar o servidor

```bash
python app.py

```

Acesse: `http://127.0.0.1:5000`

---

## 📂 Estrutura do Projeto

```text
├── app.py              # Rotas Flask e configuração da OpenAI
├── init_db.py          # Script de criação/população do banco
├── static/             # Pasta de arquivos estáticos (Front-end)
│   ├── index.html      # Página principal
│   ├── css/            # Estilização
│   └── js/             # Lógica (Timer, IA, Storage)
├── requirements.txt    # Lista de dependências
└── .env                # Variáveis sensíveis (não incluído no commit)

```

## ✒️ Autor

Seu Nome - [Thais Vitória Ferraz Rangel](www.linkedin.com/in/thais-vitória-ferraz-rangel)

