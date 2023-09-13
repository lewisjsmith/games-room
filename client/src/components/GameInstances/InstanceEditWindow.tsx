import { useState, useEffect } from "react";

export default function InstanceEditWindow(props) {

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

    return (
        <div className="position: absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 z-50 bg-white shadow-lg p-5 flex flex-col justify-center items-center">
            <form action="">
                <h3 className="font-bold">
                    Creating an instance of "{props.title}"
                </h3>
                <label htmlFor="status">Status: </label>
                <select name="status" onChange={handleStatusChange} id="">
                    <option value="Available">Available</option>
                    <option value="Loaned">Loaned</option>
                    <option value="Lost">Lost</option>
                </select>
                <label htmlFor="due_back">Due: </label>
                <input
                    type="date"
                    name="due_back"
                    id=""
                    min="1950-01-01"
                    onChange={handleDueChange}
                />
                <button
                    type="button"
                    onClick={() => {
                        saveChange()
                        props.toggleFade()
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Confirm
                </button>

                <button
                    type="button"
                    onClick={() =>{
                        props.toggleInstanceEdit()
                        props.toggleFade();
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Cancel
                </button>
            </form>
        </div>
    )
}