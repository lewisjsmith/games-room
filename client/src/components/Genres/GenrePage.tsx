import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import GenreHandler from "./GenreHandler";
import EditWindow from "./EditWindow";

export default function GamePage(props) {

  const location = useLocation();

  const [genreId, setGenreId] = useState("");
  const [details, setDetails] = useState({});

  const [gamesList, setGamesList] = useState([]);

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setGenreId(location.pathname.split("/")[2]);
  }, [location]);

  useEffect(() => {
    if (genreId !== "") {
      fetch(`/api/v1/library/genres/${genreId}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setDetails(data);
        });
    }
  }, [genreId]);

  useEffect(() => {
    if (genreId !== "") {
      fetch(`/api/v1/library/games/genre/${genreId}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setGamesList(data);
        });
    }
  }, [genreId]);

  function toggleEdit() {
    setEdit(!edit);
  }

  return (
    <div className="position: relative w-full h-full flex flex-col justify-start items-center p-5 gap-7 bg-game-bkg bg-cover bg-left">

      <div className="w-full">
        <h1 className="w-full text-left text-3xl font-bold">{details.title}</h1>
      </div>

      <GenreHandler details={details} studioId={genreId} toggleEdit={toggleEdit} toggleFade={props.toggleFade}/>
      {edit && <EditWindow details={details} studioId={genreId} toggleEdit={toggleEdit} toggleFade={props.toggleFade} />}

      <div className="position: relative z-10 w-full rounded-lg bg-gray-50 shadow-lg p-5 flex flex-col justify-center items-center gap-5">
        <ul className="w-full flex flex-col justify-start items-center gap-2 overflow-y-scroll">
          <h2 className="font-bold">Games released:</h2>
          {gamesList.map((game) => {
            return (
              <li key={game._id}>
                <Link to={`/game/${game._id}`}><h3>{game.title}</h3></Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
