import { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function EditWindow(props: IHandler) {

    const navigate = useNavigate();

    const [genreId, setGenreid] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        if (props.genreId) {
            setGenreid(props.genreId);
        }
    }, [props.genreId]);

    useEffect(() => {
        if (props.details && props.details.title) {
            setTitle(props.details.title);
        }
    }, [props.details]);

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    async function postEdit() {
        const response = await fetch(`/api/v1/library/genres/${genreId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                title: title
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
            </form>
            <div className="w-full flex justify-end gap-5">
                <button onClick={() => {
                    props.toggleFade();
                    props.toggleEdit();
                    postEdit()
                }} className="shadow-lg pl-2 pr-2 pt-1 pb-1 w-20 rounded-lg font-bold bg-emerald-400 hover:bg-emerald-500 text-white">
                    SAVE
                </button>
                <button onClick={() => {
                    props.toggleEdit()
                    props.toggleFade()
                }} className="shadow-lg pl-2 pr-2 pt-1 pb-1 w-20 rounded-lg font-bold bg-blue-400 hover:bg-blue-500 text-white">
                    CANCEL
                </button>
            </div>

        </div>
    )
}

interface IHandler {
    details: detailsStructure | undefined,
    genreId: string,
    toggleEdit: ()=> void,
    toggleFade: ()=> void
  }
  
  interface detailsStructure {
    _id: string,
    title: string,
  }