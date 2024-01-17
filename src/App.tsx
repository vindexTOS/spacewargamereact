import { useEffect, useState } from "react";
import spaceCraft from "./assets/spacebattle/rocket.png";
import Bullet from "./assets/spacebattle/bullet.png";
import "./App.css";
import SpaceShipt from "./components/SpaceShipt";
import Enemy from "./components/Enemy";
import EnemySwarm from "./components/EnemySwarm";

function App() {
  const mainDivStyle = {
    background: "black" as "black",
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center" as "center",
    alignItems: "center" as "center",
    position: "relative" as "relative",
    overflow: "hidden",
  };

  return (
    <div style={mainDivStyle}>
      <EnemySwarm />
      <SpaceShipt />
    </div>
  );
}

export default App;
