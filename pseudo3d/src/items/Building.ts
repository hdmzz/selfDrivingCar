import { Point } from "../primitives/Point";
import { Polygon } from "../primitives/Polygon";
import { add, average, getFake3DPoints, scale, subtract } from "../utils/utils";
import { Item } from "./Items";

export class Building implements Item {
        constructor( public base: Polygon, public height: number = 200 ) {};
    
        draw( ctx: CanvasRenderingContext2D, viewPoint: Point )
        {
                const topPoints = this.base.points.map(( p ) =>
                        getFake3DPoints( p, viewPoint, this.height * 0.6 )
                )
                const ceiling = new Polygon( topPoints );
                
                const sides: Array<Polygon> = [];
                for ( let i = 0; i < this.base.points.length; i++ ) {
                        const nextI = ( i + 1 ) % this.base.points.length;
                        const poly = new Polygon([ this.base.points[i], this.base.points[nextI], topPoints[nextI], topPoints[i] ]);
                        sides.push( poly );
                }
                const baseMidPoint = [
                        average( this.base.points[0], this.base.points[1] ),
                        average( this.base.points[2], this.base.points[3] )
                ];

                const topMidPoints = baseMidPoint.map(( p ) =>
                        getFake3DPoints( p, viewPoint, this.height )
                )

                const roofPoly = [
                        new Polygon([ceiling.points[3], ceiling.points[0], topMidPoints[0], topMidPoints[1]]),
                        new Polygon([ceiling.points[1], ceiling.points[2], topMidPoints[1], topMidPoints[0]])
                ];

                sides.sort(( a, b ) => b.distanceToPoint( viewPoint ) - a.distanceToPoint( viewPoint ));
                this.base.draw( ctx, { fill: "white", stroke: "#AAA" });
                for ( const side of sides ) {
                        side.draw( ctx, { fill: "white", stroke: "#AAA" });
                }
                ceiling.draw( ctx, { fill: "white", stroke: "#AAA" });

                roofPoly.sort(( a, b ) => b.distanceToPoint( viewPoint ) - a.distanceToPoint( viewPoint ));
                for ( const poly of roofPoly) {
                        poly.draw( ctx, { fill: "red", stroke: "#AAA"})
                }
        };
};
