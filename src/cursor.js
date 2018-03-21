const CURSOR_WIDTH = 2;

class Cursor {
  constructor() {
    this.position = [0, 0];
    this.state = 'idle';
    this.moveCounter = 0;
    this.keyMovements = new Map(Object.entries({
      "ArrowLeft": [-1, 0],
      "ArrowRight": [1, 0],
      "ArrowUp": [0, -1],
      "ArrowDown": [0, 1],
    }));
  }

  tick(keyboard, board) {
    if (this.state == 'idle') {
      for (let [key, move] of this.keyMovements) {
        if (keyboard.isDown(key)) {
          this.position[0] += move[0];
          this.position[1] += move[1];
          this.state = "moving";
          this.moveCounter = 2;
          this.keyRepeat = true;
          this.keyRepeatCounter = 3;
        }
      }
    }

    if (this.state == "moving") {
      if (this.moveCounter-- < 0) {
        if (this.keyRepeatCounter > 0) {
          this.state = 'idleRepeat';
        } else {
          this.state = 'idle';
        }
      }
    }

    if (this.state == 'idleRepeat' || this.state == 'moving') {
      var allUp = true;
      for (let k of this.keyMovements.keys()) {
        allUp &= !keyboard.isDown(k);
      }
      if (allUp) {
        this.keyRepeatCounter = 0;
      }
      if (this.keyRepeatCounter-- < 0) {
        this.state = 'idle';
      }
    }

    // Handle board bounds
    this.position[0] = Math.min(board.width - 1 - (CURSOR_WIDTH - 1), Math.max(0, this.position[0]));
    this.position[1] = Math.min(board.height - 1, Math.max(0, this.position[1]));
  }
}

export { Cursor };