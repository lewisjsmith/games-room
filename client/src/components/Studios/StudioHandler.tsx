import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StudioTile from "./StudioTile";

export default function StudioHandler(props: IHandler) {
  
  const navigate = useNavigate();

  const [studioId, setStudioId] = useState("");

  useEffect(() => {
    if (props.studioId) {
      setStudioId(props.studioId);
    }
  }, [props.studioId]);

  async function deleteStudio() {
    const response = await fetch(`/api/v1/library/studios/${studioId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });

    if (response.ok) {
        navigate(`/studios`);
    } else {
        const json = await response.json();
        console.log(json);
    }
}

  return (
    <div className="w-full position: relative z-10">
      <div className="bg-gray-50 rounded-lg shadow-lg p-5 flex flex-col justify-center items-center gap-2">
        <StudioTile details={props.details} />
        <div className="w-full flex justify-end gap-5">
          <button onClick={() => {
            props.toggleEdit()
            props.toggleFade()
          }}
            className="shadow-lg pl-2 pr-2 pt-1 pb-1 w-20 rounded-lg font-bold bg-blue-400 hover:bg-blue-500 text-white">
            EDIT</button>
          <button onClick={() => deleteStudio()}
            className="shadow-lg pl-2 pr-2 pt-1 pb-1 w-20 rounded-lg font-bold bg-red-400 hover:bg-red-500 text-white">
            DELETE</button>
        </div>
      </div>
    </div>
  );
}

interface IHandler {
  details: detailsStructure | undefined,
  studioId: string,
  toggleEdit: ()=> void,
  toggleFade: ()=> void
}

interface detailsStructure {
  _id: string,
  title: string,
  founded: string
}

