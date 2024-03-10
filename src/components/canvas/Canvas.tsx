import React, { useEffect, useState } from "react";
import createCanvas from "./canvas_store";
import "./canvas.scss";
export const Canvas = () => {
  const [color, setColor] = useState("black");
  const [size, setSize] = useState("1");
  const [cnvs, setCnvs] = useState<any>();
  useEffect(() => {
    setCnvs(createCanvas());
  }, []);
  const handleDrawer = (e: React.MouseEvent) => {
    cnvs.drawer(e);
  };
  const handleDraw = (e: React.MouseEvent) => {
    if (e.buttons == 1) {
      cnvs.stroker({ x: e.clientX, y: e.clientY }, color, size);
    }
  };
  return (
    <div className="canvas_all">
      <div className="canvas_panel">
        <label htmlFor="color_picker">Color:</label>
        <input
          id="color_picker"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          type="color"
        />
        <label htmlFor="size_picker">Size:</label>
        <input
          id="size_picker"
          type="number"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
      </div>
      <canvas
        width={screen.width - 20}
        height={600}
        onMouseDown={(e) => handleDrawer(e)}
        onMouseMove={(e) => handleDraw(e)}
        className="canvas_r"
        id="canvas_r"
      ></canvas>
      <div className="canvas_panel">
        <button onClick={() => cnvs.clear()}>clear</button>
        <button onClick={() => cnvs.undo()}>undo</button>
        <button onClick={() => cnvs.redo()}>redo</button>
      </div>
    </div>
  );
};
