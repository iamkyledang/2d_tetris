import random

WIDTH = 10
HEIGHT = 10  # square playfield

SHAPES = [
    [[1,1,1,1]],             # I
    [[1,1],[1,1]],           # O
    [[0,1,1],[1,1,0]],       # S
    [[1,1,0],[0,1,1]],       # Z
    [[1,0,0],[1,1,1]],       # J
    [[0,0,1],[1,1,1]],       # L
    [[0,1,0],[1,1,1]],       # T
]

def rotate_shape(shape):
    return [list(row) for row in zip(*shape[::-1])]

class Game:
    def __init__(self):
        self.grid = [[0]*WIDTH for _ in range(HEIGHT)]
        self.score = 0
        self.lines = 0
        self.status = None  # 'win' or 'lose'
        self.shape = None
        self.shape_index = 0
        self.x = 0
        self.y = 0
        self.spawn()

    def spawn(self):
        # Pick a random shape and record its ID
        self.shape_index = random.randrange(len(SHAPES))
        self.shape = [row[:] for row in SHAPES[self.shape_index]]
        self.x = WIDTH // 2 - len(self.shape[0])//2
        self.y = 0
        if not self.can_move(0, 0, self.shape):
            # Game over
            self.status = 'lose'

    def can_move(self, dx, dy, shape):
        for i, row in enumerate(shape):
            for j, val in enumerate(row):
                if val:
                    nx, ny = self.x + j + dx, self.y + i + dy
                    if nx < 0 or nx >= WIDTH or ny < 0 or ny >= HEIGHT:
                        return False
                    if self.grid[ny][nx]:
                        return False
        return True

    def lock(self):
        # Lock shape cells using shape_id for coloring
        shape_id = self.shape_index + 1
        for i, row in enumerate(self.shape):
            for j, val in enumerate(row):
                if val:
                    self.grid[self.y+i][self.x+j] = shape_id
        self.clear_lines()
        # Award points for each piece successfully placed
        self.score += 10
        # Check win condition
        if self.score >= 100 and self.status is None:
            self.status = 'win'
        # Continue only if not finished
        if self.status is None:
            self.spawn()

    def clear_lines(self):
        new_grid = []
        cleared = 0
        for row in self.grid:
            if all(row):
                cleared += 1
            else:
                new_grid.append(row)
        for _ in range(cleared):
            new_grid.insert(0, [0]*WIDTH)
        self.grid = new_grid            
        if cleared: 
            self.lines += cleared
            self.score += cleared * 100

    def move(self, direction):
        if direction == 'left' and self.can_move(-1, 0, self.shape):
            self.x -= 1
        elif direction == 'right' and self.can_move(1, 0, self.shape):
            self.x += 1
        elif direction == 'down':
            if self.can_move(0, 1, self.shape):
                self.y += 1
            else:
                self.lock() 
        elif direction == 'rotate':
            new_shape = rotate_shape(self.shape)
            if self.can_move(0, 0, new_shape):
                self.shape = new_shape

    def tick(self):
        self.move('down')

    def get_state(self):
        display = [row[:] for row in self.grid]
        for i, row in enumerate(self.shape):
            for j, val in enumerate(row):
                if val:
                    yi, xj = self.y + i, self.x + j
                    if 0 <= yi < HEIGHT and 0 <= xj < WIDTH:
                        display[yi][xj] = self.shape_index + 1
        return {'grid': display, 'score': self.score, 'lines': self.lines, 'status': self.status}
