import { Routes, Route } from 'react-router-dom';
import RouteStockManagement from './stock-management/RouteStockManagement';
import RouteManajemenPengiriman from './manajemen-pengiriman/RouteManajemenPengiriman';


function PengajuanRouting() {
    return (
        <Routes>
            <Route path="manajemen-pengiriman/*" element={<RouteManajemenPengiriman />} />
            <Route path="manajemen-stok/*" element={<RouteStockManagement />} />

        </Routes>

    );
}

export default PengajuanRouting;
