import { useState, useEffect } from "react";
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
    <ul>
      {studiosList.map((studio) => {
        return (
          <li key={studio._id}>
            <StudioTile details={studio} />
          </li>
        );
      })}
    </ul>
  );
}