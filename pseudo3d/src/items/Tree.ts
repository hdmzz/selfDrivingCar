import { Point } from "../primitives/Point";
import { Polygon } from "../primitives/Polygon";
import { Segment } from "../primitives/Segment";
import { add, lerp, lerp2D, scale, subtract, translate } from "../utils/utils";
import { Item } from "./Items";

export class Tree implements Item {
        center: Point;
        treeSize: number;
        base: Polygon;//for car intersections with the trees

        constructor( center: Point, treeSize: number, public heigthCoeff: number = 0.3 )
        {
                this.center = center;
                this.treeSize = treeSize;
                this.base = this.#generateLevels( center, treeSize );
        };

        #generateLevels( point: Point, size: number ): Polygon
        {
                const points = [];
                const radius = size / 2;

                for ( let a = 0; a < Math.PI * 2; a += Math.PI / 16 ) {
                        const kindOfRandom = Math.cos((( a + this.center.x ) * size) % 17 ) ** 2;
                        const noisyRadius = radius * lerp( 0.5, 1, kindOfRandom );
                        points.push( translate( point, a, noisyRadius ));
                };

                return ( new Polygon( points ));
        };

        draw( ctx: CanvasRenderingContext2D, viewPoint: Point )
        {
                const diff = subtract( this.center, viewPoint );
                const top = add( this.center, scale( diff, this.heigthCoeff ));
                const levelCount = 7;

                for ( let level = 0; level < levelCount; level++ ) {
                        const t = level /  ( levelCount - 1 );
                        const point = lerp2D( this.center, top, t );
                        const color = "rgb(30," + lerp( 50, 200, t ) + ", 50)";
                        const size = lerp( this.treeSize, 40, t );
                        const poly = this.#generateLevels( point, size );

                        poly.draw( ctx, { fill: color, stroke: "rgba(0,0,0,0" });
                };
        };
};
