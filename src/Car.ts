import Controls from "./Controls";
import Sensor from "./Sensor";
import { getIntersection, polysIntersect } from "./Utils";

class	Car {
	x: number;
	y: number;
	width: number;
	height: number;
	speed: number;
	acceleration: number;
	friction: number;
	angle: number;
	maxSpeed: number;
	controls: Controls;
  sensor: Sensor;
  polygon: {x: number, y: number}[];
  damaged: boolean;

	constructor(x: number, y: number, width: number, height: number)
	{
		this.x = x
		this.y = y;
		this.width = width;
		this.height = height;
		this.speed = 0;
		this.acceleration = 0.2;
		this.maxSpeed = 3;
		this.friction= 0.05;
		this.angle = 0;;
    this.polygon = [];
    this.damaged = false;

		this.controls = new Controls();
    this.sensor = new Sensor(this);
    this.createPolygon();
	};

  createPolygon()
  {
    const points = [];
    const rad = Math.hypot(this.width, this.height) / 2;
    const alpha = Math.atan2(this.width, this.height);
    //right up corner
    points.push({
      x: this.x - Math.sin(this.angle - alpha) * rad,
      y: this.y - Math.cos(this.angle - alpha) * rad
    });
    //left up corner
    points.push({
      x: this.x - Math.sin(this.angle + alpha) * rad,
      y: this.y - Math.cos(this.angle + alpha) * rad
    });
    //right down corner
    points.push({
      x: this.x - Math.sin(Math.PI + this.angle - alpha) * rad,
      y: this.y - Math.cos(Math.PI + this.angle - alpha) * rad
    });
    //left down corner
    points.push({
      x: this.x - Math.sin(Math.PI + this.angle + alpha) * rad,
      y: this.y - Math.cos(Math.PI + this.angle + alpha) * rad
    });
    return points;
  }

	update(roadBorders: {x: number, y:number}[][])
	{
    if (!this.damaged) {
      this.#move();
      this.polygon = this.createPolygon();
      this.damaged = this.#assessDamage(roadBorders);
    };
    this.sensor.update(roadBorders);
	};

  #assessDamage(roadBorders: {x: number, y:number}[][])
  {
    for (let i = 0; i < roadBorders.length; i++) {
      if (polysIntersect(this.polygon, roadBorders[i])) {
        return true;
      };
    };
    return false;
  }

	#move()
	{
		if (this.controls.forward){
			this.speed += this.acceleration;
		}

		if (this.controls.reverse){
			this.speed -= this.acceleration;
		}

		if (this.speed > this.maxSpeed){
			this.speed = this.maxSpeed;
		}

		if (this.speed < -this.maxSpeed / 2){
			this.speed = -this.maxSpeed / 2;
		}

		if (this.speed > 0){
			this.speed -= this.friction;
		}
		if (this.speed < 0){
			this.speed += this.friction;
		}
		if (Math.abs(this.speed) < this.friction){
			this.speed = 0;
		}

		if (this.speed != 0){
			const flip = this.speed > 0 ? 1 : -1;
			if (this.controls.left) {
				this.angle += 0.03 * flip;
			}
			if (this.controls.right) {
				this.angle -= 0.03 * flip;
			}
		}

		this.x -= Math.sin(this.angle) * this.speed;
		this.y -= Math.cos(this.angle) * this.speed;
	}

	draw(ctx: CanvasRenderingContext2D)
	{
    ctx.fillStyle = this.damaged ? "red" : "black";
    ctx.beginPath();
    ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
    for (let i = 1; i < this.polygon.length; i++) {
      ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
    }
    ctx.fill();
    this.sensor.draw(ctx);
	};
};

export default Car;
