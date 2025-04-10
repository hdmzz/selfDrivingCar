export function lerp(A: number, B: number, t: number)
{
	return A + (B - A) * t;
};

export function getIntersection(A: {x: number, y: number},B: {x: number, y: number},C: {x: number, y: number},D: {x: number, y: number})
{ 
  const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
  const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
  const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);
  
  if (bottom != 0) {
    const t = tTop / bottom;
    const u = uTop / bottom;
    if(t >= 0 && t <= 1 && u >= 0 && u <= 1){
      return {
        x: lerp(A.x, B.x, t),
        y: lerp(A.y, B.y, t),
        offset: t
      };
    };
  };
  return (null);
};

/**
 * @param poly1 la voiture
 * @param poly2 le bord de la route
 * Le modulo prevent le cas ou le i+1 overflow la taille du tableau, dans ce cas le i+1 sera égal à 0
 * ce qui est correct car le dernier point est le premier point
 */
export function polysIntersect(poly1: {x: number, y: number}[], poly2: {x: number, y: number}[])
{
  for (let i = 0; i < poly1.length; i++) {
    for (let j = 0; j < poly2.length; j++) {
      const touch = getIntersection(
        poly1[i],
        poly1[(i + 1) % poly1.length],
        poly2[j],
        poly2[(j + 1) % poly2.length]
      );
      if (touch) {
        return true;
      };
    };
  };
  return false;
}

export function getRGBA(value: number)
{
  const alpha = Math.abs(value);
  const R = value < 0 ? 0 : 255;
  const G = R;
  const B = value > 0 ? 0 : 255;
  return "rgba(" + R + "," + G + "," + B + "," + alpha + ")";
}
