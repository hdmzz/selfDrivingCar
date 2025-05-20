import { distance, normalize, subtract } from "../utils/utils";
import { Point } from "./Point";

export class Segment {
    constructor( public p1: Point, public p2: Point ) {};

    draw( ctx: CanvasRenderingContext2D, {width = 4, color = "white", dash=[0, 0]} = {} )
    {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.setLineDash( dash )
        ctx.moveTo( this.p1.x, this.p1.y );
        ctx.lineTo( this.p2.x, this.p2.y );
        ctx.stroke();
        ctx.setLineDash( [] );
    };

    lenght()
    {
        return distance( this.p1, this.p2 );//hypothenuse du point p1x - p2x et p1y - p2y
    };

    equals( segment: Segment )
    {
        return ( this.includes( segment.p1 ) && this.includes( segment.p2 ));
    };

    includes( point: Point )
    {
        return ( this.p1.equals( point ) || this.p2.equals( point ));
    };

    directionVector()
    {
        return ( normalize( subtract( this.p2, this.p1 )));
    };
};
