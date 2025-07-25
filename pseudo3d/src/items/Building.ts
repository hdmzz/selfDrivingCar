import { Polygon } from "../primitives/Polygon";

export class Building {
    base: Polygon;
    
    constructor( base: Polygon )
    {
        this.base = base;
    };
    
    draw( ctx: CanvasRenderingContext2D )
    {
        this.base.draw( ctx );
    };
};
