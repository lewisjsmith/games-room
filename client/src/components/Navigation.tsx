import { Link } from "react-router-dom";

export default function Navigation() {
  return (
        <div className="flex flex-col justify-start items-center h-screen w-3/12">
          <Link to={"/"}><h3 className="font-bold">Navigation bar</h3></Link>
          <Link to={"/games"}><p>Games List</p></Link>
          <Link to={"/game/new"}><p>New Game</p></Link>
          <Link to={"/studios"}><p>Studio List</p></Link>
          <Link to={"/studio/new"}><p>New Studio</p></Link>
          <Link to={"/genres"}><p>Genre List</p></Link>
          <Link to={"/genre/new"}><p>New Genre</p></Link>
        </div>
  );
}
