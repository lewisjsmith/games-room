import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GameHandler from "./GameHandler";
import GameInstanceTile from "../GameInstances/GameInstanceTile";

export default function GamePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [gameId, setGameId] = useState("");
  const [details, setDetails] = useState({});
  const [gameInstanceList, setGameInstanceList] = useState([]);

  const [instanceStatus, setInstanceStatus] = useState("Available");
  const [instanceDate, setInstanceDate] = useState("");

  useEffect(() => {
    setGameId(location.pathname.split("/")[2]);
  }, [location]);

  useEffect(() => {
    if (gameId !== "") {
      fetch(`/api/v1/library/games/${gameId}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setDetails(data);
        });
    }
  }, [gameId]);

  useEffect(() => {
    if (gameId !== "") {
      fetch(`/api/v1/library/gameinstances/game/${gameId}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setGameInstanceList(data);
        });
    }
  }, [gameId]);

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

  async function createInstance() {
    const response = await fetch("/api/v1/library/gameinstances", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        game: gameId,
        status: instanceStatus,
        due_back: instanceDate,
      }),
    });

    if (response.ok) {
      console.log({
        game: gameId,
        status: instanceStatus,
        due_back: instanceDate,
      });
    } else {
      const json = await response.json();
      console.log(json);
    }
  }

  const handleStatusChange = (e) => {
    setInstanceStatus(e.target.value);
  };

  const handleDateChange = (e) => {
    setInstanceDate(e.target.value);
  };

  return (
    <div>
      <div>
        <h2 className="font-bold">Game Details</h2>
        <GameHandler details={details} gameId={gameId} />
      </div>

      <div>
        <div>
          <h2 className="font-bold">Game Instances</h2>
          <button
            onClick={() => {}}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create
          </button>
        </div>
        <ul>
          {gameInstanceList.map((gi) => {
            return (
              <li key={gi._id}>
                <GameInstanceTile details={gi} />
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <form action="">
          <h3 className="font-bold">
            Creating an instance of "{details.title}"
          </h3>
          <label htmlFor="status">Status: </label>
          <select name="status" onChange={handleStatusChange} id="">
            <option value="Available">Available</option>
            <option value="Loaned">Loaned</option>
            <option value="Lost">Lost</option>
          </select>
          <label htmlFor="due_back">Due: </label>
          <input
            type="date"
            name="due_back"
            id=""
            min="1950-01-01"
            onChange={handleDateChange}
          />
          <button
            type="button"
            onClick={() => createInstance()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
}
