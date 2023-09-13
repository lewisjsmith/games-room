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
        <div className="position: absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 z-50 bg-white shadow-lg p-5 flex flex-col justify-center items-center">
            <form onSubmit={postEdit}>
                <input name="title" value={title} onChange={handleTitleChange} />

                <select name="studio" value={studio} onChange={handleStudioChange}>
                    {Object.keys(studios).map((key) => {
                        return (
                            <option key={key} value={studios[key]}>
                                {key}
                            </option>
                        );
                    })}
                </select>

                <select name="genre" value={genre} onChange={handleGenreChange}>
                    {Object.keys(genres).map((key) => {
                        return (
                            <option key={key} value={genres[key]}>
                                {key}
                            </option>
                        );
                    })}
                </select>

                <input
                    type="date"
                    name="releaseDate"
                    value={releaseDate}
                    min="1950-01-01"
                    onChange={handleReleaseDateChange}
                />
            </form>
            <button onClick={() => postEdit()}>Save</button>
            <button onClick={() => {
                props.toggleEdit()
                props.toggleFade()
                }}>Cancel</button>
        </div>
    )
}