import { Route, Routes } from "react-router-dom";
import GameForm from "../components/Games/GameForm";

export default function GameRoutes() {
    
    return (
        <Routes>
            <Route index element={<GameForm />} />
            <Route path="/:id" element={<GameForm />} />
            <Route path="/new" element={<GameForm />} />
        </Routes>
    );
}