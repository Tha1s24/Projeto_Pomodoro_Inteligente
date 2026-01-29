import os
from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from openai import OpenAI
from dotenv import load_dotenv

# Carrega variáveis de ambiente (sua API KEY)
load_dotenv()

app = Flask(__name__)

# Configuração do Banco de Dados SQLite
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pomodoro.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Inicializa o cliente OpenAI
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# --- MODELO DO BANCO DE DADOS ---
class PomodoroSession(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    duration = db.Column(db.Integer, nullable=False)  # em minutos
    date = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "duration": self.duration,
            "date": self.date.strftime("%d/%m/%Y %H:%M")
        }

# Cria o banco de dados
with app.app_context():
    db.create_all()

# --- ROTAS ---

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/session', methods=['POST'])
def save_session():
    data = request.json
    try:
        new_session = PomodoroSession(
            username=data.get("name"),
            duration=data.get("duration")
        )
        db.session.add(new_session)
        db.session.commit()
        return jsonify({"status": "success", "message": "Sessão salva!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/api/ai-advice', methods=['POST'])
def get_ai_advice():
    data = request.json
    user_name = data.get("name", "Dev")
    
    try:
        # Chamada real para a OpenAI
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Você é um assistente de produtividade focado na técnica Pomodoro."},
                {"role": "user", "content": f"O usuário {user_name} acabou de entrar no app. Dê uma saudação curta e motivadora."}
            ],
            max_tokens=50
        )
        advice = response.choices[0].message.content
    except Exception:
        # Fallback caso a chave da API não esteja configurada
        advice = f"Olá {user_name}! Pronto para focar hoje?"

    return jsonify({"message": advice})

@app.route('/api/history/<username>', methods=['GET'])
def get_history(username):
    sessions = PomodoroSession.query.filter_by(username=username).all()
    return jsonify([s.to_dict() for s in sessions])

if __name__ == '__main__':
    app.run(debug=True)