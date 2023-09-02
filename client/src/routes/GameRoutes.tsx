import { Route, Routes } from "react-router-dom";
import GameForm from "../components/Games/GameForm";
import GamePage from "../components/Games/GamePage";

export default function GameRoutes() {
    
    return (
        <Routes>
            <Route index element={<GameForm />} />
            <Route path="/new" element={<GameForm />} />
            <Route path="/:id" element={<GamePage />} />
        </Routes>
    );
}