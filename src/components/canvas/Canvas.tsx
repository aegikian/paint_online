import React, { useEffect, useState } from "react";
import createCanvas from "./canvas_store";
import "./canvas.scss";
export const Canvas = () => {
  const [color, setColor] = useState("black");
  const [size, setSize] = useState("1");
  const [cnvs, setCnvs] = useState<any>();
  const [hand, setHand] = useState<"square" | "circle" | "pencil" | "line">(
    "pencil"
  );
  const [shftD, setShiftD] = useState(false);
  useEffect(() => {
    setCnvs(createCanvas());
    window.addEventListener("keydown", (e) => handleShift(e, "down"));
    window.addEventListener("keyup", (e) => handleShift(e, "up"));
  }, []);
  const handleDrawer = (e: React.MouseEvent) => {
    cnvs.drawer(e);
  };
  const handleShift = (e: KeyboardEvent, mode: string) => {
    if (mode === "down" && e.key === "Shift") setShiftD(true);
    if (mode === "up" && e.key === "Shift") setShiftD(false);
  };
  const handleDraw = (e: React.MouseEvent) => {
    switch (hand) {
      case "pencil":
        if (e.buttons == 1) {
          cnvs.stroker({ x: e.clientX, y: e.clientY }, color, size);
        }
        break;
      case "circle":
        if (e.buttons === 1) {
          cnvs.circler({ x: e.clientX, y: e.clientY }, color, +size);
        } else {
          cnvs.circler({ x: e.clientX, y: e.clientY }, color, +size, true);
        }
        break;
      case "square":
        if (e.buttons == 1) {
          cnvs.squarer(
            color,
            size,
            { x: e.clientX, y: e.clientY },
            { x: e.clientX, y: e.clientY }
          );
        } else if (e.buttons == 0) {
          cnvs.squarer(color, size, null, { x: e.clientX, y: e.clientY }, true);
        }
        break;
      case "line":
        if (e.buttons == 1) {
          cnvs.liner({ x: e.clientX, y: e.clientY }, null, color, size);
        } else if (e.buttons == 0) {
          cnvs.liner(
            null,
            { x: e.clientX, y: e.clientY },
            color,
            size,
            true,
            shftD
          );
        }
        break;
      default:
        break;
    }
  };
  return (
    <div className="canvas_all">
      <div className="canvas_panel">
        <span>{shftD ? "shift is pushed" : ""}</span>
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
        <button
          onClick={() => setHand("circle")}
          className={hand === "circle" ? "pen_active pen" : "pen"}
        >
          circle
        </button>
        <button
          onClick={() => setHand("square")}
          className={hand === "square" ? "pen_active pen" : "pen"}
        >
          square
        </button>
        <button
          onClick={() => setHand("pencil")}
          className={hand === "pencil" ? "pen_active pen" : "pen"}
        >
          pencil
        </button>
        <button
          onClick={() => setHand("line")}
          className={hand === "line" ? "pen_active pen" : "pen"}
        >
          line
        </button>
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
