import { Routes, Route } from 'react-router-dom';
import Page from './Page';
import AddSupplierPage from './pages/addsuppliers/AddSuppliersPage';
import DetailSupplier from './pages/detailsupplier/DetailPage';
import EditSupplierPage from './pages/editsupplier/EditPage';

function RouteOpname() {
    return (
        <Routes>
            <Route path="/" element={<Page />} />
            <Route path="/new" element={<AddSupplierPage />} />
            <Route path="/detail/:id" element={<DetailSupplier />} />
            <Route path="/edit/:id" element={<EditSupplierPage />} />
        </Routes>
    );
}

export default RouteOpname;
