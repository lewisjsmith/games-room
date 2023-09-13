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
    <div className="w-full flex justify-start gap-2">
            <span className="font-bold">Status: </span>
            <span>{localStatus ? localStatus : "Null"}</span>
            <span className="font-bold">Due: </span>
            <span>{localDue ? localDue : "Null"}</span>
    </div>
  );
}
