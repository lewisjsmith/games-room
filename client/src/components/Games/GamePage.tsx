import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GameHandler from "./GameHandler";
import GameInstanceTile from "../GameInstances/GameInstanceTile";
import EditWindow from "./EditWindow";
import InstanceEditWindow from "../GameInstances/InstanceEditWindow";
import InstanceCreate from "../GameInstances/InstanceCreate";

export default function GamePage(props: FadeFunction) {
  const navigate = useNavigate();
  const location = useLocation();

  const [gameId, setGameId] = useState("");
  const [details, setDetails] = useState<detailsStructure | undefined>(undefined);
  const [gameInstanceList, setGameInstanceList] = useState([]);

  const [instanceId, setInstanceId] = useState("");

  const [edit, setEdit] = useState(false);
  const [instanceEdit, setInstanceEdit] = useState(false);
  const [instanceCreate, setInstanceCreate] = useState(false);

  useEffect(() => {
    setGameId(location.pathname.split("/")[2]);
  }, [location]);

  useEffect(() => {
    if (gameId !== "") {
      fetch(`/api/v1/library/games/${gameId}`)
        .then((res) => {
          if (res.status === 400) {
            navigate("/error")
          } else {
            return res.json();
          }

        })
        .then((data) => {
          setDetails(data);
        });
    }
  }, [gameId]);

  useEffect(() => {
    if (gameId !== "") {
      fetch(`/api/v1/library/gameinstances/game/${gameId}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setGameInstanceList(data);
        });
    }
  }, [gameId]);

  function toggleEdit() {
    setEdit(!edit);
  }

  function toggleInstanceEdit() {
    setInstanceEdit(!instanceEdit);
  }

  function toggleInstanceCreate() {
    setInstanceCreate(!instanceCreate);
  }

  return (
    <div className="position: relative w-full h-full flex flex-col justify-start items-center p-5 gap-7 bg-game-bkg bg-cover bg-left">

      <div className="w-full">
        <h1 className="w-full text-left text-3xl font-bold">{details ? details["title"] : "Null" }</h1>
      </div>

      <GameHandler details={details} gameId={gameId} toggleEdit={toggleEdit} toggleFade={props.toggleFade} />
      {edit && <EditWindow details={details} gameId={gameId} toggleEdit={toggleEdit} toggleFade={props.toggleFade} />}


      <div className="position: relative z-10 w-full rounded-xl bg-gray-50 shadow-lg p-5 flex flex-col justify-center items-center gap-5">

        <div className="w-full flex justify-between items-center ">
          <h2 className="font-bold">Game Instances</h2>
          <button
            onClick={() => {
              setInstanceCreate(true)
              props.toggleFade()
            }}
            className="shadow-lg pl-2 pr-2 pt-1 pb-1 w-20 rounded-lg font-bold bg-emerald-400 hover:bg-emerald-500 text-white"
          >
            CREATE
          </button>
        </div>

        <ul className="w-full flex flex-col justify-start items-center gap-2 overflow-y-scroll">
          {gameInstanceList.map((gi) => {
            return (
              <li key={gi["_id"]} className="w-full" onClick={() => {
                setInstanceId(gi["_id"]);
                setInstanceEdit(true);
                props.toggleFade();
              }}>
                <GameInstanceTile details={gi} />
              </li>
            );
          })}
        </ul>

      </div>

      {instanceCreate && (
        <div>
          <InstanceCreate toggleInstanceCreate={toggleInstanceCreate} details={details} toggleFade={props.toggleFade} />
        </div>
      )}

      {instanceEdit && (
        <div>
          {gameInstanceList.map((gi) => {
            if (gi["_id"] === instanceId) {
              return <InstanceEditWindow key={gi["_id"]} toggleInstanceEdit={toggleInstanceEdit} title={details ? details["title"] : "Null"} details={gi} toggleFade={props.toggleFade} />
            }
          })}
        </div>
      )}

    </div>
  );
}

interface FadeFunction {
  toggleFade: ()=> void
}

interface detailsStructure {
  _id: string,
  title: string,
  studio: string,
  studioTitle: string,
  genre: string,
  genreTitle: string,
  releaseDate: string
}
