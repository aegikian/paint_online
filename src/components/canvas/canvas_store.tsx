const createCanvas = () => {
  const canvas = document.getElementById("canvas_r") as HTMLCanvasElement;
  let ctx = canvas.getContext("2d");
  const cashe: ImageData[] = [];
  const redo_cashe: ImageData[] = [];

  const drawer = (e: React.MouseEvent) => {
    if (e.buttons === 1) {
      ctx.beginPath();
      console.log("qweqweqwe");

      cashe.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    }
  };

  const stroker = (
    params_out: { x: number; y: number },
    color: string,
    size: string
  ) => {
    const rect = canvas.getBoundingClientRect();
    const x = params_out.x - rect.left;
    const y = params_out.y - rect.top;
    ctx.strokeStyle = color;
    ctx.lineWidth = +size;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const clear = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const undo = () => {
    if (cashe.length > 0) {
      const previousState = cashe.pop();

      if (previousState) {
        redo_cashe.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        ctx.putImageData(previousState, 0, 0);
      }
    }
  };
  const redo = () => {
    if (redo_cashe.length > 0) {
      const previousState = redo_cashe.pop();
      if (previousState) {
        cashe.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        ctx.putImageData(previousState, 0, 0);
      }
    }
  };
  return { canvas, ctx, drawer, stroker, clear, undo, redo };
};

export default createCanvas;
