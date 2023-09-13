import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function GamesList() {
  const [gamesList, setGamesList] = useState([]);

  useEffect(() => {
    fetch("/api/v1/library/games", { mode: "cors" })
      .then((res) => res.json())
      .then((data) => {
        setGamesList(data);
      });
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-start items-center mt-1 p-5 gap-10">
      <div className="w-full">
        <h1 className="w-full text-left text-5xl">Games</h1>
      </div>
      <div className="h-full w-full p-5">
        <ul className="h-full w-full rounded-xl bg-opacity-5 bg-slate-400 shadow-lg pt-5 flex flex-col justify-start items-center gap-2 overflow-y-scroll">
          {gamesList.length === 0 && <li className="w-full text-center" key={"null-result"}><h2>No games found.</h2></li>}
          {gamesList.map((game) => {
            return (
              <li className="w-full text-center" key={game._id}>
                <Link to={`/game/${game._id}`}>
                  <button>{game.title}</button>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
