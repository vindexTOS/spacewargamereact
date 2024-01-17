import React, { useState, useEffect, useRef } from "react";
import EnemyBullet from "../assets/spacebattle/paintball.png";
import AlienShip from "../assets/spacebattle/space-ship.png";
import { UseMainContext } from "../Context";

type EnemyPropType = {
  id: number;
  live: boolean;
};
const Enemy = ({ data, index }: { data: EnemyPropType; index: number }) => {
  const { bulletPosition, enemyArmy, setEnemyArmy } = UseMainContext();
  let { live, id } = data;
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const divRef: any = useRef(null);

  useEffect(() => {
    if (divRef.current) {
      const rect = divRef.current.getBoundingClientRect();

      setPosition({ x: Math.floor(rect.x), y: Math.floor(rect.y) });
    }
  }, []);
  useEffect(() => {
    // console.log
    const hitThreshold = 30; // You can adjust this value based on your requirements
    let newArr = [...enemyArmy];
    if (bulletPosition) {
      const isHit =
        Math.abs(bulletPosition.x - position.x) <= hitThreshold &&
        Math.abs(bulletPosition.y - position.y) <= hitThreshold;

      if (isHit) {
        console.log("HIT");
        //   const destroiedEnemy = enemyArmy.filter((val: any) => val.id !== id);
        newArr[index].live = false;
        setEnemyArmy(newArr);
        console.log(newArr[index].live);
      }
    }
  }, [bulletPosition]);
  return (
    <div
      onClick={() => console.log(position, bulletPosition)}
      ref={divRef}
      style={{ position: "relative", width: "40px", height: "40px" }}
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
