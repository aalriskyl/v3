import { Routes, Route } from 'react-router-dom';
import AddLayanan from './pages/add/AddLayanan';
import EditLayanan from './pages/edit/EditLayanan';
import PegawaiPage from './PegawaiPage';
import DetailKaryawan from './pages/detail/DetailLayanan';



function RoutePegawai() {
    return (
        <Routes>
            <Route path="/" element={<PegawaiPage />} />
            <Route path="/new" element={<AddLayanan />} />
            <Route path="/detail/:id" element={<DetailKaryawan />} />
            <Route path="/edit/:id" element={<EditLayanan />} />
            {/* <Route path="/" element={<MaterialsPage />} />
            <Route path="new" element={<AddMaterials />} />
            <Route path="/edit" element={<EditMaterials />} />
            <Route path="/detail-materials" element={<DetailMaterials />} /> */}
        </Routes>
    );
}

export default RoutePegawai;
