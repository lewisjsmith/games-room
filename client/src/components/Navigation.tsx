import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <div>
      <h3>Navigation bar</h3>
      <Link to={"/games"}><p>Games List</p></Link>
      <Link to={"/game/create"}><p>New Game</p></Link>
      <Link to={"/studios"}><p>Studio List</p></Link>
      <Link to={"/studio/create"}><p>New Studio</p></Link>
    </div>
  );
}
