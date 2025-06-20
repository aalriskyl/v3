import { Routes, Route } from 'react-router-dom';
import MaterialsPage from './MaterialsPage';
import AddMaterials from './pages/addmaterials/AddMaterials';
import EditMaterials from './pages/editmaterials/EditMaterials';
import EditUom from './pages/editmaterials/EditUom';
import DetailMaterials from './pages/detailmaterials/DetailMaterials';
import UomMaterials from './pages/detailmaterials/DetailUom';
import AddUom from './pages/addmaterials/AddUom';



function RouteMaterials() {
    return (
        <Routes>
            <Route path="/" element={<MaterialsPage />} />
            <Route path="new" element={<AddMaterials />} />
            <Route path="new/tambahuom" element={<AddUom />} />
            <Route path="/editmaterial/:id" element={<EditMaterials />} />
            <Route path="/edituom/:uomId" element={<EditUom />} />
            <Route path="/detailmaterial/:materialId/newuom" element={<AddUom />} />
            <Route path="/detailmaterial/:materialId" element={<DetailMaterials />} />
            <Route path="/detailuom/:id" element={<UomMaterials />} />

        </Routes>
    );
}

export default RouteMaterials;
