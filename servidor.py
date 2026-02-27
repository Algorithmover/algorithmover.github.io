from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app) # Essa linha é obrigatória!

# Ranking temporário na memória do PC
ranking_global = []

@app.route('/salvar_pontuacao', methods=['POST'])
def salvar():
    dados = request.json
    nome = dados.get('nome', 'Anônimo')
    pontos = dados.get('pontos', 0)

    ranking_global.append({'nome': nome, 'pontos': pontos})
    # Ordena: maior pontuação primeiro
    ranking_global.sort(key=lambda x: x['pontos'], reverse=True)
    
    return jsonify({"ranking": ranking_global[:5]}) # Retorna o Top 5

if __name__ == '__main__':
    app.run(port=5000)