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
    <div>
      {genreList.length > 0 && <ul>
        {genreList.map((genre) => {
          return (
            <li key={genre._id}>
              <Link to={`/genre/${genre._id}`}>
                <button>{genre.title}</button>
              </Link>
            </li>
          );
        })}
      </ul>}

      {genreList.length === 0 && <h2>No genres found.</h2>}

    </div>
  );
}
