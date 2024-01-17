import React, { useEffect, useState } from "react";
import Bullet from "../assets/spacebattle/bullet.png";
import spaceCraft from "../assets/spacebattle/rocket.png";
import { UseMainContext } from "../Context";
export default function SpaceShipt() {
  const { spaceCraftStats, setSpaceCraftStates, setBulletPosition } =
    UseMainContext();
  const [spaceCraftPosition, setSpaceCraftPosition] = useState({
    x: 0,
    y: 0,
  });

  const [bullets, setBullets] = useState<any[]>([]);
  const [canFire, setCanFire] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      const step = 20;

      switch (e.key) {
        case "ArrowUp":
          setSpaceCraftPosition((prev) => ({
            ...prev,
            y: Math.min(prev.y + step, window.innerHeight - 50),
          }));
          break;
        case "ArrowDown":
          setSpaceCraftPosition((prev) => ({
            ...prev,
            y: Math.max(prev.y - step, 0),
          }));
          break;

        case "ArrowLeft":
          setSpaceCraftPosition((prev) => ({
            ...prev,
            x: Math.max(prev.x - step, 0),
          }));
          break;
        case "ArrowRight":
          setSpaceCraftPosition((prev) => ({
            ...prev,
            x: Math.min(prev.x + step, window.innerWidth - 80),
          }));
          break;
        case " ":
          if (canFire) {
            setBullets((prev) => [
              ...prev,
              { x: spaceCraftPosition.x, y: spaceCraftPosition.y },
            ]);
            setCanFire(false);

            setTimeout(() => {
              setCanFire(true);
            }, 500);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [spaceCraftPosition, canFire]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBullets((prev) =>
        prev
          .filter((bullet) => bullet.y < 2600)
          .map((bullet) => ({
            ...bullet,
            y: bullet.y + 10,
          }))
      );
    }, 16);

    return () => clearInterval(intervalId);
  }, []);
  const spaceCraftModel = {
    position: "absolute" as "absolute",
    width: "40px",
    height: "50px",
    left: spaceCraftPosition.x,
    bottom: spaceCraftPosition.y,
  };
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "0",
          opacity: "0.5",
        }}
      >
        {new Array(spaceCraftStats.life)
          .fill("")
          .map((val: string, index: number) => (
            <img src={spaceCraft} style={{ width: "60px" }} />
          ))}
      </div>
      {bullets.map((bullet, index) => {
        setBulletPosition(bullet);
        return (
          <img
            key={index}
            src={Bullet}
            style={{
              position: "absolute",
  
              width: "10px",
              height: "20px",
              left: bullet.x,
              bottom: bullet.y,
            }}
          />
        );
      })}
      <img src={spaceCraft} style={spaceCraftModel} />
    </>
  );
}
