import { Routes, Route } from 'react-router-dom';
import RouteRequestMaterial from './request-material/Route';
import RouteCatatanPengiriman from './catatan-pengiriman/RouteCatatanPengiriman';
import RouteCatatanPenerimaan from './catatan-penerimaan/RouteCatatanPenerimaan';

function RouteManajemenPengiriman() {
    return (
        <Routes>
            <Route path="material-request/*" element={<RouteRequestMaterial />} />
            <Route path="catatan-pengiriman/*" element={<RouteCatatanPengiriman />} />
            <Route path="catatan-penerimaan/*" element={<RouteCatatanPenerimaan/>} />

        </Routes>
    );
}
export default RouteManajemenPengiriman;
