import { Routes, Route } from 'react-router-dom';
import CategoryPage from './JenisMejaPage';
import AddCategory from './pages/addjenismeja/AddJenisMeja';
import EditJenisMeja from './pages/editjenismeja/EditJenisMeja';



function RouteJenisMeja() {
    return (
        <Routes>
            <Route path="/" element={<CategoryPage />} />
            <Route path="/new" element={<AddCategory />} />
            {/* <Route path="/detail/:id" element={<DetailCategory />} /> */}
            <Route path="/edit/:id" element={<EditJenisMeja />} />
            {/* <Route path="/" element={<MaterialsPage />} />
            <Route path="new" element={<AddMaterials />} />
            <Route path="/edit" element={<EditMaterials />} />
            <Route path="/detail-materials" element={<DetailMaterials />} /> */}
        </Routes>
    );
}

export default RouteJenisMeja;
