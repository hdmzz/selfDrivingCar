import { Point } from "../primitives/Point";
import { Polygon } from "../primitives/Polygon";

export abstract class WorldItem {
    abstract draw( ctx: CanvasRenderingContext2D, viewPoint: Point ): void;
};
