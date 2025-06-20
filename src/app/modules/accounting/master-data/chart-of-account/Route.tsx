import { Routes, Route } from "react-router-dom";
import CoaPage from "./CoaPage";
import AddCoa from "./pages/addpage/AddPage";
import EditPage from "./pages/editpage/EditPage";
import DetailPage from "./pages/detailpage/DetailPage";


function ChartOfAccountRoute() {
    return (
        <Routes>
            <Route path="" element={<CoaPage />} />
            <Route path="new" element={<AddCoa />} />
            <Route path="edit/:id" element={<EditPage />} />
            <Route path="detail/:id" element={<DetailPage />} />

        </Routes>
    );
}

export default ChartOfAccountRoute;
