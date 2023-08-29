import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import GameRoutes from "./routes/GameRoutes";
import GameForm from "./components/Games/GameForm";
import GameTile from "./components/Games/GameTile";
import GamesList from "./components/Games/GamesList";
import StudioRoutes from "./routes/StudioRoutes";
import StudioForm from "./components/Studios/StudioForm";

function App() {
  return (
    <div className="flex">
      <Navigation />
      <div className="h-screen w-full">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/game/*" element={<GameRoutes />} />
          <Route path="/games" element={<GamesList />} />
          <Route path="/studio/*" element={<StudioRoutes />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
