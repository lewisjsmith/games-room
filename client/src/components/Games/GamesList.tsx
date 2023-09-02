import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GameTile from "./GameTile";

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
    <div>

      {gamesList.length > 0 && <ul>
        {gamesList.map((game) => {
          return (
            <li key={game._id}>
              <Link to={`/game/${game._id}`}>
                <button>{game.title}</button>
              </Link>
            </li>
          );
        })}
      </ul>}

      {gamesList.length === 0 && <h2>No games found.</h2>}

    </div>
  );
}
