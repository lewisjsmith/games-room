import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StudioTile from "./StudioTile";
import GameTile from "../Games/GameTile";

export default function GamePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [studioId, setStudioId] = useState("");
  const [details, setDetails] = useState({});
  const [gamesList, setGamesList] = useState([]);

  useEffect(() => {
    setStudioId(location.pathname.split("/")[2]);
  }, [location]);

  useEffect(() => {
    if (studioId !== "") {
      fetch(`/api/v1/library/studio/${studioId}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setDetails(data);
        });
    }
  }, [studioId]);

  useEffect(() => {
    if (studioId !== "") {
      fetch(`/api/v1/library/games/studio/${studioId}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setGamesList(data);
        });
    }
  }, [studioId]);

  async function deleteStudio() {
    const response = await fetch(`/api/v1/library/studio/${studioId}/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (response.ok) {
      navigate("/studios");
    } else {
      const json = await response.json();
      console.log(json);
    }
  }

  return (
    <div>
      <div>
        <h2 className="font-bold">Studio Details</h2>
        <StudioTile details={details} />
        <button
          onClick={() => deleteStudio()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete
        </button>
      </div>

      <div>
        <h2 className="font-bold">Games released:</h2>
        <ul>
          {gamesList.map((game) => {
            return (
              <li key={game._id}>
                <GameTile details={game} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
