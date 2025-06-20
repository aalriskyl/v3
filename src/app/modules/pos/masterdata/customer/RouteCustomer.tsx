import { Routes, Route } from 'react-router-dom';
import DetailCategory from './pages/detailcategory/DetailCustomer';
import EditCategory from './pages/editcategory/EditCustomer';
import AddMeja from './pages/add/AddCustomer';
import CostumerPage from './CustomerPage';



function RouteCustomer() {
    return (
        <Routes>
            <Route path="/" element={<CostumerPage />} />
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

export default RouteCustomer;
