import { average, getIntersection } from "../utils/utils";
import { NonNullableArray } from "../World";
import { Point } from "./Point";
import { Segment } from "./Segment";

export class Polygon {
    points: NonNullableArray<Point>;
    segments: NonNullableArray<Segment>;

    constructor(points: Point[])
    {
        this.points = points;
        this.segments = [];

        for ( let i = 1; i <= points.length; i++ ) {
            this.segments.push(new Segment(points[i - 1], this.points[i % points.length]));
        };
    };

    distanceToPoint( point: Point )
    {
        return Math.min(...this.segments.map((s) => s.distanceToPoint(point)));
    };

    distanceToPoly( poly: Polygon )
    {
        return Math.min(...this.points.map((p) => poly.distanceToPoint(p)));
    };

    /**
     * Le but de cette fonction est de savoir si un des segments de ce polygon,
     * de cette instance de la classe Polygon, coupe un des segments de @argument poly
     */
    intersectsPolygon( poly: Polygon )
    {
        for ( const seg1 of this.segments ) {
            for ( const seg2 of poly.segments ) {
                if ( getIntersection( seg1.p1, seg1.p2, seg2.p1, seg2.p2 )) {
                    return ( true );
                }
            };
        };

        return ( false );
    };

    static union( polys: Polygon[] )
    {
        Polygon.multiBreak( polys );
        const keptSegments: Segment[] = [];

        for (  let i = 0; i < polys.length; i++  ) {
            for (  const seg of polys[i].segments  ) {
                let keep = true;
                for (  let j = 0; j < polys.length; j++  ) {
                    if ( i != j ) {
                        if ( polys[j].containsSegment( seg )) {
                            keep = false;
                            break;
                        };
                    };
                };
                if ( keep && seg !== undefined ) {
                    keptSegments.push( seg );
                };
            };
        };
        
        return ( keptSegments );
    }

    static multiBreak( polys: Polygon[] )
    {
        for ( let i = 0; i < polys.length - 1; i++ ) {//polys lenght - 1 car on repasserai sur l e dernier
            for ( let j = i + 1; j < polys.length; j++ ) {
                Polygon.break(polys[i], polys[j]);
            };
        };
    }

    static break( poly1: Polygon, poly2: Polygon )
    {
        const segs1 = poly1.segments;
        const segs2 = poly2.segments;

        for ( let i = 0; i < segs1.length; i++ ) {
            for ( let j = 0; j < segs2.length; j++ ) {
                if ( !segs1[i] || !segs2[j] ) continue;
                const int = getIntersection(
                    segs1[i].p1,
                    segs1[i].p2,
                    segs2[j].p1,
                    segs2[j].p2,
                );

                if ( int && int.offset != 1 && int.offset != 0 ) {
                    const point = new Point( int.x, int.y );
                    let aux = segs1[i].p2;
                    segs1[i].p2 = point;//remplace le dernier point du segment par le point d'intersection;
                    segs1.splice( i + 1, 0, new Segment( point, aux ));//on creer un nouveaux segments entre le point d'intersection et le point "apres", puisnil faut faire pareil pour le segment 2
                    aux = segs2[j].p2;
                    segs2[j].p2 = point;//a ce stade les segment s'intersectant se rejoignent au point d'intersection point il faut rajouter un segment entre point et segs2[j].p2 ou aux
                    //juste apres le segment ré arrangé
                    segs2.splice( j + 1, 0, new Segment( point, aux ));
                };
            };
        };
    };

    containsSegment( seg: Segment )
    {
        if ( !seg ) return false;
        const midpoint = average( seg.p1, seg.p2 );
        return this.containsPoint( midpoint );
    };

    containsPoint( point: Point )
    {
        const outerPoint = new Point( -1000, -1000 );
        let intersectionCount = 0;
        for ( const seg of this.segments ) {
            if ( !seg ) continue;
            const int = getIntersection( outerPoint, point, seg.p1, seg.p2 );
            if ( int ) {
                intersectionCount++;
            };
        };
        return ( intersectionCount % 2 == 1 );
    };

    draw(ctx: CanvasRenderingContext2D, {stroke = "blue", lineWidth = 2, fill = "rgba(0, 0, 255, 0.3)"} = {})
    { 
        if (this.points.length === 0)
            return;
        ctx.beginPath();
        ctx.fillStyle = fill;
        ctx.strokeStyle = stroke;
        ctx.lineWidth = lineWidth;
        ctx.moveTo(this.points[0].x, this.points[0].y);

        for ( let i = 1; i < this.points.length; i++ ) {
            ctx.lineTo(this.points[i].x, this.points[i].y);
        };

        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    };
};
