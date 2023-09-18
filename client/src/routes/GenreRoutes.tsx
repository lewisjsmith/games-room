import { Route, Routes } from "react-router-dom";
import GenrePage from "../components/Genres/GenrePage";
import GenreForm from "../components/Genres/GenreForm";

export default function GenreRoutes(props: FadeFunction) {
    
    return (
        <Routes>
            <Route index element={<GenreForm />} />
            <Route path="/:id" element={<GenrePage toggleFade={props.toggleFade}/>} />
            <Route path="/new" element={<GenreForm />} />
        </Routes>
    );
}

interface FadeFunction {
    toggleFade: ()=> void
}