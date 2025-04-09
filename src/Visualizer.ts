import { Level, NeuralNetwork } from "./Network";
import { lerp } from "./Utils";

export class Visualizer {
  static drawNetwork(ctx: CanvasRenderingContext2D, network: NeuralNetwork)
  {
    const margin = 50;
    const left = margin, top = margin, width = ctx.canvas.width - margin * 2, height = ctx.canvas.height - margin * 2;

    Visualizer.drawLevel(ctx, network.levels[0], left, top, width, height);
  };

  static  drawLevel(ctx: CanvasRenderingContext2D, level: Level, left: number, top: number, widht: number, height: number)
  {
    const right = left + widht;
    const bottom = top + height;

    const {inputs, outputs} = level;

    const nodeRadius = 18; //le rayo du rond representant les in/out-puts
    
    for (let i = 0; i < inputs.length; i++) {
      const x = lerp(left, right, inputs.length == 1 ? 0.5 :  i / (inputs.length - 1));
      ctx.beginPath();
      ctx.arc(x, bottom, nodeRadius, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.stroke();
    }
  };
};
  