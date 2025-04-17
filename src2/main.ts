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

graph.draw(ctx!);

function addRandomPoint()
{
    const success = graph.tryAddPoint(new Point(Math.random() * myCanvas.width, Math.random() * myCanvas.height));
    ctx!.clearRect(0, 0, myCanvas.width, myCanvas.height);
    graph.draw(ctx!);
    console.log("Point: ", success);
}

function addRandomSegment()
{
    const index1 = Math.floor(Math.random() * graph.points.length);
    const index2 = Math.floor(Math.random() * graph.points.length);
    const p1 = graph.points[index1];
    const p2 = graph.points[index2];
    const success = graph.tryAddSegment(p1, p2);
    ctx!.clearRect(0, 0, myCanvas.width, myCanvas.height);
    graph.draw(ctx!);
    console.log("Seg : ", success);
}

function removeRandomSegment()
{
    const index = Math.floor(Math.random() * graph.segments.length);
    const segToDel = graph.segments[index];
    const success = graph.tryRemoveSegment(segToDel);   
    ctx!.clearRect(0, 0, myCanvas.width, myCanvas.height);
    graph.draw(ctx!);
    console.log("RemoveSeg : ", success);
}

function removeRandomPoint()
{
    if (graph.points.length === 0) {
        console.log("No Points");
        return;
    }
    const index = Math.floor(Math.random() * graph.points.length);
    const point = graph.points[index];

    const success = graph.tryRemoveRandomPoint(point);
    ctx!.clearRect(0, 0, myCanvas.width, myCanvas.height);
    graph.draw(ctx!);
    console.log("Remove Seg : ", success);
}

(window as any).addRandomPoint = addRandomPoint;
(window as any).addRandomSegment = addRandomSegment;
(window as any).removeRandomSegment = removeRandomSegment;
(window as any).removeRandomPoint = removeRandomPoint;
