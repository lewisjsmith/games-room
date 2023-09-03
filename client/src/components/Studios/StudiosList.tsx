import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StudioTile from "./StudioTile";

export default function GamesList() {
  const [studiosList, setStudiosList] = useState([]);

  useEffect(() => {
    fetch("/api/v1/library/studios", { mode: "cors" })
      .then((res) => res.json())
      .then((data) => {
        setStudiosList(data);
      });
  }, []);

  return (
    <div>
      {studiosList.length > 0 && <ul>
        {studiosList.map((studio) => {
          return (
            <li key={studio._id}>
              <Link to={`/studio/${studio._id}`}>
                <button>{studio.title}</button>
              </Link>
            </li>
          );
        })}
      </ul>}

      {studiosList.length === 0 && <h2>No studios found.</h2>}

    </div>
  );
}
