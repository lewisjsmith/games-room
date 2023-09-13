import { useState, useEffect, createContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import GameRoutes from "./routes/GameRoutes";
import GamesList from "./components/Games/GamesList";
import StudioRoutes from "./routes/StudioRoutes";
import StudiosList from "./components/Studios/StudiosList";
import GenreList from "./components/Genres/GenreList";
import GenreRoutes from "./routes/GenreRoutes";
import { ScreenContext } from "./ScreenContext";
import NavigationMobile from "./components/NavigationMobile";


function App() {

  const [mobile, setMobile] = useState(true);

  useEffect(() => {

    const mql = window.matchMedia("(min-width: 700px)").matches;
    setMobile(!mql);
  }, [])

  return (
    <ScreenContext.Provider value={mobile}>
      <div className="position: relative flex w-full h-full">
        <NavigationMobile />
        <div className="h-screen w-full">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/game/*" element={<GameRoutes />} />
            <Route path="/games" element={<GamesList />} />
            <Route path="/studio/*" element={<StudioRoutes />} />
            <Route path="/studios" element={<StudiosList />} />
            <Route path="/genre/*" element={<GenreRoutes />} />
            <Route path="/genres" element={<GenreList />} />
          </Routes>
        </div>
      </div>
    </ScreenContext.Provider>
  );
}

export default App;
