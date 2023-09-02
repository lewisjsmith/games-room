import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GameTile from "./GameTile";
import GameInstanceTile from "../GameInstances/GameTile";

export default function GamePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [gameId, setGameId] = useState("");
  const [details, setDetails] = useState({});

  useEffect(() => {
    setGameId(location.pathname.split("/")[2]);
  }, [location]);

  useEffect(() => {
    if (gameId !== "") {
      fetch(`/api/v1/library/game/${gameId}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setDetails(data);
        });
    }
  }, [gameId]);

  async function deleteGame() {
    const response = await fetch(`/api/v1/library/game/${gameId}/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (response.ok) {
      navigate("/games");
    } else {
      const json = await response.json();
      console.log(json);
    }
  }

  return (
    <div>

      <div>
        <GameTile details={details} />
        <button
          onClick={() => deleteGame()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Delete
        </button>
      </div>
{/* 
      <div>
        <GameInstanceTile details={{game: "Game", status: "Status", due_back: "Due back" }}/>
      </div> */}

    </div>
  );
}
