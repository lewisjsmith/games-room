import { useState, useEffect } from "react";

export default function GameInstanceTile(props: tileProps) {

  const [localStatus, setLocalStatus] = useState<string | undefined | null>(null);
  const [localDue, setLocalDue] = useState("");

  const { status, due_back } = props ? { ...props.details } : { status: null, due_back: null };

  useEffect(() => {
    if (props.details && props.details.status) {
      setLocalStatus(status);
    }
    if (due_back) {
      setLocalDue(due_back.split("T")[0]);
    }
  }, []);

  return (
    <div className="w-full flex justify-start gap-2">
      <span className="font-bold">Status: </span>
      <span>{localStatus ? localStatus : "Null"}</span>
      <span className="font-bold">Due: </span>
      <span>{localDue ? localDue : "Null"}</span>
    </div>
  );
}

interface detailsStructure {
  _id: string,
  game: string,
  status: string,
  due_back: string
}

interface tileProps {
  details: detailsStructure | undefined
}
