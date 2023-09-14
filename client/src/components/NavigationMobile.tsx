import { Link } from "react-router-dom";
import home from "../public/assets/home.svg"

export default function NavigationMobile(props) {

  return (
    <div className="position: absolute z-20 w-[calc(100%-5rem)] h-[calc(100%-5rem)] bg-orange-300 rounded-2xl p-5 flex flex-col gap-10 m-10">
      <div>
        <h2 className="w-full font-bold text-2xl drop-shadow-xl shadow-black">Video</h2>
        <h2 className="w-full font-bold text-3xl drop-shadow-xl shadow-black">Games</h2>
        <Link onClick={() => props.toggleMenu()} className="w-full text-right font-bold text-white" to={"/games"}><h3 className="drop-shadow-xl shadow-black">View games list</h3></Link>
        <Link onClick={() => props.toggleMenu()} className="w-full text-right font-bold text-white" to={"/game/new"}><h3 className="drop-shadow-xl shadow-black">Register new game</h3></Link>
      </div>
      <div>
        <h2 className="w-full font-bold text-2xl drop-shadow-xl shadow-black">Game</h2>
        <h2 className="w-full font-bold text-3xl drop-shadow-xl shadow-black">Studios</h2>
        <Link onClick={() => props.toggleMenu()} className="w-full text-right font-bold text-white" to={"/studios"}><h3 className="drop-shadow-xl shadow-black">View studio list</h3></Link>
        <Link onClick={() => props.toggleMenu()} className="w-full text-right font-bold text-white" to={"/studio/new"}><h3 className="drop-shadow-xl shadow-black">Register new studio</h3></Link>
      </div>
      <div>
        <h2 className="w-full font-bold text-3xl drop-shadow-xl shadow-black">Genres</h2>
        <Link onClick={() => props.toggleMenu()} className="w-full text-right font-bold text-white" to={"/genres"}><h3 className="drop-shadow-xl shadow-black">View genre list</h3></Link>
        <Link onClick={() => props.toggleMenu()} className="w-full text-right font-bold text-white" to={"/genre/new"}><h3 className="drop-shadow-xl shadow-black">Register new Genre</h3></Link>
      </div>
      <div className="position: absolute bottom-0 left-2/4 -translate-x-2/4 -translate-y-2">
        <button type="button">
          <Link to={"/"} onClick={() => props.toggleMenu()}>
            <img src={home} className="w-16" alt="" />
          </Link>
        </button>
      </div>
    </div>

  );
}
