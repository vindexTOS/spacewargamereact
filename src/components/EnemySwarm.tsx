import React, { useEffect, useState } from "react";
import Enemy from "./Enemy";
import EnemyBullet from "../assets/spacebattle/paintball.png";
import { UseMainContext } from "../Context";
export default function EnemySwarm() {
  const { enemyArmy } = UseMainContext();
  const [bulletPositions, setBulletPositions] = useState<any>([]);
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  useEffect(() => {
    const shootBullets = () => {
      const newBulletPositions = [];

      for (let i = 0; i < 5; i++) {
        const randomX = Math.floor(Math.random() * screenWidth);
        const initialY = -30;
        const randomY = Math.floor(Math.random() * 400) + initialY;
        newBulletPositions.push({ x: randomX, y: randomY });
      }

      setBulletPositions(newBulletPositions);
    };

    const intervalId = setInterval(shootBullets, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        width: "90%",

        gap: "20px",
        position: "relative",
      }}
    >
      {enemyArmy?.map((val, index) => (
        <Enemy data={val} index={index} key={val.id} />
      ))}
      {bulletPositions.map((position: any, index: number) => (
        <img
          key={index}
          src={EnemyBullet}
          alt="Enemy Bullet"
          className="falling-bullet"
          style={{
            width: "20px",
            position: "absolute",
            left: position.x,
            top: position.y,
          }}
        />
      ))}
    </div>
  );
}
