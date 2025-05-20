import { angle, subtract, translate } from "../utils/utils";
import { Point } from "./Point";
import { Polygon } from "./Polygon";
import { Segment } from "./Segment";

export class Envelope {
    skeleton:   Segment;
    poly:       Polygon;

    /**
     * @param skeleton
     * @param roadWidth 
     * @param roudness 
    */
    constructor(skeleton: Segment, width: number, roudness: number = 1)
    {
        if (skeleton === undefined)
            return;
        this.skeleton = skeleton;
        this.poly = this.#generatePolygon(width, roudness);
    };

    #generatePolygon(width: number, roundness: number)
    {
        const { p1, p2 } = this.skeleton;
        const radius = width / 2;
        const alpha = angle(subtract(p1, p2));
        const alpha_cw = alpha + Math.PI / 2;//clockwise
        const alpha_ccw = alpha - Math.PI / 2;//counterclockwise        
        const points: Point[] = [];
        const step = Math.PI / Math.max(1, roundness);
        const eps = step / 2;

        for (let i = alpha_ccw; i <= alpha_cw + eps; i += step) {
           points.push(translate(p1, i, radius));
        };

        for (let i = alpha_ccw; i <= alpha_cw + eps; i += step) {
           points.push(translate(p2, Math.PI + i, radius));
        };
  
        return new Polygon(points);
    };

    draw(ctx: CanvasRenderingContext2D, options: {} = {})
    {
        if (this.poly?.points.length === 0 || this.skeleton === undefined)
            return;
        this.poly.draw(ctx, options);
    };
};
