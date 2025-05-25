import { Point } from "../primitives/Point";
import { Segment } from "../primitives/Segment";
import { add } from "../utils/utils";
import { World } from "../World";
import { WorldItem } from "./WordItems";

export class Tree extends WorldItem {
    center: Point;
    size: number;

    constructor( center: Point, size: number )
    {
        super();
        this.center = center;
        this.size = size;
    };

    draw( ctx: CanvasRenderingContext2D )
    {
        this.center.draw( ctx, { size: this.size, color: "green" });

        const top = add( this.center, { x: -40, y: -40 } as Point);
        new Segment( this.center, top ).draw( ctx, {color: "white" });
    };
};
