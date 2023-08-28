import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import GameRoutes from "./routes/GameRoutes";
import GameForm from "./components/GameForm";
import GameTile from "./components/GameTile";
import GamesList from "./components/GamesList";
import StudioRoutes from "./routes/StudioRoutes";
import StudioForm from "./components/StudioForm";

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/game/*" element={<GameRoutes />} />
        <Route path="/games" element={<GamesList />} />
        <Route path="/studio/*" element={<StudioRoutes />} />
      </Routes>
    </div>
  );
}

export default App;
