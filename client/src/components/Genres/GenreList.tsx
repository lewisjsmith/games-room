import { useState, useEffect } from "react";
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
    <ul>
      {genreList.map((genre) => {
        return <li key={genre._id}><GenreTile details={genre}/></li>;
      })}
    </ul>
  );
}
