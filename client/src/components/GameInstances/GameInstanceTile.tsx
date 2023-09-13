import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GameInstanceTile(props) {
  const navigate = useNavigate();

  const [edit, setEdit] = useState(false);

  const [localStatus, setLocalStatus] = useState("");
  const [localDue, setLocalDue] = useState("");
  const [formBody, setFormBody] = useState({});

  const { _id, game, status, due_back } = { ...props.details };

  useEffect(() => {
    setLocalStatus(status);
    if (due_back) {
      setLocalDue(due_back.split("T")[0]);
    }
  }, []);

  useEffect(() => {
    setFormBody({
      status: localStatus,
      due_back: localDue,
    });
  }, [localStatus, localDue]);

  const handleStatusChange = (e) => {
    setLocalStatus(e.target.value);
  };

  const handleDueChange = (e) => {
    setLocalDue(e.target.value);
  };

  async function saveChange() {
    try {
      const response = await fetch(
        `/api/v1/library/gameinstances/${_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formBody),
        }
      );

      const json = await response.json();

      if (response.ok) {
        setEdit(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteInstance() {
    const response = await fetch(`/api/v1/library/gameinstances/${_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      })

    if (response.ok) {
      navigate(0);
    } else {
      const json = await response.json();
      console.log(json);
    }
  }

  return (
    <div className="w-full flex gap-2">

            <span className="font-bold">Status: </span>
            <span>{localStatus ? localStatus : "Null"}</span>
            <span className="font-bold">Due: </span>
            <span>{localDue ? localDue : "Null"}</span>


        {/* <button
          onClick={() => setEdit(!edit)}
          className="shadow-lg pl-2 pr-2 pt-1 pb-1 w-20 rounded-lg font-bold bg-blue-400 text-white"
        >
          Edit
        </button>
        <button
          onClick={() => deleteInstance()}
          className="shadow-lg pl-2 pr-2 pt-1 pb-1 w-20 rounded-lg font-bold bg-blue-400 text-white"
        >
          Delete
        </button> */}

      {/* {edit && (
        <div>
          <form action="">
            <label htmlFor="status">Status: </label>
            <select
              name="status"
              onChange={handleStatusChange}
              id=""
              value={localStatus}
            >
              <option value="Available">Available</option>
              <option value="Loaned">Loaned</option>
              <option value="Lost">Lost</option>
            </select>
            <label htmlFor="due_back">Due: </label>
            <input
              type="date"
              name="due_back"
              value={localDue}
              id=""
              min="1950-01-01"
              onChange={handleDueChange}
            />
          </form>
          <button
            onClick={saveChange}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
        </div>
      )} */}
    </div>
  );
}
