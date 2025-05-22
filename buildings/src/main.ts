import { GraphEditor } from "./GraphEditor";
import { Graph } from "./math/Graph";
import { Envelope } from "./primitives/Envelope";
import { Point } from "./primitives/Point";
import { Polygon } from "./primitives/Polygon";
import { Segment } from "./primitives/Segment"; 
import { Viewport } from "./Viewport";
import { World } from "./World";

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
const graphInfo = graphString ? JSON.parse(graphString) : null;
const graph = graphInfo ? Graph.load(graphInfo) : new Graph(points, segments);
const viewPort = new Viewport(myCanvas);
const graphEditor = new GraphEditor(viewPort, graph);
const world = new World(graph);

let oldGraphHash = graph.hash();
animate();

function animate()
{
    viewPort.reset();
    if ( graph.hash() !== oldGraphHash) {
        world.generate();
        oldGraphHash = graph.hash();
    };
    world.draw(ctx!);
    ctx!.globalAlpha = 0.3;
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
