import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import EditWindow from "./EditWindow";
import StudioHandler from "./StudioHandler";

export default function StudioPage(props: FadeFunction) {

  const navigate = useNavigate();

  const location = useLocation();

  const [studioId, setStudioId] = useState("");
  const [details, setDetails] = useState<detailsStructure | undefined>(undefined);

  const [gamesList, setGamesList] = useState([]);

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setStudioId(location.pathname.split("/")[2]);
  }, [location]);

  useEffect(() => {
    if (studioId !== "") {
      fetch(`/api/v1/library/studios/${studioId}`)
        .then((res) => {
          if (res.status === 400) {
            navigate("/error");
          } else {
            return res.json();
          }
        })
        .then((data) => {
          setDetails(data);
        });
    }
  }, [studioId]);

  useEffect(() => {
    if (studioId !== "") {
      fetch(`/api/v1/library/games/studio/${studioId}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setGamesList(data);
        });
    }
  }, [studioId]);

  function toggleEdit() {
    setEdit(!edit);
  }

  return (
    <div className="position: relative w-full h-full flex flex-col justify-start items-center p-5 gap-7 bg-game-bkg bg-cover bg-left">

      <div className="w-full">
        <h1 className="w-full text-left text-3xl font-bold">{details ? details["title"] : "Null" }</h1>
      </div>

      <StudioHandler details={details} studioId={studioId} toggleEdit={toggleEdit} toggleFade={props.toggleFade} />
      {edit && <EditWindow details={details} studioId={studioId} toggleEdit={toggleEdit} toggleFade={props.toggleFade} />}

      <div className="position: relative z-10 w-full rounded-lg bg-gray-50 shadow-lg p-5 flex flex-col justify-center items-center gap-5">
        <ul className="w-full flex flex-col justify-start items-center gap-2 overflow-y-scroll">
          <h2 className="font-bold">Games released:</h2>
          {gamesList.map((game) => {
            return (
              <li key={game["_id"]}>
                <Link to={`/game/${game["_id"]}`}><h3>{game["title"]}</h3></Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

interface FadeFunction {
  toggleFade: ()=> void
}

interface detailsStructure {
  _id: string,
  title: string,
  founded: string
}
