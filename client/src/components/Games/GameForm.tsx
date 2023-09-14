import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function GameForm() {

    const navigate = useNavigate();

    const [studios, setStudios] = useState<IdObject>({});
    const [fetchStudio, setFetchStudio] = useState<boolean>(false);

    const [genres, setGenres] = useState<IdObject>({});
    const [fetchGenres, setFetchGenres] = useState<boolean>(false);

    const [formStudio, setFormStudio] = useState("");
    const [formGenre, setFormGenre] = useState("");
    const [formTitle, setFormTitle] = useState("title");
    const [formDate, setFormDate] = useState("");

    const [formBody, setFormBody] = useState({});

    useEffect(() => {
        fetch("/api/v1/library/studios", { "mode": "cors" })
            .then(res => res.json())
            .then(data => {
                const map: IdObject = {};
                for (let i = 0; i < data.length; i++) {
                    map[data[i].title] = data[i]["_id"];
                }
                setStudios({ ...map });
                setFetchStudio(true);
                try {
                    const keys = Object.keys(map);
                    if (keys.length > 0) {
                        setFormStudio(map[keys[0]]);
                    }
                } catch (err) {
                    console.log(err);
                }
            });
    }, [])

    useEffect(() => {
        fetch("/api/v1/library/genres", { "mode": "cors" })
            .then(res => res.json())
            .then(data => {
                const map: IdObject = {};
                for (let i = 0; i < data.length; i++) {
                    map[data[i].title] = data[i]["_id"];
                }
                setGenres({ ...map });
                setFetchGenres(true);
                try {
                    const keys = Object.keys(map);
                    if (keys.length > 0) {
                        setFormGenre(map[keys[0]]);
                    }
                } catch (err) {
                    console.log(err);
                }
            });
    }, [])

    useEffect(() => {

        setFormBody({
            title: formTitle,
            studio: formStudio,
            genre: formGenre,
            releaseDate: formDate
        })

    }, [formTitle, formStudio, formGenre, formDate])

    function handleStudioChange(e: React.ChangeEvent<HTMLSelectElement>) {
        if (e.target) {
            setFormStudio(e.target.value);
        }
    }

    function handleGenreChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setFormGenre(e.target.value);
    }

    function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFormTitle(e.target.value);
    }

    function handleDateChange(e: React.ChangeEvent<HTMLDataElement>) {
        setFormDate(e.target.value);
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

        e.preventDefault()

        try {
            const response = await fetch("/api/v1/library/games",
                {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formBody)
                })

            const json = await response.json();
            navigate(`/game/${json._id}`)

        } catch (err) {
            console.log(err);
        }

    }

    return (

        <div className="w-full h-full flex flex-col gap-2 justify-center items-center">
            {fetchStudio && fetchGenres && (

                <form className="flex flex-col w-10/12 justify-center items-center gap-5 p-5 rounded-2xl bg-opacity-5 bg-slate-400 shadow-lg" onSubmit={handleSubmit}>

                    <h1 className="font-bold text-2xl">Register a new game</h1>

                    <div className="w-full flex justify-between gap-5">
                        <label htmlFor="title" className="flex justify-center items-center">Title: </label>
                        <input name="title" value={formTitle} onChange={handleTitleChange} className="w-9/12 border-solid border-2 border-gray-200 pl-4 pr-4 pt-2 pb-2 text-center" />
                    </div>

                    <div className="w-full flex justify-between gap-5">
                        <label htmlFor="studio" className="flex justify-center items-center">Studio: </label>
                        <select name="studio" value={formStudio} onChange={handleStudioChange} className="w-9/12 text-center">
                            {Object.keys(studios).map((key) => {
                                return <option key={key} value={studios[key]}>{key}</option>
                            })}
                        </select>
                    </div>

                    <div className="w-full flex justify-between gap-5">
                        <label htmlFor="genre" className="flex justify-center items-center">Genre: </label>
                        <select name="genre" value={formGenre} onChange={handleGenreChange} className="w-9/12 text-center">
                            {Object.keys(genres).map((key) => {
                                return <option key={key} value={genres[key]}>{key}</option>
                            })}
                        </select>
                    </div>

                    <div className="w-full flex justify-between gap-5">
                        <label htmlFor="releaseDate" className="flex justify-center items-center">Released: </label>
                        <input type="date" name="releaseDate" value={formDate} min="1950-01-01" onChange={handleDateChange} className="w-9/12 text-right" />
                    </div>

                    <div>
                        <button type="submit" className="shadow-lg pl-2 pr-2 pt-1 pb-1 w-20 rounded-lg font-bold bg-emerald-400 text-white">
                            SUBMIT
                        </button>
                    </div>

                </form>
            )}

        </div>

    )
}

interface IdObject {
    [key: string]: string;
}

export default GameForm;