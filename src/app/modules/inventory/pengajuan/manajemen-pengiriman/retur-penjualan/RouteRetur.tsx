import { Routes, Route } from "react-router-dom";
import Page from "./Page";
import AddPage from "./pages/add/AddPage";
import DetailPage from "./pages/detail/DetailPage";
import EditPage from "./pages/edit/EditPage";

function RouteReturPenjualan() {
  return (
    <Routes>
      <Route path="/" element={<Page />} />
      <Route path="/new" element={<AddPage />} />
      <Route path="/detail/:id" element={<DetailPage />} />
      <Route path="/edit/:id" element={<EditPage />} />
    </Routes>
  );
}

export default RouteReturPenjualan;
