import { Point } from "./Point";

export class Segment {
  constructor(public p1: Point, public p2: Point){};

  draw(ctx: CanvasRenderingContext2D, width: number = 2, color: string = "black")
  {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p2.x, this.p2.y);
    ctx.stroke();
  }
}
