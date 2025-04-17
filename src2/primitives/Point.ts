export class Point {
  constructor(public x: number, public y: number) {};

  draw(ctx: CanvasRenderingContext2D, size: number = 18, color = "black")
  {
    const rad = size / 2;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(this.x, this.y, rad, 0, Math.PI * 2);
    ctx.fill();
  };

  equals(point: Point)
  {
    return (this.x === point.x && this.y === point.y);
  };
}
