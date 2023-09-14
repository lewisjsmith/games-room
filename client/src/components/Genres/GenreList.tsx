import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GenreTile from "./GenreTile";

export default function GenreList() {
  const [genreList, setGenreList] = useState([]);

  useEffect(() => {
    fetch("/api/v1/library/genres", { mode: "cors" })
      .then((res) => res.json())
      .then((data) => {
        setGenreList(data);
      });
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-start items-center mt-1 p-5 gap-10">
      <div className="w-full">
        <h1 className="w-full text-left text-5xl font-bold">Genres</h1>
      </div>
      <div className="h-full w-full p-5">
        <ul className="h-full w-full rounded-xl bg-opacity-5 bg-slate-400 shadow-lg pt-5 flex flex-col justify-start items-center gap-2 overflow-y-scroll">
          {genreList.length === 0 && <li className="w-full text-center" key={"null-result"}><h2>No genres found.</h2></li>}
          {genreList.map((genre) => {
            return (
              <li className="w-full text-center" key={genre._id}>
                <Link to={`/genre/${genre._id}`}>
                  <button>{genre.title}</button>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
