import { useState, useEffect } from "react";
import GameTile from "./GameTile";

export default function GamesList() {

    const [gamesList, setGamesList] = useState([]);

    useEffect(() => {
        fetch('/api/v1/library/games', {"mode": 'cors'})
        .then(res => res.json())
        .then(data => {
            setGamesList(data);
        });
    }, [])


    return(
        <ul>
            {gamesList.map(game => {
                return <li key={game._id}><GameTile details={game}/></li>
            })}
        </ul>
    );
}