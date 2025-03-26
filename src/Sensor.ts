import Car from "./Car";
import { lerp } from "./Utils";

class Sensor {
    car: Car;
    rayCount: number;
    rayLenght: number;
    raySpread: number;
    rays: [{x: number, y: number}, {x: number, y: number}][];

    constructor(car: Car) {
        this.car = car;
        this.rayCount = 4;
        this.rayLenght = 150;
        this.raySpread = Math.PI/2;
        this.rays = [];
    };

    update(roadBorders: {x: number, y:number}[][])
    {
        //dabord definir les rayons
        this.#castRays();

        console.log(this.rays);
    };

    #getReadings(ray: [number, number] ,roadBorders: {x: number, y:number}[][])
    {
        return 0;
    };

    #castRays()
    {
        this.rays = [];

        for (let i = 0; i < this.rayCount; i++) {
            const rayAngle = lerp(this.raySpread / 2, -this.raySpread / 2, this.rayCount == 1 ? 0.5 : i / (this.rayCount - 1)) + this.car.angle;
            const start = {x: this.car.x, y: this.car.y};
            const end = {
                x: this.car.x - (Math.sin(rayAngle) * this.rayLenght),
                y: this.car.y - (Math.cos(rayAngle) * this.rayLenght)
            };

            this.rays.push([start, end]);
        };

    };

    draw(ctx: CanvasRenderingContext2D)
    {
        return 0;
    };

};

export default Sensor;
