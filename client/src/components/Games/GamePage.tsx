import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GameTile from "./GameTile";
import GameInstanceTile from "../GameInstances/GameTile";
import GameFormEdit from "./GameFormEdit";

export default function GamePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [gameId, setGameId] = useState("");
  const [details, setDetails] = useState({});
  const [gameInstanceList, setGameInstanceList] = useState([]);

  const [instanceStatus, setInstanceStatus] = useState("Available");
  const [instanceDate, setInstanceDate] = useState("");

  const [edit, setEdit] = useState(false);

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

  useEffect(() => {
    if (gameId !== "") {
      fetch(`/api/v1/library/gameinstances/${gameId}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setGameInstanceList(data);
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
      navigate(`/games`);
    } else {
      const json = await response.json();
      console.log(json);
    }
  }

  async function createInstance() {
    const response = await fetch("/api/v1/library/gameinstance/create", {
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
        <div>
          <h2 className="font-bold">Game Details</h2>
          {!edit && (
            <button
              onClick={() => setEdit(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit
            </button>
          )}
        </div>

        {edit && (
          <div>
            <GameFormEdit details={{id: gameId, ...details}}/>
            <button
              onClick={() => setEdit(false)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        )}

        {!edit && (
          <div>
            <GameTile details={details} />
            <button
              onClick={() => deleteGame()}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
        )}
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
