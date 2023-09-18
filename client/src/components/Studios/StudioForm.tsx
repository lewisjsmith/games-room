import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudioForm() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [founded, setFounded] = useState("");

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      setTitle(e.target.value);
    }

  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      setFounded(e.target.value);
    }
  };

  const submitForm = async () => {
    try {
      const response = await fetch("/api/v1/library/studios", {
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
    <div className="w-full h-full flex flex-col gap-2 justify-center items-center bg-game-bkg bg-cover bg-left">
      <form className="flex flex-col w-10/12 justify-center items-center gap-5 p-5 rounded-2xl bg-opacity-1 bg-gray-50 shadow-2xl" action="">
        <h1 className="font-bold text-2xl">Register a new studio</h1>
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
        <div className="w-full flex justify-between gap-5">
          <label htmlFor="founded" className="flex justify-center items-center">Founded: </label>
          <input
            type="date"
            name="founded"
            value={founded}
            onChange={handleDateChange}
            min="1950-01-01"
            className="w-9/12 text-gray-900 border border-gray-300 rounded-lg bg-gray-50pl-4 pr-4 pt-2 pb-2 text-center"
          />
        </div>
        <div>
          <button type="button" onClick={() => submitForm()}
            className="shadow-lg pl-2 pr-2 pt-1 pb-1 w-20 rounded-lg font-bold bg-emerald-400 hover:bg-emerald-500 text-white">
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
}
