import { useState, useEffect } from 'react'

function GameFormEdit(props) {

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
            });
    }, [])

    useEffect(() => {
        if(props.details) {
            setFormTitle(props.details.title)
            setFormStudio(props.details.studio)
            setFormGenre(props.details.genre)
            setFormDate(props.details.releaseDate.split("T")[0])
        }
    }, [props]);

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
            const response = await fetch(`/api/v1/library/game/${props.details.id}/update`,
                {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formBody)
                })

            const json = await response.json();
            console.log(json);

        } catch (err) {
            console.log(err);
        }

    }

    return (

        <div>

            {fetchStudio && fetchGenres && formStudio !== ""  && <form onSubmit={handleSubmit}>

                <input name="title" value={formTitle} onChange={handleTitleChange} />

                <select name="studio" value={formStudio} onChange={handleStudioChange}>

                    {Object.keys(studios).map((key) => {
                        return <option key={key} value={studios[key]}>{key}</option>
                    })}

                </select>

                <select name="genre" value={formGenre} onChange={handleGenreChange}>
                    {Object.keys(genres).map((key) => {
                        return <option key={key} value={genres[key]}>{key}</option>
                    })}
                </select>

                <input type="date" name="releaseDate" value={formDate} min="1950-01-01" onChange={handleDateChange} />

                <button type="submit">Submit</button>

            </form>}

        </div>

    )
}

interface IdObject {
    [key: string]: string;
}

export default GameFormEdit;