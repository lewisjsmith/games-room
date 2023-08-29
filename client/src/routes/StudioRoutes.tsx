import { Route, Routes } from "react-router-dom";
import StudioForm from "../components/Studios/StudioForm";

export default function StudioRoutes() {
    
    return (
        <Routes>
            <Route index element={<StudioForm />} />
            <Route path="/:id" element={<StudioForm />} />
            <Route path="/new" element={<StudioForm />} />
        </Routes>
    );
}