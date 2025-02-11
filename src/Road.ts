import { lerp } from "./Utils";

class	Roads {
	x: number;
	width: number;
	laneCount: number;
	left: number;
	right: number;
	top: number;
	bottom: number;
	borders: {x: number, y:number}[][]
    
    /**
     * 
     * @param x est le canvas width / 2, ou le milieu du canvas
     * @param width est le canvas widht * 0.9 ou 90% de la largeur du canvas
     * @param laneCount le lanecount est le nombre de voies sur la route
     */
	constructor(x: number, width: number, laneCount: number = 4)
    {
		this.x = x;
		this.width = width;
		this.laneCount = laneCount;//nombre de voies

		this.left = x - width / 2;
		this.right = x + width / 2;

		const	infinity = 1000000;
		this.top = -infinity;
		this.bottom = infinity;

		const	topLeft = {x:this.left,y:this.top};
		const	topRight = {x:this.right,y:this.top};
		const	bottomLeft = {x:this.left,y:this.bottom};
		const	bottomRight = {x:this.right,y:this.bottom};

		this.borders = [
			[topLeft,bottomLeft],
			[topRight,bottomRight]
		];
	};

	getLaneCenter(laneIndex: number)
	{
		const laneWidth = this.width / this.laneCount;
		return this.left + laneWidth/2 + Math.min(laneIndex, this.laneCount-1)*laneWidth;
	};
    /**
     * 
     * @param ctx le context du canvas 2d
     * @function lerp donne une valeur entre 2 autres valeurs
     * ici elle est utilisée pour trouver 
     */
	draw(ctx: CanvasRenderingContext2D)
	{
		ctx.lineWidth=5;
		ctx.strokeStyle="white";

		for(let i = 1; i <= this.laneCount - 1; i++) {
			const x = lerp(
				this.left,
				this.right,
				i / this.laneCount,
			);

			ctx.setLineDash([20,20]);
			ctx.beginPath();
			ctx.moveTo(x,this.top);
			ctx.lineTo(x,this.bottom);
			ctx.stroke();
		}

		ctx.setLineDash([]);
		this.borders.forEach(border=>{
			ctx.beginPath();
			ctx.moveTo(border[0].x,border[0].y);
			ctx.lineTo(border[1].x,border[1].y);
			ctx.stroke();
		});
	};

};

export default Roads;
