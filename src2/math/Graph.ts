export class Graph {
  constructor(private points: Points[], private segments: Segments){}

  draw(ctx: CanvasRenderingContext2D) {
    for (const point of this.points) {
      point.draw(ctx);
    }
    for (const seg of this.segments) {
      seg.draw(ctx);
    }
  }
};
