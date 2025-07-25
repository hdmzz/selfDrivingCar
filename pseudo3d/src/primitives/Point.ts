export class Point {
  constructor(public x: number, public y: number) {};

  draw(ctx: CanvasRenderingContext2D, {size = 18, color = "black", outline = false, fill = false} = {})
  {
    const rad = size / 2;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(this.x, this.y, rad, 0, Math.PI * 2);
    ctx.fill();

    if (outline) {
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "yellow";
        ctx.arc(this.x, this.y, rad * 0.6, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
    };
    if (fill) {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "yellow";
        ctx.arc(this.x, this.y, rad * 0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    };
  };

  equals(point: Point)
  {
    return (this.x === point.x && this.y === point.y);
  };
}
