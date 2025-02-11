import Car from "./Car";
import Roads from "./Road";

const	canvas = document.getElementById("myCanvas") as HTMLCanvasElement;

canvas!.width = 200;
const	ctx = canvas.getContext("2d");

if (ctx === null) {
	alert("No context here!");
} else {
	const	road = new Roads(canvas.width / 2, canvas.width * 0.9);
	const	car = new Car(road.getLaneCenter(3), 100, 30, 50);
	animate();
	function animate() {
		car.update();
		canvas.height = window.innerHeight;
		ctx?.save();
		ctx?.translate(0, -car.y + canvas.height * 0.7);

		road.draw(ctx!);
		car.draw(ctx!);

		ctx?.restore();
		requestAnimationFrame(animate);
	};
};
