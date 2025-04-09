import { Car } from "./Car";
import Roads from "./Road";
import { Visualizer } from "./Visualizer";

const	carCanvas = document.getElementById("carCanvas") as HTMLCanvasElement;
const	networkCanvas = document.getElementById("networkCanvas") as HTMLCanvasElement;
const	carCtx = carCanvas.getContext("2d");
const	networkCtx = networkCanvas.getContext("2d");

carCanvas!.width = 200;
networkCanvas.width = 300;

if (carCtx === null) {
	alert("No context here!");
} else {
  const	road = new Roads(carCanvas.width / 2, carCanvas.width * 0.9, 3);
	const	car = new Car(road.getLaneCenter(1), 100, 30, 50, "AI", 4);
  const traffic: Car[] = [
    new Car(road.getLaneCenter(1), 20, 30, 50, "DUMMY", 3),
  ]

	animate();

	function animate() {
    for (let i = 0; i < traffic.length; i++) {
      traffic[i].update(road.borders, []);
    }
		car.update(road.borders, traffic);
		carCanvas.height = window.innerHeight;
		networkCanvas.height = window.innerHeight;

		carCtx?.save();
		carCtx?.translate(0, -car.y + carCanvas.height * 0.7);

		road.draw(carCtx!);
    for (let i = 0; i < traffic.length; i++) {
      traffic[i].draw(carCtx!, "red");
    }
    car.draw(carCtx!);//si la voiture est draw en dernier, les rayons seront sur les autres voitures mais si dessinee avant alors les rayons passent en dessous

		carCtx?.restore();

    Visualizer.drawNetwork(networkCtx!, car.brain!);

		requestAnimationFrame(animate);
	};
};
