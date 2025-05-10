import { Point } from "../primitives/Point";

export function getNearestPoint(loc: Point, points: Point[], treshold = Number.MAX_SAFE_INTEGER)
{
    let minDist = Number.MAX_SAFE_INTEGER;
    let nearest: Point | null = null;

    for (const point of points) {
        const dist = distance(point, loc);
        if (dist < minDist && dist < treshold) {
            minDist = dist;
            nearest = point;
        };
    };

    return (nearest);
};

function distance(p1: Point, p2: Point)
{
    return (Math.hypot(p1.x - p2.x, p1.y - p2.y));
};

export function scale(p: Point, scaler: number)
{
    return new Point(p.x * scaler, p.y * scaler);
};

export function add(p1: Point, p2: Point)
{
    return new Point(p1.x + p2.x, p1.y + p2.y);
};
 
export function subtract(p1: Point, p2: Point)
{
    return new Point(p1.x - p2.x, p1.y - p2.y);
};

export function angle(point: Point)
{
    return Math.atan2(point.y, point.x);
};

export function translate(loc: Point, angle: number, offset: number)
{
    return new Point(
       loc.x + Math.cos(angle) * offset,
       loc.y + Math.sin(angle) * offset
    );
};
