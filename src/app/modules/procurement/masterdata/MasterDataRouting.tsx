import { Routes, Route } from 'react-router-dom';
import RouteSupplier from './suppliers/RouteSuppliers';



function MasterDataProcurementRouting() {
    return (
        <Routes>
            <Route path="suppliers/*" element={<RouteSupplier />} />
        </Routes>
    );
}

export default MasterDataProcurementRouting;
