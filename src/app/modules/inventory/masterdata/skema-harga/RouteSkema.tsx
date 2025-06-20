import { Routes, Route } from 'react-router-dom';
import SkemaPage from './SkemaPage';
import AddSkema from './pages/addskema/AddSkema';
import DetailSkema from './pages/detailskema/DetailSkema';
import EditSkema from './pages/editskema/EditSkema';



function RouteSkema() {
    return (
        <Routes>
            <Route path="/" element={<SkemaPage />} />
            <Route path="/new" element={<AddSkema />} />
            <Route path="/detail/:id" element={<DetailSkema />} />
            <Route path="/edit/:id" element={<EditSkema />} />
            {/* <Route path="/" element={<MaterialsPage />} />
            <Route path="new" element={<AddMaterials />} />
            <Route path="/edit" element={<EditMaterials />} />
            <Route path="/detail-materials" element={<DetailMaterials />} /> */}
        </Routes>
    );
}

export default RouteSkema;
