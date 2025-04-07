import {Car} from "./Car";
import Roads from "./Road";
import Sensor from "./Sensor";


const	canvas = document.getElementById("myCanvas") as HTMLCanvasElement;

canvas!.width = 200;
const	ctx = canvas.getContext("2d");

if (ctx === null) {
	alert("No context here!");
} else {
  const	road = new Roads(canvas.width / 2, canvas.width * 0.9);
  const traffic: Car[] = [
    new Car(road.getLaneCenter(1), 100, 30, 50, "DUMMY", 2),
  ]
	const	car = new Car(road.getLaneCenter(2), 100, 30, 50, "KEYS");
	animate();
	function animate() {
    for (let i = 0; i < traffic.length; i++) {
      traffic[i].update(road.borders, []);
    }
		car.update(road.borders, traffic);
		canvas.height = window.innerHeight;

		ctx?.save();
		ctx?.translate(0, -car.y + canvas.height * 0.7);

		road.draw(ctx!);
    for (let i = 0; i < traffic.length; i++) {
      traffic[i].draw(ctx!, "red");
    }
    car.draw(ctx!);//si la voiture est draw en dernier, les rayons seront sur les autres voitures mais si dessinee avant alors les rayons passent en dessous

		ctx?.restore();
		requestAnimationFrame(animate);
	};
};
