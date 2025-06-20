import { Routes, Route } from "react-router-dom";
import CoaPage from "./Page";
import EditPage from "./pages/editpage/EditPage";



function PembukuanPerusahaanRoute() {
    return (
        <Routes>
            <Route path="" element={<CoaPage />} />
            <Route path="edit" element={<EditPage />} />
        </Routes>
    );
}

export default PembukuanPerusahaanRoute;
