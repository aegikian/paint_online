import React from "react";
import "./main.scss";
import { Link, Outlet } from "react-router-dom";
export const App = () => {
  return (
    <div>
      <div className="links">
        <Link to={"/canvas"}>Start Drawing</Link>
      </div>
      <Outlet />
    </div>
  );
};
