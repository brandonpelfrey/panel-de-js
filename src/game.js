import {Board} from './board.js';
import {Cursor} from './cursor.js';

class Game {
  constructor() {
    this.board = new Board();
    this.cursor = new Cursor();
  }

  tick() {

  }
}

export {Game};