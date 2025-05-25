import { Point } from "../primitives/Point";
import { Polygon } from "../primitives/Polygon";
import { WorldItem } from "./WordItems";

export class Building extends WorldItem {
    base: Polygon;
    points: Array<Point>;
    height: number;
    
    constructor( poly: Polygon, height = 200)
    {
        super();
        this.points = poly.points;
        this.base = poly;
        this.height = height;
    };

    draw( ctx: CanvasRenderingContext2D ) 
    {
        this.base.draw( ctx )
    };
};
