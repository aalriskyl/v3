import { Routes, Route } from 'react-router-dom';
import DetailLayanan from './pages/detailuom/DetailUom';
import AddLayanan from './pages/adduom/AddUom';
import EditLayanan from './pages/edituom/EditUom';
import LayananPage from './UomPage';
import DetailUom from './pages/detailuom/DetailUom';



function RouteUom() {
    return (
        <Routes>
            <Route path="/" element={<LayananPage />} />
            <Route path="/new" element={<AddLayanan />} />
            <Route path="/detail/:id" element={<DetailUom />} />
            <Route path="/edit/:id" element={<EditLayanan />} />
            {/* <Route path="/" element={<MaterialsPage />} />
            <Route path="new" element={<AddMaterials />} />
            <Route path="/edit" element={<EditMaterials />} />
            <Route path="/detail-materials" element={<DetailMaterials />} /> */}
        </Routes>
    );
}

export default RouteUom;
