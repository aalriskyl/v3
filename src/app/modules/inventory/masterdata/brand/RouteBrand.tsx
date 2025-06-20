import { Routes, Route } from 'react-router-dom';
import BrandPage from './BrandPage';
import AddBrand from './pages/addbrand/AddBrand';
import DetailBrand from './pages/detailbrand/DetailBrand';
import EditBrandPage from './pages/editbrand/EditBrand';


function RouteBrand() {
    return (
        <Routes>
            <Route path="/" element={<BrandPage />} />
            <Route path="new" element={<AddBrand />} />
            <Route path="/detail/:id" element={<DetailBrand />} />
            <Route path="/edit/:id" element={<EditBrandPage />} />
        </Routes>
    );
}

export default RouteBrand;
