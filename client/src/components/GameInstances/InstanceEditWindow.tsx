import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function InstanceEditWindow(props) {

    const navigate = useNavigate();

    const [localStatus, setLocalStatus] = useState("");
    const [localDue, setLocalDue] = useState("");
    const [formBody, setFormBody] = useState({});

    const { _id, status, due_back } = { ...props.details };

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
                // setEdit(false);
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
        <div className="position: absolute top-2/4 left-2/4 w-5/6 -translate-x-2/4 -translate-y-2/4 z-50 bg-white shadow-lg p-5 flex flex-col justify-center items-center gap-5 rounded-xl">
            <form action="" className="flex flex-col gap-5">
                <h3 className="font-bold">
                    Creating an instance of "{props.title}"
                </h3>
                <div className="flex justify-between gap-5">
                    <label htmlFor="status">Status: </label>
                    <select name="status" onChange={handleStatusChange} id="" className="w-9/12 text-center">
                        <option value="Available">Available</option>
                        <option value="Loaned">Loaned</option>
                        <option value="Lost">Lost</option>
                    </select>
                </div>
                <div className="flex justify-between gap-5">
                    <label htmlFor="due_back">Due: </label>
                    <input
                        type="date"
                        value={localDue}
                        name="due_back"
                        id=""
                        min="1950-01-01"
                        onChange={handleDueChange}
                        className="w-9/12 text-right"
                    />
                </div>
                <div className="flex justify-end gap-5">
                    <button
                        type="button"
                        onClick={() => {
                            saveChange()
                            props.toggleInstanceEdit()
                            props.toggleFade()
                        }}
                        className="shadow-lg pl-2 pr-2 pt-1 pb-1 w-20 rounded-lg font-bold bg-emerald-400 hover:bg-emerald-500 text-white"
                    >
                        SAVE
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            props.toggleInstanceEdit()
                            props.toggleFade()
                            deleteInstance();
                        }}
                        className="shadow-lg pl-2 pr-2 pt-1 pb-1 w-20 rounded-lg font-bold bg-red-400 hover:bg-red-500 text-white"
                    >
                        DELETE
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            props.toggleInstanceEdit()
                            props.toggleFade();
                        }}
                        className="shadow-lg pl-2 pr-2 pt-1 pb-1 w-20 rounded-lg font-bold bg-blue-400 hover:bg-blue-500 text-white"
                    >
                        CANCEL
                    </button>
                </div>
            </form>
        </div>
    )
}