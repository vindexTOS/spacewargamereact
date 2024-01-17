import { createContext, useContext, useEffect, useState } from "react";

type Cell = {
  spaceCraftStats: any;
  setSpaceCraftStates: React.Dispatch<
    React.SetStateAction<{
      life: number;
      damage: number;
    }>
  >;
  enemyPosition: any;
  setEnemyPosition: React.Dispatch<any>;
  bulletPosition: any;
  setBulletPosition: React.Dispatch<any>;

  enemyArmy: any[];
  setEnemyArmy: React.Dispatch<any[]>;
};

const Context = createContext<Cell | null>(null);

export const ContextProvider = ({ children }: { children: any }) => {
  const [spaceCraftStats, setSpaceCraftStates] = useState({
    life: 3,
    damage: 30,
  });
  const [enemyArmy, setEnemyArmy] = useState<any[]>([]);

  const EnemySpaceShips = () => {
    let SpaceShipArr = [];

    for (let i = 0; i < 40; i++) {
      const obj = {
        id: Math.random() * 20000,
        live: true,
        index: i,
      };

      SpaceShipArr.push(obj);
    }
    setEnemyArmy(SpaceShipArr);
  };
  useEffect(() => {
    EnemySpaceShips();
  }, []);
  const [enemyPosition, setEnemyPosition] = useState<any>();
  const [bulletPosition, setBulletPosition] = useState<any>();
  return (
    <Context.Provider
      value={{
        spaceCraftStats,
        setSpaceCraftStates,
        enemyPosition,
        setEnemyPosition,
        bulletPosition,
        setBulletPosition,
        enemyArmy,
        setEnemyArmy,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const UseMainContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("Not Wrapped ");
  }

  return context;
};
