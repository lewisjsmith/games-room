import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StudioTile from "./StudioTile";

export default function StudioHandler(props) {
  const navigate = useNavigate();

  const [edit, setEdit] = useState(false);

  const [studioId, setStudioId] = useState("");
  const [title, setTitle] = useState("");
  const [founded, setFounded] = useState("");

  useEffect(() => {
    if (props.studioId) {
      setStudioId(props.studioId);
    }
  }, [props.studioId]);

  useEffect(() => {
    if (props.details.title) {
      setTitle(props.details.title);
    }
  }, [props.details.title]);

  useEffect(() => {
    if (props.details.founded) {
      setFounded(props.details.founded.split("T")[0]);
    }
  }, [props.details.founded]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleFoundedChange = (e) => {
    setFounded(e.target.value);
  };

  async function postEdit() {
    const response = await fetch(`/api/v1/library/studios/${studioId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        title: title,
        founded: founded,
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
        <StudioTile details={props.details} />
        <button onClick={() => setEdit(true)}>Edit</button>
        <button onClick={() => props.deleteStudio()}>Delete</button>
      </div>

      {edit &&
        props.studioId &&
        props.details.title &&
        props.details.founded && (
          <div>
            <form action="">
              <label htmlFor="title">Title: </label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={handleTitleChange}
              />
              <label htmlFor="founded">Founded: </label>
              <input
                type="date"
                name="founded"
                value={founded}
                onChange={handleFoundedChange}
                min="1950-01-01"
              />
            </form>
            <button onClick={() => postEdit()}>Save</button>
            <button onClick={() => setEdit(false)}>Cancel</button>
          </div>
        )}
    </div>
  );
}
