import { Routes, Route } from 'react-router-dom';
import Page from './Page';
import DetailSupplier from './pages/detailsupplier/DetailPage';

function RouteEntry() {
    return (
        <Routes>
            <Route path="/" element={<Page />} />
            <Route path="/detail/:id" element={<DetailSupplier />} />
        </Routes>
    );
}

export default RouteEntry;
