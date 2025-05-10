import {Graph} from "./math/Graph"
import { Envelope } from "./primitives/Envelope";

export class World {
    graph: Graph;
    roadRoundness: number;
    roadWidth: number;
    envelopes: Envelope[];

    constructor(graph: Graph, roadWidth = 100, roadRoundness = 3)
    {
        this.graph = graph;
        this.roadWidth = roadWidth;
        this.roadRoundness = roadRoundness;
        this.envelopes = [];

        this.generate();
    };

    generate()
    {
        this.envelopes.length = 0;

        for (const seg of this.graph.segments) {
            this.envelopes.push(
                new Envelope(seg, this.roadWidth, this.roadRoundness)
            );
        };
    };

    draw(ctx: CanvasRenderingContext2D)
    {
        for (const envelope of this.envelopes) {
            envelope.draw(ctx);
        };
    };
};
