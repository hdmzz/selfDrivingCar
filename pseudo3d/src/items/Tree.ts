import { Point } from "../primitives/Point";
import { Segment } from "../primitives/Segment";
import { add, lerp, scale, subtract } from "../utils/utils";

export class Tree {
    center: Point;
    treeSize: number;

    constructor( center: Point, treeSize: number, public heigthCoeff: number = 0.3 )
    {
        this.center = center;
        this.treeSize = treeSize;
    };

    #generateLevels()
    {

    };

    draw( ctx: CanvasRenderingContext2D, viewPoint: Point )
    {
        const diff = subtract( this.center, viewPoint );
        const top = add( this.center, scale( diff, this.heigthCoeff ));
        const levelCount = 7;

        for ( let level = 0; level < levelCount; level++ ) {
            const t = level /  ( levelCount - 1 );
            const point = new Point( lerp( this.center.x, top.x, t ), lerp( this.center.y, top.y, t ))
            const color = "rgb(30," + lerp( 50, 200, t ) + ", 50)";
            const size = lerp( this.treeSize, 40, t );
            point.draw( ctx, { size: size, color });
        };
    };
};
