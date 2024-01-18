import React, { useState, useEffect, useRef } from "react";
import EnemyBullet from "../assets/spacebattle/paintball.png";
import AlienShip from "../assets/spacebattle/space-ship.png";
import { UseMainContext } from "../Context";

type EnemyPropType = {
  id: number;
  live: boolean;
  x: number;
  y: number;
};
const Enemy = ({ data, index }: { data: EnemyPropType; index: number }) => {
  const {
    bulletPosition,
    enemyArmy,
    setEnemyArmy,
    setBulletPosition,
    setBullets,
  } = UseMainContext();
  let { live, id, x, y } = data;
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const divRef: any = useRef(null);

  useEffect(() => {
    if (divRef.current) {
      const rects = divRef.current.getClientRects();

      if (rects.length > 0) {
        const rect = rects[0];
        setPosition({ x: Math.floor(rect.x), y: Math.floor(rect.y) });
      }
    }
  }, []);

  useEffect(() => {
    const hitThreshold = 30;
    let newArr = [...enemyArmy];
    if (bulletPosition && bulletPosition.x) {
      const isHit =
        Math.abs(bulletPosition.x - position.x) <= hitThreshold &&
        Math.abs(bulletPosition.y - position.y) <= hitThreshold;

      if (isHit && newArr[index].live) {
        newArr[index].live = false;
        setEnemyArmy(newArr);
        setBulletPosition({});
        setBullets([]);
      }
    }
  }, [bulletPosition]);

  return (
    <div
      onClick={() => console.log(position)}
      ref={divRef}
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: "40px",
        height: "40px",
      }}
    >
      {live && (
        <img
          src={AlienShip}
          className="alien-ship"
          style={{ width: "40px" }}
          alt="Alien Ship"
        />
      )}
    </div>
  );
};

export default Enemy;
