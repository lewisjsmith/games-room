import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudioForm() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [founded, setFounded] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDateChange = (e) => {
    setFounded(e.target.value);
  };

  const submitForm = async () => {
    try {
      const response = await fetch("/api/v1/library/studio/create", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          founded: founded,
        }),
      });

      const json = await response.json();
      navigate(`/studio/${json._id}`);
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
        <label htmlFor="founded">Founded: </label>
        <input
          type="date"
          name="founded"
          value={founded}
          onChange={handleDateChange}
          min="1950-01-01"
        />
        <button type="button" onClick={() => submitForm()}>
          Submit
        </button>
      </form>
    </div>
  );
}
