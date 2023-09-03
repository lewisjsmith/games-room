import { Route, Routes } from "react-router-dom";
import GenrePage from "../components/Genres/GenrePage";

export default function GenreRoutes() {
    
    return (
        <Routes>
            <Route index element={<GenrePage />} />
            <Route path="/:id" element={<GenrePage />} />
            <Route path="/new" element={<GenrePage />} />
        </Routes>
    );
}