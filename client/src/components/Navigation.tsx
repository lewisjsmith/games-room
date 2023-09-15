import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navigation() {

  const [selected, setSelected] = useState(8);

  const location = useLocation();

  useEffect(() => {

    const loc = location.pathname.split("/");

    switch (loc[1]) {
      case "":
        setSelected(0);
        break;
      case "games":
        setSelected(1);
        break;
      case "game":
        if (loc[2] === "new") {
          setSelected(2)
        } else {
          setSelected(8);
        }
        break;
      case "studios":
        setSelected(3);
        break;
      case "studio":
        if (loc[2] === "new") {
          setSelected(4)
        } else {
          setSelected(8);
        }
        break;
      case "genres":
        setSelected(5);
        break;
      case "genre":
        if (loc[2] === "new") {
          setSelected(6)
        } else {
          setSelected(8);
        }
        break;
      default:
        setSelected(7);
        break;
    }
  }, [location]);

  return (
    <div className="flex flex-col justify-start items-center h-screen w-4/12 shadow-2xl p-5 gap-5 bg-gradient-to-b from-gray-200 to-gray-300">
      <div className="w-full border-b-2 pb-5 border-black border-opacity-20">
        <div className="flex flex-col">
          <Link to={"/"} className="font-bold text-lg w-full pl-3 pr-3 pt-2 pb-2 rounded-lg bg-transparent hover:bg-blue-500 hover:text-white" style={selected === 0 ? {backgroundColor: "rgb(59 130 246", fontWeight: "bold", color: "white", borderRightWidth: "3px", borderRightStyle: "solid", borderRightColor: "#1e40af"} : {}}><h3>Home</h3></Link>
        </div>
      </div>

      <div className="w-full border-b-2 pb-5 border-black border-opacity-20">
        <div className="flex flex-col">
          <h3 className="font-bold text-lg w-full pl-3 pr-3 pt-2 pb-2 rounded-lg bg-transparent">Video games</h3>
          <Link to={"/games"} className="w-full pl-3 pr-3 pt-2 pb-2 rounded-lg bg-transparent hover:bg-blue-500 hover:text-white hover:font-bold" style={selected === 1 ? {backgroundColor: "rgb(59 130 246", fontWeight: "bold", color: "white", borderRightWidth: "3px", borderRightStyle: "solid", borderRightColor: "#1e40af"}: {}}><p className="">Games List</p></Link>
          <Link to={"/game/new"} className="w-full pl-3 pr-3 pt-2 pb-2 rounded-lg bg-transparent hover:bg-blue-500 hover:text-white hover:font-bold" style={selected === 2 ? {backgroundColor: "rgb(59 130 246", fontWeight: "bold", color: "white", borderRightWidth: "3px", borderRightStyle: "solid", borderRightColor: "#1e40af"} : {}}><p className="">New Game</p></Link>
        </div>
      </div>

      <div className="w-full border-b-2 pb-5 border-black border-opacity-20">
        <div className="flex flex-col">
          <h3 className="font-bold text-lg w-full pl-3 pr-3 pt-2 pb-2 rounded-lg bg-transparent">Game studios</h3>
          <Link to={"/studios"} className="w-full pl-3 pr-3 pt-2 pb-2 rounded-lg bg-transparent hover:bg-blue-500 hover:text-white hover:font-bold" style={selected === 3 ? {backgroundColor: "rgb(59 130 246", fontWeight: "bold", color: "white", borderRightWidth: "3px", borderRightStyle: "solid", borderRightColor: "#1e40af"} : {}}><p className="">Studio List</p></Link>
          <Link to={"/studio/new"} className="w-full pl-3 pr-3 pt-2 pb-2 rounded-lg bg-transparent hover:bg-blue-500 hover:text-white hover:font-bold" style={selected === 4 ? {backgroundColor: "rgb(59 130 246", fontWeight: "bold", color: "white", borderRightWidth: "3px", borderRightStyle: "solid", borderRightColor: "#1e40af"} : {}}><p className="">New Studio</p></Link>
        </div>
      </div>

      <div className="w-full">
        <div className="flex flex-col items-center">
          <h3 className="font-bold text-lg w-full pl-3 pr-3 pt-2 pb-2 rounded-lg bg-transparent">Genres</h3>
          <Link to={"/genres"} className="w-full pl-3 pr-3 pt-2 pb-2 rounded-lg bg-transparent hover:bg-blue-500 hover:text-white hover:font-bold" style={selected === 5 ? {backgroundColor: "rgb(59 130 246", fontWeight: "bold", color: "white", borderRightWidth: "3px", borderRightStyle: "solid", borderRightColor: "#1e40af"} : {}}><p className="">Genre List</p></Link>
          <Link to={"/genre/new"} className="w-full pl-3 pr-3 pt-2 pb-2 rounded-lg bg-transparent hover:bg-blue-500 hover:text-white hover:font-bold" style={selected === 6 ? {backgroundColor: "rgb(59 130 246", fontWeight: "bold", color: "white", borderRightWidth: "3px", borderRightStyle: "solid", borderRightColor: "#1e40af"} : {}}><p className="">New Genre</p></Link>
        </div>
      </div>

    </div>
  );
}
