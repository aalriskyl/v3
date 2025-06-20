import { Routes, Route } from 'react-router-dom';
import Page from './Page';
import AddSupplierPage from './pages/addsuppliers/AddEntryStock';
import DetailSupplier from './pages/detailsupplier/DetailPage';
import EditSupplierPage from './pages/editsupplier/EditPage';

function RouteEntry() {
    return (
        <Routes>
            <Route path="/" element={<Page status='' />} />
            <Route path="/new" element={<AddSupplierPage />} />
            <Route path="/detail/:id" element={<DetailSupplier />} />
            <Route path="/edit/:id" element={<EditSupplierPage />} />
        </Routes>
    );
}

export default RouteEntry;
