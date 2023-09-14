import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function EditWindow(props) {

    const navigate = useNavigate();

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
        <div className="position: absolute top-2/4 left-2/4 w-5/6 -translate-x-2/4 -translate-y-2/4 z-50 bg-white shadow-lg p-5 flex flex-col justify-center items-center gap-5 rounded-xl">
            <form onSubmit={postEdit} className="flex flex-col gap-5">
                <div className="flex justify-between gap-5">
                    <label htmlFor="title" className="flex justify-center items-center">Title: </label>
                    <input className="w-9/12 border-solid border-2 border-gray-200 pl-4 pr-4 pt-2 pb-2 text-center" name="title" value={title} onChange={handleTitleChange} />
                </div>
                <div className="flex justify-between gap-5">
                    <label htmlFor="releaseDate" className="flex justify-center items-center">Founded: </label>
                    <input
                        type="date"
                        name="founded"
                        value={founded}
                        min="1950-01-01"
                        onChange={handleFoundedChange}
                        className="w-9/12 text-right"
                    />
                </div>

            </form>
            <div className="w-full flex justify-end gap-5">
                <button onClick={() => {
                    props.toggleFade();
                    props.toggleEdit();
                    postEdit()
                }} className="shadow-lg pl-2 pr-2 pt-1 pb-1 w-20 rounded-lg font-bold bg-emerald-400 text-white">
                    SAVE
                </button>
                <button onClick={() => {
                    props.toggleEdit()
                    props.toggleFade()
                }} className="shadow-lg pl-2 pr-2 pt-1 pb-1 w-20 rounded-lg font-bold bg-blue-400 text-white">
                    CANCEL
                </button>
            </div>

        </div>
    )
}