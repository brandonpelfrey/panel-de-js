const Constants = {
  TILE_SIZE: 8
};

class Renderer {
  constructor(receiverId, width, height) {
    this.receiver = document.getElementById(receiverId);
    this.width = width;
    this.height = height;

    const canvasEl = this._createCanvasElement();
    this.receiver.appendChild( canvasEl );
    this.canvasCtx = canvasEl.getContext('2d');

    this.scale = 1.0;
  }

  _createCanvasElement() {
    const canvasEl = document.createElement('canvas');
    canvasEl.width = this.width;
    canvasEl.height = this.height;
    return canvasEl;
  }

  draw() {
    this._drawTileGrid();

    // TODO
  }

  _drawTileGrid() {
    let row = 0;
    while(row <= this.height) {
      this.canvasCtx.strokeRect(0, row * this.scale, this.width, 1);
      row += Constants.TILE_SIZE * this.scale;
    }

    let col = 0;
    while(col <= this.width) {
      this.canvasCtx.strokeRect(col * this.scale, 0, 1, this.height);
      col += Constants.TILE_SIZE * this.scale;
    }
  }
}

export {Renderer};