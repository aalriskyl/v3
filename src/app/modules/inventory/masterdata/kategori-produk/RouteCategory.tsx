import { Routes, Route } from 'react-router-dom';
import CategoryPage from './CategoryPage';
import AddCategory from './pages/addcategory/AddCategory';
import DetailCategory from './pages/detailcategory/DetailCategory';
import EditCategory from './pages/editcategory/EditCategory';



function RouteCategory() {
    return (
        <Routes>
            <Route path="/" element={<CategoryPage />} />
            <Route path="/new" element={<AddCategory />} />
            <Route path="/detail/:id" element={<DetailCategory />} />
            <Route path="/edit/:id" element={<EditCategory />} />
            {/* <Route path="/" element={<MaterialsPage />} />
            <Route path="new" element={<AddMaterials />} />
            <Route path="/edit" element={<EditMaterials />} />
            <Route path="/detail-materials" element={<DetailMaterials />} /> */}
        </Routes>
    );
}

export default RouteCategory;
