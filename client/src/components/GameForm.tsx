import { useState, useEffect } from 'react'

function GameForm() {

    const [studios, setStudios] = useState(null);
    const [fetchStudio, setFetchStudio] = useState(false);

    const [genres, setGenres] = useState(null);
    const [fetchGenres, setFetchGenres] = useState(false);

    const [formStudio, setFormStudio] = useState("");
    const [formGenre, setFormGenre] = useState("");
    const [formTitle, setFormTitle] = useState("title");
    const [formDate, setFormDate] = useState("");

    // const [formBody, setFormBody] = useState({});

    useEffect(() => {
        fetch("/api/v1/library/studios", { "mode": "cors" })
            .then(res => res.json())
            .then(data => {
                const map = {};
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
                const map = {};
                for (let i = 0; i < data.length; i++) {
                    map[data[i].title] = data[i]["_id"];
                }
                setGenres({ ...map });
                setFetchGenres(true);
            });
    }, [])

    useEffect(() => {
        setFormDate(presentDate());
    }, []);

    // useEffect(() => {
    //     setFormBody({
    //         title: formTitle,
    //         studio: formStudio,
    //         genre: formGenre,
    //         releaseDate: formDate
    //     })
    // }, [formTitle, formStudio, formGenre, formDate]);

    // useEffect(() => {
    //     console.log(formBody)
    // }, [formBody])


    function handleStudioChange(e) {
        setFormStudio(e.target.value);
    }

    function handleGenreChange(e) {
        setFormGenre(e.target.value);
    }

    function handleTitleChange(e) {
        setFormTitle(e.target.value);
    }

    function handleDateChange(e) {
        setFormDate(e.target.value);
    }

    function presentDate() {
        const present = new Date().toLocaleDateString().split("/");
        return `${present[2]}-${present[1]}-${present[0]}`;
    }

    return (

        <div>

            {fetchStudio && fetchGenres && <form method='POST' action="/api/v1/library/game/create">

                <input name="title" value={formTitle} onChange={handleTitleChange} />

                <select name="studio" value={formStudio} onChange={handleStudioChange}>
                    {Object.keys(studios).map((key) => {
                        return <option key={key} value={studios[key]}>{key}</option>
                    })}
                </select>

                {formStudio}

                <select name="genre" value={formGenre} onChange={handleGenreChange}>
                    {Object.keys(genres).map((key) => {
                        return <option key={key} value={genres[key]}>{key}</option>
                    })}
                </select>

                {formGenre}

                <input type="date" name="releaseDate" value={formDate} min="1950-01-01" max={presentDate()} onChange={handleDateChange} />

                <button type="submit" onSubmit={(e) => e.preventDefault()}>Submit</button>

            </form>}

        </div>

    )
}

export default GameForm;
