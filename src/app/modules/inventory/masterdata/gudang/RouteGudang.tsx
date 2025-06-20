import { Routes, Route } from "react-router-dom";
import AddGudang from "./pages/addgudang/AddGudang";
import EditGudang from "./pages/editgudang/EditGudang";
import GudangPage from "./GudangPage";
import DetailGudang from "./pages/detailgudang/DetailGudang";

function RouteGudang() {
  return (
    <Routes>
      <Route path="/" element={<GudangPage />} />
      <Route path="/new" element={<AddGudang />} />
      <Route path="/detail/:id" element={<DetailGudang />} />
      <Route path="/edit/:id" element={<EditGudang />} />
      {/* <Route path="/" element={<MaterialsPage />} />
            <Route path="new" element={<AddMaterials />} />
            <Route path="/edit" element={<EditMaterials />} />
            <Route path="/detail-materials" element={<DetailMaterials />} /> */}
    </Routes>
  );
}

export default RouteGudang;
