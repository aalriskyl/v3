import { Routes, Route } from 'react-router-dom';
import DetailCategory from './pages/detailcategory/DetailCategory';
import EditCategory from './pages/editcategory/EditCategory';
import AddMeja from './pages/addmeja/AddMeja';
import MejaPage from './MejaPage';



function RouteMeja() {
    return (
        <Routes>
            <Route path="/" element={<MejaPage />} />
            <Route path="/new" element={<AddMeja />} />
            <Route path="/detail/:id" element={<DetailCategory />} />
            <Route path="/edit/:id" element={<EditCategory />} />
            {/* <Route path="/" element={<MaterialsPage />} />
            <Route path="new" element={<AddMaterials />} />
            <Route path="/edit" element={<EditMaterials />} />
            <Route path="/detail-materials" element={<DetailMaterials />} /> */}
        </Routes>
    );
}

export default RouteMeja;
