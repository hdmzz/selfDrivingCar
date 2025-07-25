import { Graph } from "./math/Graph";
import { Point } from "./primitives/Point";
import { Segment } from "./primitives/Segment";
import { getNearestPoint } from "./utils/utils";
import { Viewport } from "./Viewport";

export class GraphEditor {
    ctx: CanvasRenderingContext2D;
    selected: Point | null;
    hovered: Point | null;
    dragging: boolean;
    viewport: Viewport;
    graph: Graph;
    mouse: Point;

    constructor(viewport: Viewport, graph: Graph)
    {
        this.viewport = viewport;
        this.graph = graph;
        this.ctx = this.viewport.ctx;
        this.selected = null;
        this.hovered = null;
        this.dragging = false;
        this.#addEventListener();
    };

    #addEventListener()
    {
        this.viewport.canvas.addEventListener("mousedown", this.#handleMouseDown.bind(this));
        this.viewport.canvas.addEventListener("mousemove", this.#handleMouseMove.bind(this));
        this.viewport.canvas.addEventListener("mouseup", () => this.dragging = false);
    }
    
    #handleMouseMove(e: MouseEvent): void
    {
        this.mouse = this.viewport.getMouse(e);
        this.hovered = getNearestPoint(this.mouse, this.graph.points, 10);
        if (this.dragging === true) {
            this.selected!.x = this.mouse.x
            this.selected!.y = this.mouse.y
        }
    }

    #handleMouseDown(e: MouseEvent): void
    {
        if (e.button === 2) {//right click
            if (this.hovered)
                this.#removePoint(this.hovered!)
            else if (!this.hovered)
                this.selected = null;
            return;
        }
        if (e.button === 0) {//left click
            if (this.viewport.drag.active === true) {
                return;
            };
            this.mouse = this.viewport.getMouse(e);
            this.hovered = getNearestPoint(this.mouse, this.graph.points, 10);
            if (this.hovered) {
                this.#select(this.hovered);
                this.dragging = true;
                return;    
            }
            this.graph.addPoint(this.mouse);
            this.#select(this.mouse)
            return;
        }
 
        if (this.hovered) {
            this.selected = this.hovered;
            return;
        }
    }
        
    #select(point: Point)
    {
        if (this.selected)
            this.graph.tryAddSegment(this.selected, point);
        this.selected = point;
    }

    #removePoint(point: Point)
    {
        this.graph.removePoint(point);
        this.selected = null;
        this.hovered = null
    }
    dispose()
    {
        this.graph.dispose();
        this.selected = null;
        this.hovered = null;
    }

    display()
    {
        this.graph.draw(this.ctx);
        this.hovered?.draw(this.ctx, {fill: true});
        if (this.selected) {
            const intent = this.hovered ? this.hovered : this.mouse;//cette ligne pour que le segment stick au point le plus proche
            new Segment(this.selected, intent).draw(this.ctx, {dash: [3, 3]});
            this.selected.draw(this.ctx, {outline: true})
        }
    }
}
