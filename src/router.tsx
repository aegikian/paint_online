import { createBrowserRouter } from "react-router-dom";
import { App } from "./components/App";
import React, { Suspense } from "react";
import { Canvas } from "./components/canvas/Canvas";

export default createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>ERRor, page not found</h1>,
    children: [
      {
        path: "/canvas",
        element: <Canvas />,
      },
    ],
  },
]);
