import { Point } from "./primitives/Point";
import { add, scale, subtract } from "./utils/utils";

interface dragType {
    start: Point;
    end: Point;
    offset: Point;
    active: boolean;
}

export class Viewport {
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    zoom: number = 1;
    center: Point;
    offset: Point;
    drag: dragType;

    constructor(canvas: HTMLCanvasElement){
        this.canvas =  canvas;
        this.ctx = canvas.getContext("2d")!;
        this.center = new Point(0, 0);  
        this.offset = scale(this.center, -1);
        
        this.drag = {
            start: new Point(0,0),
            end: new Point(0,0),
            offset: new Point(0,0),
            active: false,
        }
        
        this.#addEventListener();
    };

    #addEventListener()
    {
        this.canvas.addEventListener( "mousewheel", this.#handleMouseWheel.bind( this ));
        this.canvas.addEventListener( "mousedown", this.#handleMouseDown.bind( this ));
        this.canvas.addEventListener( "mousemove", this.#handleMouseMove.bind( this ));
        this.canvas.addEventListener( "mouseup", this.#handleMouseUp.bind( this ));
    };

    #handleMouseWheel( e: WheelEvent )
    {
        e.preventDefault();
        e.stopPropagation();
        const dir = Math.sign( e.deltaY )
        const step = 0.1;
        this.zoom += dir * step;
        this.zoom = Math.max( 1, Math.min( 5, this.zoom ));
    };

    #handleMouseDown( e: MouseEvent ) {
        if ( e.button === 0 && e.ctrlKey === true ) { 
           this.drag.start = this.getMouse( e );
           this.drag.active = true;
        };
    };

    #handleMouseMove( e: MouseEvent )
    {
        if ( this.drag.active ) {
            this.drag.end = this.getMouse( e );
            this.drag.offset = subtract( this.drag.end, this.drag.start );
        };
    };

    #handleMouseUp( e: MouseEvent )
    {
        if (this.drag.active) {
            this.offset = add( this.offset, this.drag.offset );
            this.drag = {
               start: new Point( 0, 0 ),
               end: new Point( 0, 0 ),
               offset: new Point( 0, 0 ),
               active: false
            };
        };
    };

    reset()
    {
        this.ctx.restore();
        this.ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height );
        this.ctx.save();
        this.ctx.translate(this.center.x, this.center.y);
        this.ctx.scale(1 / this.zoom, 1 / this.zoom);
        const offset = this.getOffset();
        this.ctx.translate(offset.x, offset.y);
    };

    getMouse( e: MouseEvent , subtractDragOffset: boolean = false)
    {
        const p = new Point(
            ( e.offsetX - this.center.x ) * this.zoom - this.offset.x,
            ( e.offsetY - this.center.y ) * this.zoom - this.offset.y,
        );

        return subtractDragOffset ? subtract( p, this.drag.offset ) : p;
    };

    getOffset() {
        return add( this.offset, this.drag.offset );
    };
};
