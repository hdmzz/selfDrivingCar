import { Point } from "../primitives/Point";
import { Segment } from "../primitives/Segment";

export class Graph {
    constructor(public points: Point[], public segments: Segment[]){};

    draw(ctx: CanvasRenderingContext2D) {
        for (const point of this.points) {
        point.draw(ctx);
        }
        for (const seg of this.segments) {
        seg.draw(ctx);
        }
    }

    dispose()
    {
        this.points.length = 0
        this.segments.length = 0
    }

    getSegmentWithPoint(point): Segment[]
    {
        const segs:Segment[] = [];

        for (const seg of this.segments) {
            if (seg.includes(point))
                segs.push(seg);
        }

        return segs;
    }

    addPoint(point: Point): boolean
    {
        this.points.push(point);
        return true;
    }

    removePoint(point: Point): boolean
    {
        const segs = this.getSegmentWithPoint(point);

        if (!this.containsPoint(point))
            return false;

        for (const seg of segs) {
            this.removeSegment(seg);
        }
        this.points.splice(this.points.indexOf(point), 1);

        return (true); 
    }

    tryRemoveRandomPoint(point: Point): boolean
    {
        if (!this.containsPoint(point))
            return false;

        return (this.removePoint(point));
    }

    containsPoint(point: Point)
    {
        return (this.points.find((p) => p.equals(point)))
    }

    tryAddPoint(point: Point): boolean
    {
        if (this.containsPoint(point))
            return false;
        return this.addPoint(point);;
    }

    addSegment(segment: Segment): boolean
    {
        this.segments.push(segment);

        return true;
    }

    removeSegment(segment: Segment): boolean
    {
        this.segments.splice(this.segments.indexOf(segment), 1);
        return true;
    }

    containsSegment(segment: Segment)
    {
        return (this.segments.find((s) => s.equals(segment)));
    }

    tryAddSegment(p1: Point, p2: Point): boolean 
    {
        const newSeg = new Segment(p1, p2);
        if (this.containsSegment(newSeg) || p1.equals(p2))
            return false

        return (this.addSegment(newSeg));
    }

    tryRemoveSegment(segToDel: Segment): boolean
    {
        if (!this.containsSegment(segToDel) || segToDel.p1.equals(segToDel.p2))
            return false;

        return this.removeSegment(segToDel);
    }
};
