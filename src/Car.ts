import Controls from "./Controls";
import { NeuralNetwork } from "./Network";
import Sensor from "./Sensor";
import { polysIntersect } from "./Utils";

export class Car {
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
  sensor: Sensor | null = null;
  polygon: {x: number, y: number}[];
  damaged: boolean;
  brain: NeuralNetwork | null = null;
  useBrain: boolean;

	constructor(x: number, y: number, width: number, height: number, controlType: string, maxspeed: number = 2)
	{
		this.x = x
    this.y = y;
		this.width = width;
		this.height = height;
		this.speed = 0;
		this.acceleration = 0.2;
		this.maxSpeed = maxspeed;
		this.friction= 0.05;
		this.angle = 0;;
    this.polygon = [];
    this.damaged = false;
    this.controls = new Controls(controlType);
    this.useBrain = controlType=="AI";
    
    if (controlType != "DUMMY") {
      this.sensor = new Sensor(this);
      this.brain = new NeuralNetwork([this.sensor!.rayCount, 6, 4] );//ici on passe le nombre de rayon, une couche intermediaire de sixx neurones et on attendra le resultat soit le derniere couche de 4 neurones  haut bas gauche droite
    }

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

	update(roadBorders: {x: number, y:number}[][], traffic: Car[])
	{
    if (!this.damaged) {
      this.#move();
      this.polygon = this.createPolygon();
      this.damaged = this.#assessDamage(roadBorders, traffic);
    };
    if (this.sensor) {
      this.sensor.update(roadBorders, traffic);
      const offsets = this.sensor.readings.map(sensor => sensor==null ? 0 : 1 - sensor!.offset);
      const outputs = NeuralNetwork.feedForward(offsets, this.brain!);

      if (this.useBrain) {
        this.controls.forward = outputs[0];
      };
    };
	};

  #assessDamage(roadBorders: {x: number, y:number}[][], traffic: Car[])
  {
    for (let i = 0; i < roadBorders.length; i++) {
      if (polysIntersect(this.polygon, roadBorders[i])) {
        return true;
      };
    };
    for (let i = 0; i < traffic.length; i++) {
      if (polysIntersect(this.polygon, traffic[i].polygon)) {
        return true;
      };
    };
    return false;
  };

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

	draw(ctx: CanvasRenderingContext2D, color: string = "blue")
	{
    ctx.fillStyle = this.damaged ? "gray" : color;
    ctx.beginPath();
    ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
    for (let i = 1; i < this.polygon.length; i++) {
      ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
    }
    ctx.fill();
    if (this.sensor) {
      this.sensor.draw(ctx);
    };
	};
};
