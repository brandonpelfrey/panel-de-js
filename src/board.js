const BLOCK_STATE_INITIAL = Symbol("BLOCK_STATE_INITIAL");
const DROP_SPEED = 10;

class Block {
  constructor({ state = BLOCK_STATE_INITIAL, color = 'red' } = {}) {
    this.state = state;
    this.color = color;
  }
}

class BoardGrid {

  constructor(width, height) {
    this.width = width;
    this.heigh = height;

    this.grid = Array(width);
    for (let col = 0; col < height; ++col) {
      this.grid[col] = Array(height);
    }
  }

  get(x, y) { return this.grid[x][y]; }
  put(x, y, new_state) { this.grid[x][y] = new_state; }
};

class Board {
  constructor({ width = 8, height = 20 } = {}) {
    this.width = width;
    this.height = height;
    this.grid = new BoardGrid(width, height);

    this.grid.put(2, 1, new Block());
    this.grid.put(3, 1, new Block({ color: 'purple' }));
    this.grid.put(4, 1, new Block({ color: 'red' }));
    this.grid.put(5, 1, new Block({ color: 'green' }));
    this.grid.put(7, 1, new Block({ color: 'red' }));

    this.grid.put(7, 2, new Block({ color: 'purple' }));
    this.grid.put(2, 2, new Block({ color: 'green' }));

    this.grid.put(4, 3, new Block({ color: 'purple' }));
    this.grid.put(6, 3, new Block({ color: 'green' }));
    this.grid.put(9, 3, new Block({ color: 'red' }));
  }

  requestSwap(positionOne, positionTwo) {
    const blockOne = this.grid.get(...positionOne);
    const blockTwo = this.grid.get(...positionTwo);
    this.grid.put(...positionTwo, blockOne);
    this.grid.put(...positionOne, blockTwo);
  }

  _determineClears() {
    let allClears = [];
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        const block = this.grid.get(x, y);
        if (block) {
          let rowClears = this._getLineClears(x, y, block.color, true);
          let colClears = this._getLineClears(x, y, block.color, false);
          allClears.push(...rowClears);
          allClears.push(...colClears);
        }
      }
    }
    allClears.forEach((xy) => this.grid.put(...xy, null));
  }

  _getLineClears(x, y, color, isRow) {
    let clears = [];
    let next;
    do {
      clears.push([x, y]);
      if (isRow) {
        x++
      } else {
        y++;
      }
      next = this.grid.get(x, y);
    } while (next && next.color == color);
    return clears.length >= 3 ? clears : [];
  }

  tick() {
    this._determineClears();
    this._doGravity();
  }

  _doGravity() {
    // Does anything need to fall?
    const fallSections = this._getFallSegments();
    if(fallSections.length === 0) {
      return;
    }

    // Do we need to wait for the cool-down of the last drop?
    this.gravityCounter = ( this.gravityCounter || 10 ) - 1;
    if(this.gravityCounter === 0) {
      this.gravityCounter = null;
      // We waited long enough, engage the fall logic.
      fallSections.forEach( (segment) => { this._performSegmentFall(segment); } );
    }
  }

  _performSegmentFall(segment) {
    const fallingBlocks = [];

    // Get all the blocks for this segment, remove them
    for(const [x,y] of segment) {
      const block = this.grid.get(x,y);
      fallingBlocks.push([x,y,block]);
      this.grid.put(x, y, null);
    }

    // Place them back down one square
    for(const [x,y,block] of fallingBlocks) {
      this.grid.put(x, y+1, block);
    }
  }

  _getFallSegments() {

    const results = [];
    for (let x = 0; x < this.width; ++x) {

      let y = (this.height-1); // Start at the bottom of the field
      let currentSegment = [];

      // Find the first open spot.
      while( this.grid.get(x,y) != null && y >= 0) {
        y --;
      }

      while(y >= 0) {
        const whatsHere = this.grid.get(x,y);

        if(whatsHere != null) {
          currentSegment.push([x,y]);
        } else {
          // There's nothing at this cell. But if there is still an ongoing segment, then we just finished a segment
          if(currentSegment.length > 0) {
            results.push(currentSegment);
            currentSegment = [];
          }
        }

        y--;
      }

      // If there is an unfinished segment at this point, push it.
      if(currentSegment.length > 0) {
        results.push(currentSegment);
        currentSegment = [];
      }

    }

    return results;
  }

}

export { Board };