import { AIPlayer } from "./aiplayer.js";
import { Buttons } from "../input.js";

const DIRECTIONS = [Buttons.LEFT, Buttons.RIGHT, Buttons.UP, Buttons.DOWN, Buttons.SWAP];

export class AISimpleton extends AIPlayer {
  constructor({board, input}) {
    super({board: board, input: input});
  }

  tick() {
    this.x = (this.x || 1) - 1;
    if(this.x <= 0) {
      this.x = null;
      this.input.clear();
      this.input.hold( DIRECTIONS[ parseInt(Math.random() * 10) % 5 ] );
    }
  }
}
