import { Graph } from "./math/Graph"
import { Envelope } from "./primitives/Envelope";
import { Point } from "./primitives/Point";
import { Polygon } from "./primitives/Polygon";
import { Segment } from "./primitives/Segment";
import { add, distance, lerp, scale } from "./utils/utils";

export type NonNullableArray<T> = Array<NonNullable<T>>;

export class World {
    graph: Graph;
    roadRoundness: number;
    roadWidth: number;
    envelopes: NonNullableArray<Envelope>;
    buildings: NonNullableArray<Polygon>;
    roadBoarders: NonNullableArray<Segment>;
    trees: NonNullableArray<Point>;
    buildingWidth: number;
    spacing: number;
    buildingMinLenght: number;
    treeSize: number = 160;

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
                new Envelope( seg, this.roadWidth, this.roadRoundness )
            );
        };

        this.roadBoarders = Polygon.union( this.envelopes.map(( e ) => e.poly ));
        this.buildings = this.#generateBuildings();
        this.trees = this.#generateTrees();
    };

    #generateTrees( count = 10 )
    {
        const points = [
            ...this.roadBoarders.map(( s ) => [s.p1, s.p2] ).flat(),
            ...this.buildings.map(( b ) => b.points ).flat()
        ];

        const illegalPolys = [
            ...this.buildings,
            ...this.envelopes.map(( e ) => e.poly )
        ];

        //left rigth top bottom
        const left = Math.min( ...points.map(( p ) => p.x ));
        const right = Math.max( ...points.map(( p ) => p.x ));
        const top = Math.min( ...points.map(( p ) => p.y ));
        const bottom = Math.max( ...points.map(( p ) => p.y ));

        const trees: Array<Point> = [];
        let tryCount = 0;
        while ( tryCount < count ) {
            const p = new Point(
                lerp( left, right, Math.random() ),
                lerp( bottom, top, Math.random() )
            );

            // check if tree inside or nearby building / road
            let keep = true;
            for ( const poly of illegalPolys ) {
                if ( poly.containsPoint( p ) || poly.distanceToPoint( p ) < this.treeSize / 2 ) {
                    keep = false;
                    break;
                };
            };

            // check if tree too close to other trees
            if ( keep ) {
                for ( const tree of trees ) {
                    if ( !tree || !p || ( p.x === undefined || p.y === undefined )) continue;//due a la floating point exception
                    if ( distance( tree, p ) < this.treeSize ) {
                        keep = false;
                        break;
                    };
                };
            };

            // avoiding trees in the middle of nowhere
            if ( keep ) {
                let closeToSomething = false;
                for ( const poly of illegalPolys ) {
                    if ( poly.distanceToPoint( p ) < this.treeSize * 2 ) {
                        closeToSomething = true;
                        break;
                    };
                };
                keep = closeToSomething;
            };

            if (keep) {
                trees.push( p );
                tryCount = 0;
            };
            tryCount++;
        };

        console.log(trees);
        
        return ( trees );
    };

    #generateBuildings()
    {
        const tmpEnvelopes: NonNullableArray<Envelope> = [];

        for ( const seg of this.graph.segments ) {
            tmpEnvelopes.push(
                new Envelope(
                    seg,
                    this.roadWidth + this.buildingWidth + this.spacing * 2,
                    this.roadRoundness,
                )
            );
        };

        const guides = Polygon.union( tmpEnvelopes.map(( e ) => e.poly ));

        for ( let i = 0; i < guides.length; i++ ) {
            const seg = guides[i];
            if ( seg.lenght() < this.buildingMinLenght ) {
                guides.splice( i,  1 );//si la longeur du batiment et inferieur a min... alors ca degage
                i--; //dans ce cas la il faut rester au meme index
            };
        };

        const supports: NonNullableArray<Segment> = [];
        for ( const seg of guides ) {
            const len = seg.lenght();
            const buildingCount = Math.floor(
                len / ( this.buildingMinLenght + this.spacing )
            );
            
            if ( buildingCount <= 0 ) continue;
            
            const buildingLength = ( len - this.spacing * ( buildingCount - 1 )) / buildingCount;
            const direction = seg.directionVector();

            let q1 = seg.p1;
            for ( let i = 0; i < buildingCount; i++ ) {
                const q2 = add( q1, scale( direction, buildingLength ));
                supports.push( new Segment( q1, q2 ));
                
                q1 = add( q2, scale( direction, this.spacing ));
            };
        };

        const bases: NonNullableArray<Polygon> = [];
        for ( const seg of supports ) {
            bases.push( new Envelope( seg, this.buildingWidth ).poly );
        };

        for ( let i = 0; i < bases.length; i++ ) {
            for ( let j = i + 1; j < bases.length; j++ ) {
                if (bases[i].intersectsPolygon( bases[j] )) {
                    bases.splice( j, 1 );
                    j--;
                };
            };
        };

        return ( bases );
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

        for ( const tree of this.trees ) {
            tree.draw( ctx, { size: this.treeSize, color: "rgba(0, 0, 0, 0.5)" });
        };
    };
};
