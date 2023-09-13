import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GameTile from "./GameTile";

export default function GameHandler(props) {
  const navigate = useNavigate();

  const [gameId, setGameId] = useState("");

  useEffect(() => {
    if (props.gameId) {
      setGameId(props.gameId);
    }
  }, [props.gameId]);

  async function deleteGame() {
    const response = await fetch(`/api/v1/library/games/${gameId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (response.ok) {
      navigate(`/games`);
    } else {
      const json = await response.json();
      console.log(json);
    }
  }

  return (
    <div className="w-full position: relative z-10">
      <div className="bg-opacity-5 bg-slate-400 shadow-lg p-5 flex flex-col justify-center items-center gap-2">
        <GameTile details={props.details} />
        <div className="w-full flex justify-end gap-5">
          <button onClick={() => {
            props.toggleEdit()
            props.toggleFade()
          }}
          className="shadow-lg pl-2 pr-2 pt-1 pb-1 w-20 rounded-lg font-bold bg-blue-400 text-white">
            EDIT</button>
          <button onClick={() => deleteGame()}
          className="shadow-lg pl-2 pr-2 pt-1 pb-1 w-20 rounded-lg font-bold bg-red-400 text-white">
            DELETE</button>
        </div>
      </div>
    </div>
  );
}
