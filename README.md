# Kubik 3D Game

This is a full-stack 3D Kubik (3D Tetris-like) game built with Python Flask and Three.js.

## Setup

```powershell
python -m venv venv
venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py
```

Open `http://127.0.0.1:5000` in a browser.

## Structure

- `app.py`: Flask server.
- `game.py`: Game logic.
- `templates/index.html`: Front-end.
- `static/js/game.js`: Three.js rendering and input.
- `static/css/style.css`: Styles.

## Controls

Arrow keys: Move along x/y.
A: Move along z back
F: Move along z front

