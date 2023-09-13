import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="flex flex-col justify-center items-center gap-5 ml-5 mr-5">
        <h1 className="font-bold text-3xl text-center">Welcome to Games Room inventory management</h1>
        <h2 className="text-center text-lg">Track your rental stock with this tool.</h2>
        <Link to={"/games"}><button className="bg-orange-300 box-border pl-6 pr-6 pt-3 pb-3 rounded-lg font-bold shadow-lg">BEGIN</button></Link>
      </div>
    </div>
  );
}
