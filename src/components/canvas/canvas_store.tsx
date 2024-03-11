const createCanvas = () => {
  const canvas = document.getElementById("canvas_r") as HTMLCanvasElement;
  let ctx = canvas.getContext("2d");
  const cashe: ImageData[] = [];
  const redo_cashe: ImageData[] = [];
  let startPos: { x: number; y: number } | null = null;
  let endPos: { x: number; y: number } | null = null;
  let lastCoords: { x: number; y: number } | null = null;

  const drawer = (e: React.MouseEvent) => {
    if (e.buttons === 1) {
      ctx.beginPath();
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

  const squarer = (
    color: string,
    size: number,
    start?: { x: number; y: number },
    end?: { x: number; y: number },
    draw?: boolean
  ) => {
    const rect = canvas.getBoundingClientRect();
    if (startPos == null && start) {
      startPos = { x: start.x - rect.left, y: start.y - rect.top };
    }
    endPos = { x: end.x - rect.x, y: end.y - rect.y };
    ctx.strokeStyle = color;
    ctx.lineWidth = size;

    if (startPos && endPos && draw) {
      const width = endPos.x - startPos.x;
      const height = endPos.y - startPos.y;
      ctx.strokeRect(startPos.x, startPos.y, width, height);
      startPos = null;
      endPos = null;
    }
  };
  const circler = (
    start: { x: number; y: number },
    color: string,
    size: number,
    end?: boolean
  ) => {
    const rect = canvas.getBoundingClientRect();
    if (startPos == null && start) {
      startPos = { x: start.x - rect.left, y: start.y - rect.top };
    }
    if (startPos && start.x && start.y) {
      const radius = Math.sqrt(
        Math.pow(startPos.x - (start ? start.x - rect.left : 0), 2) +
          Math.pow(startPos.y - (start ? start.y - rect.top : 0), 2)
      );

      const centerX = startPos.x;
      const centerY = startPos.y;

      ctx.strokeStyle = color;
      ctx.lineWidth = size;
      if (end && startPos.x && startPos.y) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.stroke();
        startPos = null;
      }
    }
  };

  const liner = (
    start: { x: number; y: number },
    end: { x: number; y: number } | null,
    color: string,
    size: string,
    isEnd?: boolean,
    isShift?: boolean
  ) => {
    const rect = canvas.getBoundingClientRect();
    if (!startPos && start)
      startPos = { x: start.x - rect.left, y: start.y - rect.top };
    if (end !== null) {
      endPos = { x: end.x - rect.left, y: end.y - rect.top };
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = +size;
    if (end && isEnd && startPos && endPos) {
      ctx.moveTo(startPos.x, startPos.y);
      ctx.lineTo(endPos.x, endPos.y);
      ctx.stroke();
      if (!isShift) {
        startPos = null;
        endPos = null;
      }
    }
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
  return {
    canvas,
    ctx,
    drawer,
    stroker,
    clear,
    undo,
    redo,
    squarer,
    circler,
    liner,
  };
};
export default createCanvas;
