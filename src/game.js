import { Board } from './board.js';
import { Cursor } from './cursor.js';
import { Keyboard } from './keyboard.js';

const SCROLL_PER_FRAME = 1/(60 * 7);

class Game {
  constructor() {
    this.board = new Board();

    this.keyboard = new Keyboard({ swap: "Numpad0" });
    const cursor = new Cursor(this.keyboard, this.board);

    this.keyboardTwo = new Keyboard({ up: "KeyW", down: "KeyS", right: "KeyD", left: "KeyA", swap: "Space" });
    const cursorTwo = new Cursor(this.keyboardTwo, this.board, "#B8B");

    this.cursors = [cursor, cursorTwo];
    this.scroll = 0;
  }

  tick() {
    this.cursors.forEach((c) => c.tick());
    this.board.tick();
    this._tickScroll();
  }

  _tickScroll() {
    this.scroll = this.scroll + SCROLL_PER_FRAME;
    if(this.scroll > 1) {
      this.scroll--;
      this._pushTrash();
    }
  }

  _pushTrash() {
      this.board.pushTrashUp();
      this.cursors.forEach((c) => c.requestPushUp());
  }
}

export { Game };