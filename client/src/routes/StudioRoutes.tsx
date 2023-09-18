import { Route, Routes } from "react-router-dom";
import StudioForm from "../components/Studios/StudioForm";
import StudioPage from "../components/Studios/StudioPage";

export default function StudioRoutes(props: FadeFunction) {
    
    return (
        <Routes>
            <Route index element={<StudioForm />} />
            <Route path="/:id" element={<StudioPage toggleFade={props.toggleFade}/>} />
            <Route path="/new" element={<StudioForm />} />
        </Routes>
    );
}

interface FadeFunction {
    toggleFade: ()=> void
}