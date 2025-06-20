import { Routes, Route } from 'react-router-dom';
import DetailService from './pages/detailservice/DetailService';
import ServicePage from './ServicePage';
import AddService from './pages/addservice/AddService';
import EditService from './pages/editservice/EditService';



function RouteLayanan() {
    return (
        <Routes>
            <Route path="/" element={<ServicePage />} />
            <Route path="/new" element={<AddService />} />
            <Route path="/detail/:id" element={<DetailService />} />
            <Route path="/edit/:id" element={<EditService />} />

            
            {/* <Route path="/" element={<MaterialsPage />} />
            <Route path="new" element={<AddMaterials />} />
            <Route path="/edit" element={<EditMaterials />} />
            <Route path="/detail-materials" element={<DetailMaterials />} /> */}
        </Routes>
    );
}

export default RouteLayanan;
