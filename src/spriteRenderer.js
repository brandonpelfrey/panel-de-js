const image = new Image();
image.src = "src/sprites.png"

const TILE_SIZE = 16;
const TILE_MARGIN = 3;

class SpriteRenderer {
  render(context, spriteIndex, x, y, width, height) {
    context.drawImage(image, spriteIndex * (TILE_SIZE + TILE_MARGIN), 0, TILE_SIZE, TILE_SIZE, x, y, width, height);
  }
}

export { SpriteRenderer }