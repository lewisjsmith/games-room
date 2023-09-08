import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GameTile from "../Games/GameTile";
import StudioHandler from "./StudioHandler";

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
      fetch(`/api/v1/library/studios/${studioId}`)
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
    const response = await fetch(`/api/v1/library/studios/${studioId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (response.ok) {
      navigate(`/studios`);
    } else {
      const json = await response.json();
      console.log(json);
    }
  }

  return (
    <div>
      <div>
        <h2 className="font-bold">Studio Details</h2>
        <StudioHandler details={details} studioId={studioId} deleteStudio={deleteStudio}/>
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
