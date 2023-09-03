import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GenreTile from "./GenreTile";
import GameTile from "../Games/GameTile";

export default function GamePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [genreId, setGenreId] = useState("");
  const [details, setDetails] = useState({});
  const [gamesList, setGamesList] = useState([]);

  useEffect(() => {
    setGenreId(location.pathname.split("/")[2]);
  }, [location]);

  useEffect(() => {
    if (genreId !== "") {
      fetch(`/api/v1/library/genre/${genreId}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setDetails(data);
        });
    }
  }, [genreId]);

  useEffect(() => {
    if (genreId !== "") {
      fetch(`/api/v1/library/games/genre/${genreId}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setGamesList(data);
        });
    }
  }, [genreId]);

  async function deleteGenre() {
    const response = await fetch(`/api/v1/library/genre/${genreId}/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (response.ok) {
      navigate("/genres");
    } else {
      const json = await response.json();
      console.log(json);
    }
  }

  return (
    <div>
      <div>
        <h2 className="font-bold">Genre Details</h2>
        <GenreTile details={details} />
        <button
          onClick={() => deleteGenre()}
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
