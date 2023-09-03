import { Route, Routes } from "react-router-dom";
import StudioForm from "../components/Studios/StudioForm";
import StudioPage from "../components/Studios/StudioPage";

export default function StudioRoutes() {
    
    return (
        <Routes>
            <Route index element={<StudioForm />} />
            <Route path="/:id" element={<StudioPage />} />
            <Route path="/new" element={<StudioForm />} />
        </Routes>
    );
}