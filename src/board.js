const BLOCK_STATE_INITIAL = Symbol("BLOCK_STATE_INITIAL");

class Block {
  constructor({ state = BLOCK_STATE_INITIAL } = {}) {
    this.state = state;
    this.color = 'red';
  }
}

class BoardGrid {

  constructor(width, height) {
    this.width = width;
    this.heigh = height;

    this.grid = Array(height);
    for (let col = 0; col < height; ++col) {
      this.grid[col] = Array(width);
    }
  }

  get(i, j) { return this.grid[i][j]; }
  put(i, j, new_state) { this.grid[i][j] = new_state; }
};

class Board {
  constructor({ width = 8, height = 20 } = {}) {
    this.width = width;
    this.height = height;
    this.grid = new BoardGrid(width, height);

    this.grid.put(1, 1, new Block());
  }

  tick() {

  }
}

export { Board };