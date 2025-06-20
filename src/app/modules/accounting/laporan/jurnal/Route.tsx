import { Routes, Route } from "react-router-dom";
import ModulePage from "./ModulePage";
import AddPage from "./pages/addpage/AddPage";
import EditPage from "./pages/editpage/EditPage";
import DetailPage from "./pages/detailpage/DetailPage";


function JurnalRoute() {
    return (
        <Routes>
            <Route path="" element={<ModulePage />} />
            <Route path="new" element={<AddPage />} />
            <Route path="edit/:id" element={<EditPage />} />
            <Route path="detail/:id" element={<DetailPage />} />

        </Routes>
    );
}

export default JurnalRoute;
