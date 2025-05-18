import {Graph} from "./math/Graph"
import { Envelope } from "./primitives/Envelope";
import { Point } from "./primitives/Point";
import { Polygon } from "./primitives/Polygon";
import { Segment } from "./primitives/Segment";

export class World {
    graph: Graph;
    roadRoundness: number;
    roadWidth: number;
    envelopes: Array<Envelope>;
    buildings: Array<Segment>;
    roadBoarders: Array<Segment>;
    buildingWidth: number;
    spacing: number;
    buildingMinLenght: number;

    constructor( graph: Graph, roadWidth = 100, roadRoundness = 10, buildingWidth = 150, spacing = 50, buildMinLength = 150 )
    {
        this.graph = graph; 
        this.roadWidth = roadWidth;
        this.roadRoundness = roadRoundness;
        this.envelopes = new Array<Envelope>( this.graph.segments.length );
        this.roadBoarders = [];
        this.buildingWidth = buildingWidth,
        this.spacing = spacing;
        this.buildingMinLenght = buildMinLength;
        this.generate();
    };

    generate()
    {
        this.envelopes.length = 0;
        for ( const seg of this.graph.segments ) {
            this.envelopes.push(
                new Envelope(seg, this.roadWidth, this.roadRoundness)
            );
        };

        this.roadBoarders = Polygon.union(this.envelopes.map((e) => e.poly));
        this.buildings = this.#generateBuildings();
    };

    #generateBuildings()
    {
        const tmpEnvelopes: Array<Envelope> = [];

        for (const seg of this.graph.segments) {
            tmpEnvelopes.push(
                new Envelope(
                    seg,
                    this.roadWidth + this.buildingWidth + this.spacing * 2,
                    this.roadRoundness,
                )
            );
        };

        const guides = Polygon.union(tmpEnvelopes.map(( e ) => e.poly));

        for (let i = 0; i < guides.length; i++) {
            const seg = guides[i];
            if ( seg.lenght() < this.buildingMinLenght ) {
                guides.splice( i,  1 );//si la longeur du batiment et inferieur a min... alors ca degage
                i--; //dans ce cas la il faut rester au meme index
            };
        };

        const support: Array<Segment> = [];

        

        return ( guides );
    };

    draw( ctx: CanvasRenderingContext2D )
    {
        for ( const envelope of this.envelopes ) {
            envelope.draw( ctx, { fill: "#BBB", stroke: "#BBB", lineWidth: 5 });
        };

        for ( const seg of this.graph.segments ) {
            seg.draw( ctx, { color: "white", width: 4, dash: [10, 10] });
        };

        for ( const seg of this.roadBoarders ) {
            seg.draw( ctx, { color: "white", width: 4 });
        };

        for ( const building of this.buildings ) {
            building.draw( ctx )
        };
    };
};
