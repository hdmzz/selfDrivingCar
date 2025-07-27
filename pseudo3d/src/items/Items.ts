import { Point } from "../primitives/Point";
import { Polygon } from "../primitives/Polygon";

export interface Item {
        base: Polygon;
        draw( ctx: CanvasRenderingContext2D, viewpoint: Point): void;
}
