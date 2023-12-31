import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GenreForm() {

  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
    <div className="w-full h-full flex flex-col gap-2 justify-center items-center bg-game-bkg bg-cover bg-left">
      <form action="" className="flex flex-col w-10/12 justify-center items-center gap-5 p-5 rounded-2xl bg-opacity-1 bg-gray-50 shadow-2xl">
        <h1 className="font-bold text-2xl">Register a new genre</h1>
        <div className="w-full flex justify-between gap-5">
          <label htmlFor="title" className="flex justify-center items-center">Title: </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleTitleChange}
            className="w-9/12 text-gray-900 border border-gray-300 rounded-lg bg-gray-50pl-4 pr-4 pt-2 pb-2 text-center"
          />
        </div>
        <div>
          <button
            type="button"
            onClick={() => submitForm()}
            className="shadow-lg pl-2 pr-2 pt-1 pb-1 w-20 rounded-lg font-bold bg-emerald-400 hover:bg-emerald-500 text-white"
          >
            Submit
          </button>
        </div>

      </form>
    </div>
  );
}
