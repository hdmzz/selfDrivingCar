import { Point } from "../primitives/Point";

export function getNearestPoint( loc: Point, points: Point[], treshold = Number.MAX_SAFE_INTEGER )
{
    let minDist = Number.MAX_SAFE_INTEGER;
    let nearest: Point | null = null;

    for ( const point of points ) {
        const dist = distance( point, loc );
        if ( dist < minDist && dist < treshold ) {
            minDist = dist;
            nearest = point;
        };
    };

    return ( nearest );
};

export function average( p1: Point, p2: Point )
{
    return new Point(( p1.x + p2.x ) / 2, ( p1.y + p2.y ) / 2 )
}

export function distance( p1: Point, p2: Point )
{
    return (  Math.hypot( p1.x - p2.x, p1.y - p2.y ));
};

export function scale( p: Point, scaler: number )
{
    return new Point( p.x * scaler, p.y * scaler );
};

export function add( p1: Point, p2: Point )
{
    return new Point( p1.x + p2.x, p1.y + p2.y );
};
 
export function subtract( p1: Point, p2: Point )
{
    return new Point( p1.x - p2.x, p1.y - p2.y );
};

export function angle( point: Point )
{
    return Math.atan2( point.y, point.x );
}; 

export function translate( loc: Point, angle: number, offset: number )
{
    return new Point(
       loc.x + Math.cos( angle ) * offset,
       loc.y + Math.sin( angle ) * offset,
    );
};

export function getIntersection( A: Point, B: Point, C: Point, D: Point ): { x: number, y:number, offset: number } | null
{
    const tTop = ( D.x - C.x ) * ( A.y - C.y ) - ( D.y - C.y ) * ( A.x - C.x );
    const uTop = ( C.y - A.y ) * ( A.x - B.x ) - ( C.x - A.x ) * ( A.y - B.y );
    const bottom = ( D.y - C.y ) * ( B.x - A.x ) - ( D.x - C.x ) * ( B.y - A.y );

    if ( bottom != 0 ) {
        const t = tTop / bottom;
        const u = uTop / bottom;

        if ( t >= 0 && t <= 1 && u >= 0 && u <= 1 )//donc si les scalaires par lequelles on multiplie donnent des resultats compris entre les valeurs d'origine 
        {
            return {
                x: lerp( A.x, B.x, t ),
                y: lerp( A.y, B.y, t ),
                offset: t,
            }; 
        };
    };

    return ( null );
};

function lerp( A: number, B: number, t: number )
{
    return ( A + (( B - A ) * t ));
};

/**
 * 
 * @param p un point (vecteur a normalizer) 
 * la norme d'un vecteur est obtenue en multipliant chaque element de p (x, y) par 1/ la magnitude de p (la longeur) 
 * @returns la norme c'est a dire la direction
 */
export function normalize( p: Point )
{
    return ( scale( p, 1 / magnitude( p )));
};

function magnitude( p: Point )
{
    return ( Math.hypot( p.x, p.y ));//la distance entre les 2points d'un vecteur dimension 1
};
