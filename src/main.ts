import { Car } from "./Car";
import { NeuralNetwork } from "./Network";
import Roads from "./Road";
import { Visualizer } from "./Visualizer";

const	carCanvas = document.getElementById("carCanvas") as HTMLCanvasElement;
const	networkCanvas = document.getElementById("networkCanvas") as HTMLCanvasElement;
const	carCtx = carCanvas.getContext("2d");
const	networkCtx = networkCanvas.getContext("2d");

carCanvas!.width = 200;
networkCanvas.width = 300;


const	road = new Roads(carCanvas.width / 2, carCanvas.width * 0.9, 3);
const N = 1000;
const	cars = generateCars(N);
const traffic=[
  new Car(road.getLaneCenter(1),-100,30,50,"DUMMY",2),
  new Car(road.getLaneCenter(0),-300,30,50,"DUMMY",2),
  new Car(road.getLaneCenter(2),-300,30,50,"DUMMY",2),
  new Car(road.getLaneCenter(0),-500,30,50,"DUMMY",2),
  new Car(road.getLaneCenter(1),-500,30,50,"DUMMY",2),
  new Car(road.getLaneCenter(1),-700,30,50,"DUMMY",2),
  new Car(road.getLaneCenter(2),-700,30,50,"DUMMY",2),
];

let bestCar = cars[0];
if (localStorage.getItem("bestBrain")) {
  console.log("hghh");
  
  for (let i = 0; i < cars.length; i++) {
    cars[i].brain = JSON.parse(localStorage.getItem("bestBrain")!);
    if (i != 0) {
      //au dessus on change le brain de chaque car a partir du cerveau me mieux avec des valeurs random et on affine celui ci avec la fonction mutate et une valeur petite amount
      NeuralNetwork.mutate(cars[i].brain!, 0.1);
    }
  }
}
animate();

function save()
{
  localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
}

function discard()
{
  localStorage.removeItem("bestBrain");
}

(window as any).save = save;
(window as any).discard = discard;


function generateCars(N: number)
{
  const cars: Car[] = [];
  while (N > 0) {
    cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, "AI", 4));
    N--;
  }
  return cars;
}


function animate() {
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []);
  }

  for (let i = 0; i < cars.length; i++) {
    cars[i].update(road.borders, traffic);
  }

  bestCar = cars.find(c => c.y == Math.min(...cars.map(c => c.y)))!;

  carCanvas.height = window.innerHeight;
  networkCanvas.height = window.innerHeight;

  carCtx?.save();
  carCtx?.translate(0, -bestCar!.y + carCanvas.height * 0.7);

  road.draw(carCtx!);
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(carCtx!, "red");
  }
  carCtx!.globalAlpha = 0.2;
  for (let i = 0; i < cars.length; i++) {
    cars[i].draw(carCtx!, "blue", );//si la voiture est draw en dernier, les rayons seront sur les autres voitures mais si dessinee avant alors les rayons passent en dessous
  }
  carCtx!.globalAlpha = 1;
  bestCar!.draw(carCtx!, "blue", true);
  carCtx?.restore();

  Visualizer.drawNetwork(networkCtx!, bestCar!.brain!);

  requestAnimationFrame(animate);
};

