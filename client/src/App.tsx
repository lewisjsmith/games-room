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
import Hamburger from "./components/Hamburger";
import ErrorPage from "./components/ErrorPage";


function App() {

  const [mobile, setMobile] = useState(true);
  const [menu, setMenu] = useState(false);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 700px)").matches;
    setMobile(!mql);
  }, [])

  function toggleMenu() {
    setMenu(!menu);
  }

  function toggleFade() {
    setFade(!fade);
  }

  return (
    <ScreenContext.Provider value={mobile}>
      <div className="position: relative flex w-full h-full">

        {fade && <div className="position: absolute top-0 left-0 bg-black bg-opacity-50 w-full h-full z-40"></div>}

        {mobile && <Hamburger menu={menu} toggleMenu={toggleMenu} />}

        {mobile && menu && (
          < NavigationMobile toggleMenu={toggleMenu} />
        )}

        {!mobile && (
          < Navigation />
        )}

        <div className="h-screen w-full">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/game/*" element={<GameRoutes toggleFade={toggleFade} />} />
            <Route path="/games" element={<GamesList />} />
            <Route path="/studio/*" element={<StudioRoutes toggleFade={toggleFade}/>} />
            <Route path="/studios" element={<StudiosList />} />
            <Route path="/genre/*" element={<GenreRoutes toggleFade={toggleFade}/>} />
            <Route path="/genres" element={<GenreList />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    </ScreenContext.Provider>
  );
}

export default App;
