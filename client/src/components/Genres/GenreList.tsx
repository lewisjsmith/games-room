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
    <div className="w-full h-full flex flex-col justify-start items-center p-5 gap-10 bg-list-bkg bg-cover bg-center">
      <div className="w-full">
        <h1 className="w-full text-left text-5xl font-bold">Genres</h1>
      </div>
      <div className="h-full w-full p-5 flex justify-center">
        <ul className="h-full w-auto rounded-xl bg-gray-50 shadow-xl p-5 flex flex-col justify-start items-start gap-2 overflow-y-scroll">
          {genreList.length === 0 && <li className="w-full text-center" key={"null-result"}><h2>No genres found.</h2></li>}
          {genreList.map((genre) => {
            return (
              <li className="w-full text-center" key={genre._id}>
                <Link to={`/genre/${genre._id}`} className="w-full">
                  <button className="w-full text-left pl-3 pr-3 pt-2 pb-2 rounded-lg bg-transparent hover:bg-orange-300 hover:text-white hover:font-bold font-bold">{genre.title}</button>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
