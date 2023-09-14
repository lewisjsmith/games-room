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

    <div className="w-full h-full flex flex-col justify-start items-center mt-1 p-5 gap-10">
      <div className="w-full">
        <h1 className="w-full text-left text-5xl font-bold">Studios</h1>
      </div>
      <div className="h-full w-full p-5">
        <ul className="h-full w-full rounded-xl bg-opacity-5 bg-slate-400 shadow-lg pt-5 flex flex-col justify-start items-center gap-2 overflow-y-scroll">
          {studiosList.length === 0 && <li className="w-full text-center"key={"null-result"}><h2>No studios found.</h2></li>}
          {studiosList.map((studio) => {
            return (
              <li className="w-full text-center" key={studio._id}>
                <Link to={`/studio/${studio._id}`}>
                  <button>{studio.title}</button>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>

  );
}
