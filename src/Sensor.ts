import { Car } from "./Car";
import { getIntersection, lerp } from "./Utils";

class Sensor {
  car: Car;
  rayCount: number;
  rayLenght: number;
  raySpread: number;
  rays: [{x: number, y: number}, {x: number, y: number}][];
  readings: ({x: number, y:number, offset:number} | null)[];

  constructor(car: Car) {
    this.car = car;
    this.rayCount = 5;
    this.rayLenght = 150;
    this.raySpread = Math.PI/2;//90deg en radian
    this.rays = [];
    this.readings = [];
  };

  update(roadBorders: {x: number, y:number}[][], traffic: Car[])
  {
    this.#castRays();
    this.readings = [];
    for (let i = 0; i < this.rayCount; i++) {
      this.readings.push(
        this.#getReadings(this.rays[i], roadBorders, traffic)
      );
    };
  };

  #getReadings(ray: [{x: number, y: number}, {x: number, y: number}], roadBorders: {x: number, y:number}[][], traffic: Car[])
  {
    let touches = [];
    for (let i = 0; i < roadBorders.length; i++) {
      const touch = getIntersection(
        ray[0],
        ray[1],
        roadBorders[i][0],
        roadBorders[i][1]
      )
      if (touch) {
        touches.push(touch);
      };
    };
    for (let i = 0; i < traffic.length; i++) {
      for (let j = 0; j < traffic[i].polygon.length; j++) {
        const touch = getIntersection(
          ray[0],
          ray[1],
          traffic[i].polygon[j],
          traffic[i].polygon[(j + 1) % traffic[i].polygon.length]
        )
        if (touch) {
          touches.push(touch);
        };
      };
    };

    if (touches.length == 0) {
      return null;  // retourne null au lieu de undefined
    } else {
      const offset = touches.map(e => e.offset);
      const minOffset = Math.min(...offset);
      return touches.find(e => e.offset == minOffset) || null;  // assure qu'on retourne null si find échoue
    }
  };

  #castRays()
  {
    this.rays = [];

    for (let i = 0; i < this.rayCount; i++) {
      //pour chaque rayon, il faut definir l'angle de départ et l'angle d'arrivée si le nombre de rayon est egal à 1 alors il faut que l'angle de départ 
      const rayAngle = lerp(this.raySpread / 2, -this.raySpread / 2, this.rayCount == 1 ? 0.5 : i / (this.rayCount - 1)) + this.car.angle;
      const start = {x: this.car.x, y: this.car.y};
      const end = {
        x: this.car.x - (Math.sin(rayAngle) * this.rayLenght),//Il faut penser à la trigonométrie avec le cercle et les valeur des angles en radian pi/2, pi/4, pi/3...
        y: this.car.y - (Math.cos(rayAngle) * this.rayLenght)//et les,valeurs de sin et cos en fonction de l'angle pour trouver les coordonnées des points
        //le point de fin du rayon est donc le point de départ MOINS la valeur de sin ou cos en fonction de l'angle, MOINS car le rayon est tracé vers le haut de l'écran
        //PLUS orienterai le rayon vers le bas de l'écran
      };

      this.rays.push([start, end]);
    };
  };

  draw(ctx: CanvasRenderingContext2D)
  {
    //ray structure [start, end]
    for (let i = 0; i < this.rayCount; i++) {
      let end = this.rays[i][1];
      if (this.readings[i]) {  // vérifie si la lecture n'est pas null
        end = this.readings[i]!;  // le ! indique à TypeScript que la valeur n'est pas null
      }
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "yellow";
      ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "black";
      ctx.moveTo(this.rays[i][1].x, this.rays[i][1].y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
    };
  }
};

export default Sensor;
