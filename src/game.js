import { Board } from './board.js';
import { Cursor } from './cursor.js';
import { Keyboard } from './keyboard.js';

const TRASH_FREQUENCY = 60 * 7;

class Game {
  constructor() {
    this.board = new Board();

    this.keyboard = new Keyboard({ swap: "Numpad0" });
    const cursor = new Cursor(this.keyboard, this.board);

    this.keyboardTwo = new Keyboard({ up: "KeyW", down: "KeyS", right: "KeyD", left: "KeyA", swap: "Space" });
    const cursorTwo = new Cursor(this.keyboardTwo, this.board, "#B8B");

    this.cursors = [cursor, cursorTwo];
  }

  tick() {
    this.cursors.forEach((c) => c.tick());
    this.board.tick();
    this._trashPusher();
  }

  _trashPusher() {
    this.trashCounter = (this.trashCounter || TRASH_FREQUENCY) - 1;
    if (this.trashCounter <= 0) {
      this.board.pushTrashUp();
      this.trashCounter = null;
      this.cursors.forEach((c) => c.requestPushUp());
    }
  }
}

export { Game };