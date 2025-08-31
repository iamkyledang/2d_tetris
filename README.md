# Kubik 2D Game

This is a full-stack 2D Kubik (2D Tetris-like) game built with Python Flask and Three.js.

## Setup

```powershell
python -m venv venv
venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py
```

Open the local host address in a browser.

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

