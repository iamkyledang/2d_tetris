from flask import Flask, render_template, jsonify, request
from game import Game

app = Flask(__name__)

game = Game()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/state', methods=['GET'])
def get_state():
    return jsonify(game.get_state())

@app.route('/api/move', methods=['POST'])
def move():
    direction = request.json.get('direction')
    game.move(direction)
    return jsonify(game.get_state())

@app.route('/api/tick', methods=['POST'])
def tick():
    game.tick()
    return jsonify(game.get_state())

@app.route('/api/reset', methods=['POST'])
def reset():
    global game
    game = Game()
    return jsonify({'message': 'Game reset successfully'})

if __name__ == '__main__':
    app.run(debug=True)


#A website that needs a hostname