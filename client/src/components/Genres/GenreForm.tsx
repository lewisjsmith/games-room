import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GenreForm() {

  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const submitForm = async () => {
    try {
      const response = await fetch("/api/v1/library/genres", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title
        }),
      });

      const json = await response.json();
      navigate(`/genre/${json._id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form action="">
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleTitleChange}
        />
        <button
          type="button"
          onClick={() => submitForm()}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
