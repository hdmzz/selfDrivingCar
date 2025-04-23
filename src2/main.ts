import { GraphEditor } from "./GraphEditor";
import { Graph } from "./math/Graph";
import { Point } from "./primitives/Point";
import { Segment } from "./primitives/Segment"; 
import { Viewport } from "./Viewport";

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

const graphString = localStorage.getItem("graph");
console.log(graphString);
const graphInfo = graphString ? JSON.parse(graphString) : null;
console.log(graphInfo);

const graph = graphInfo ? Graph.load(graphInfo) : new Graph(points, segments);
const viewPort = new Viewport(myCanvas);
const graphEditor = new GraphEditor(viewPort, graph);

animate();

function animate()
{
    viewPort.reset();   
    graphEditor.display();
    requestAnimationFrame(animate);
}

function save()
{
    localStorage.setItem("graph", JSON.stringify(graph));
};

function dispose()
{
    graphEditor.dispose();
};

(window as any).graph       = graph;
(window as any).graphEditor = graphEditor;
(window as any).viewPort    = viewPort;
(window as any).save        = save;
(window as any).dispose     = dispose;
