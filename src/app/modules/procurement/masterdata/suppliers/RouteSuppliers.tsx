import { Routes, Route } from 'react-router-dom';
import SuppliersPage from './SuppliersPage';
import AddSupplierPage from './pages/addsuppliers/AddSuppliersPage';
import DetailSupplier from './pages/detailsupplier/DetailSupplier';
import EditSupplierPage from './pages/editsupplier/EditSupplier';

function RouteSupplier() {
    return (
        <Routes>
            <Route path="/" element={<SuppliersPage />} />
            <Route path="new" element={<AddSupplierPage />} />
            <Route path="detail/:id" element={<DetailSupplier />} />
            <Route path="edit/:id" element={<EditSupplierPage />} />
        </Routes>
    );
}

export default RouteSupplier;
