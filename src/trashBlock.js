
const TRASH_STATE_NORMAL = Symbol.for('TRASH_STATE_NORMAL');
const TRASH_STATE_POPPING = Symbol.for('TRASH_STATE_POPPING');

class TrashBlock {

	// x and y represent the top left hand corner of the trash block
  constructor({ x, y, width = 3, height = 1 } = {}) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this._state = TRASH_STATE_NORMAL;
    this._popAge = 0;
  }

  state(newState) {
    if(newState !== undefined) {
      this._state = newState;
    }
    return this._state;
  }

  popAge(newValue) {
    if(newValue !== undefined) {
      this._popAge = newValue;
    }
    return this._popAge;
  }

  *positions() {
  	for(let i=0; i<this.width; i++) {
  		for(let j=0; j<this.height; j++) {
  			yield [this.x+i, this.y+j];
  		}
  	}
  }
}

export { TrashBlock, TRASH_STATE_NORMAL, TRASH_STATE_POPPING };