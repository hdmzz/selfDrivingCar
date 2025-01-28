import Car from "./Car";

const	canvas = document.getElementById("myCanvas") as HTMLCanvasElement;

canvas!.width = 200;
const	ctx = canvas.getContext("2d");

if (ctx === null) {
	alert("No context here!");
} else {
	const	car = new Car(100, 100, 30, 50);
	animate();
	function animate() {
		car.update();
		canvas.height = window.innerHeight;
		car.draw(ctx!);
		requestAnimationFrame(animate);
	};
};
