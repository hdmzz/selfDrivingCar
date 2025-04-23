    import { Point } from "./Point";

export class Segment {
    constructor(public p1: Point, public p2: Point){};

    draw(ctx: CanvasRenderingContext2D, {width = 2, color = "black", dash = []} = {dash: [0, 0]})
    {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.setLineDash(dash)
        ctx.moveTo(this.p1.x, this.p1.y);
        ctx.lineTo(this.p2.x, this.p2.y);
        ctx.stroke();
        ctx.setLineDash([]);
    };

    equals(segment: Segment)
    {
        return (this.includes(segment.p1) && this.includes(segment.p2));
    };

    includes(point: Point)
    {
        return (this.p1.equals(point) || this.p2.equals(point));
    };
};
