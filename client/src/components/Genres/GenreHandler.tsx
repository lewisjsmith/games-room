import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GenreTile from "./GenreTile";

export default function GenreHandler(props) {

  const navigate = useNavigate();

  const [genreId, setGenreId] = useState("");

  useEffect(() => {
    if (props.genreId) {
      setGenreId(props.genreId);
    }
  }, [props.genreId]);

  async function deleteGenre() {
    const response = await fetch(`/api/v1/library/genres/${genreId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });

    if (response.ok) {
        navigate(`/genres`);
    } else {
        const json = await response.json();
        console.log(json);
    }
}

  return (
      <div className="w-full position: relative z-10">
        <div className="bg-gray-50 shadow-lg rounded-lg p-5 flex flex-col justify-center items-center gap-2">
          <GenreTile details={props.details} />
          <div className="w-full flex justify-end gap-5">
            <button onClick={() => {
              props.toggleEdit()
              props.toggleFade()
            }}
              className="shadow-lg pl-2 pr-2 pt-1 pb-1 w-20 rounded-lg font-bold bg-blue-400 hover:bg-blue-500 text-white">
              EDIT</button>
            <button onClick={() => deleteGenre()}
              className="shadow-lg pl-2 pr-2 pt-1 pb-1 w-20 rounded-lg font-bold bg-red-400 hover:bg-red-500 text-white">
              DELETE</button>
          </div>
        </div>
      </div>
    );
}
