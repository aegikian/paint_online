import { createRoot } from "react-dom/client";
import React from "react";
import { App } from "./components/App";
import { RouterProvider } from "react-router-dom";
import router from "@/router";
const root = document.getElementById("root");

if (!root) {
  throw new Error("root not found");
}

const container = createRoot(root);
container.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
