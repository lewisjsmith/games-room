import { Link } from "react-router-dom";
import burger from "../public/assets/burger.svg";
import close from "../public/assets/closemenu.svg";
import { useState } from "react";

export default function NavigationMobile() {

  const [hideMenu, setHideMenu] = useState(true);

  return (
    <div className="position: absolute w-full h-full z-10 drop-shadow-xl shadow-black">
      <button onClick={() => setHideMenu(!hideMenu)} className="position: absolute bg-orange-300 top-0 right-0 w-16 h-16 rounded-full mr-3 mt-3 flex justify-center items-center z-20">
        {hideMenu && (
          <img className="w-4/12" src={burger} alt="" />
        )}
        {!hideMenu && (
          <img className="w-4/12" src={close} alt="" />
        )}
      </button>
      {!hideMenu && (
        <div className="position: relative bg-orange-300 rounded-2xl p-5 flex flex-col gap-10 m-10">
          <div>
            <h2 className="w-full font-bold text-2xl drop-shadow-xl shadow-black">Video</h2>
            <h2 className="w-full font-bold text-3xl drop-shadow-xl shadow-black">Games</h2>
            <Link className="w-full text-right font-bold text-white" to={"/games"}><h3 className="drop-shadow-xl shadow-black">View games list</h3></Link>
            <Link className="w-full text-right font-bold text-white" to={"/game/new"}><h3 className="drop-shadow-xl shadow-black">Register new game</h3></Link>
          </div>
          <div>
            <h2 className="w-full font-bold text-2xl drop-shadow-xl shadow-black">Game</h2>
            <h2 className="w-full font-bold text-3xl drop-shadow-xl shadow-black">Studios</h2>
            <Link className="w-full text-right font-bold text-white" to={"/studios"}><h3 className="drop-shadow-xl shadow-black">View studio list</h3></Link>
            <Link className="w-full text-right font-bold text-white" to={"/studio/new"}><h3 className="drop-shadow-xl shadow-black">Register new studio</h3></Link>
          </div>
          <div>
            <h2 className="w-full font-bold text-3xl drop-shadow-xl shadow-black">Genres</h2>
            <Link className="w-full text-right font-bold text-white" to={"/genres"}><h3 className="drop-shadow-xl shadow-black">View genre list</h3></Link>
            <Link className="w-full text-right font-bold text-white" to={"/genre/new"}><h3 className="drop-shadow-xl shadow-black">Register new Genre</h3></Link>
          </div>
        </div>
      )}

    </div>

  );
}
