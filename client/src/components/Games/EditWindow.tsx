import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function EditWindow(props) {

    const navigate = useNavigate();

    const [edit, setEdit] = useState(false);

    const [studios, setStudios] = useState({});
    const [genres, setGenres] = useState({});

    const [gameId, setGameId] = useState("");
    const [title, setTitle] = useState("");
    const [studio, setStudio] = useState("");
    const [genre, setGenre] = useState("");
    const [releaseDate, setReleaseDate] = useState("");

    useEffect(() => {
        if (props.gameId) {
            setGameId(props.gameId);
        }
    }, [props.gameId]);

    useEffect(() => {
        if (props.details.title) {
            setTitle(props.details.title);
        }
    }, [props.details.title]);

    useEffect(() => {
        if (props.details.studio) {
            setStudio(props.details.studio);
        }
    }, [props.details.studio]);

    useEffect(() => {
        if (props.details.genre) {
            setGenre(props.details.genre);
        }
    }, [props.details.genre]);

    useEffect(() => {
        if (props.details.releaseDate) {
            setReleaseDate(props.details.releaseDate.split("T")[0]);
        }
    }, [props.details.releaseDate]);

    useEffect(() => {
        fetch("/api/v1/library/studios", { mode: "cors" })
            .then((res) => res.json())
            .then((data) => {
                const map = {};
                for (let i = 0; i < data.length; i++) {
                    map[data[i].title] = data[i]["_id"];
                }
                setStudios({ ...map });
                try {
                    const keys = Object.keys(map);
                    if (keys.length > 0) {
                        setStudio(map[keys[0]]);
                    }
                } catch (err) {
                    console.log(err);
                }
            });
    }, []);

    useEffect(() => {
        fetch("/api/v1/library/genres", { mode: "cors" })
            .then((res) => res.json())
            .then((data) => {
                const map = {};
                for (let i = 0; i < data.length; i++) {
                    map[data[i].title] = data[i]["_id"];
                }
                setGenres({ ...map });
                try {
                    const keys = Object.keys(map);
                    if (keys.length > 0) {
                        setGenre(map[keys[0]]);
                    }
                } catch (err) {
                    console.log(err);
                }
            });
    }, []);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleStudioChange = (e) => {
        setStudio(e.target.value);
    };

    const handleGenreChange = (e) => {
        setGenre(e.target.value);
    };

    const handleReleaseDateChange = (e) => {
        setReleaseDate(e.target.value);
    };

    async function postEdit() {
        const response = await fetch(`/api/v1/library/games/${gameId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                title: title,
                studio: studio,
                genre: genre,
                releaseDate: releaseDate,
            }),
        });

        if (response.ok) {
            props.toggleFade();
            navigate(0);
        } else {
            const json = await response.json();
            console.log(json);
        }
    }

    async function deleteGame() {
        const response = await fetch(`/api/v1/library/games/${gameId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        if (response.ok) {
            navigate(`/games`);
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
                <label htmlFor="studio" className="flex justify-center items-center">Studio: </label>
                    <select name="studio" value={studio} onChange={handleStudioChange} className="w-9/12 text-center">
                        {Object.keys(studios).map((key) => {
                            return (
                                <option key={key} value={studios[key]}>
                                    {key}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="flex justify-between gap-5">
                <label htmlFor="genre" className="flex justify-center items-center">Genre: </label>
                    <select name="genre" value={genre} onChange={handleGenreChange} className="w-9/12 text-center">
                        {Object.keys(genres).map((key) => {
                            return (
                                <option key={key} value={genres[key]}>
                                    {key}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="flex justify-between gap-5">
                <label htmlFor="releaseDate" className="flex justify-center items-center">Release: </label>
                    <input
                        type="date"
                        name="releaseDate"
                        value={releaseDate}
                        min="1950-01-01"
                        onChange={handleReleaseDateChange}
                        className="w-9/12 text-right"
                    />
                </div>

            </form>

            <div className="w-full flex justify-end gap-5">
                <button onClick={() => postEdit()} className="shadow-lg pl-2 pr-2 pt-1 pb-1 w-20 rounded-lg font-bold bg-emerald-400 hover:bg-emerald-500 text-white">
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