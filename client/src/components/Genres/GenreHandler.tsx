import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GenreTile from "./GenreTile";

export default function GenreHandler(props) {
  const navigate = useNavigate();

  const [edit, setEdit] = useState(false);

  const [genreId, setGenreId] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (props.genreId) {
      setGenreId(props.genreId);
    }
  }, [props.genreId]);

  useEffect(() => {
    if (props.details.title) {
      setTitle(props.details.title);
    }
  }, [props.details.title]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  async function postEdit() {
    const response = await fetch(`/api/v1/library/genre/${genreId}/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        title: title
      }),
    });

    if (response.ok) {
      navigate(0);
    } else {
      const json = await response.json();
      console.log(json);
    }
  }

  return (
    <div>
      <div>
        <GenreTile details={props.details} />
        <button onClick={() => setEdit(true)}>Edit</button>
        <button onClick={() => props.deleteGenre()}>Delete</button>
      </div>

      {edit &&
        props.genreId &&
        props.details.title && (
          <div>
            <form action="">
              <label htmlFor="title">Title: </label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={handleTitleChange}
              />
            </form>
            <button onClick={() => postEdit()}>Save</button>
            <button onClick={() => setEdit(false)}>Cancel</button>
          </div>
        )}
    </div>
  );
}
