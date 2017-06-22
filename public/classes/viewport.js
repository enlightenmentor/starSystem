class Viewport {
  constructor(x, y, s) {
    this.x = x;
    this.y = y;
    this.s = s;
  }
  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }
  zoom(ds, x, y) {
    this.s *= ds;
    if (!x || !y) {
      x = width/2;
      y = height/2;
    }
    let dx = (x - this.x) * (1 - ds);
    let dy = (y - this.y) * (1 - ds);
    this.x += dx;
    this.y += dy;
  }
  apply() {
    translate(this.x, this.y);
    scale(this.s);
  }
}