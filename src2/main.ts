import { Graph } from "./math/Graph";
import { Point } from "./primitives/Point";
import { Segment } from "./primitives/Segment";

const myCanvas = document.getElementById("myCanvas") as HTMLCanvasElement;

myCanvas!.width = 600;
myCanvas!.height = 600;

const ctx = myCanvas.getContext("2d");

const points = [
  new Point(50, 80),
  new Point(20, 500),
  new Point(500, 200),
]

const segments = [
  new Segment(points[0], points[1]),
]

const graph = new Graph(points, segments);

graph.draw(ctx!)
