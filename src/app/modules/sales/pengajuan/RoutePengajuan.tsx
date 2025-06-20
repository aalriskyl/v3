import { Routes, Route } from 'react-router-dom';
import RouteRequestOrder from './sales-order/Route';
import RouteFakturPenjualan from './faktur-penjualan/Route';
import RoutePembayaranFakturPenjualan from './pembayaran-faktur-penjualan/Route';

function PengajuanRouting() {
    return (
        <Routes>
            <Route path="request-order/*" element={<RouteRequestOrder />} />
            <Route path="faktur-penjualan/*" element={<RouteFakturPenjualan />} />
            <Route path="pembayaran-faktur-penjualan/*" element={<RoutePembayaranFakturPenjualan />} />

        </Routes>

    );
}

export default PengajuanRouting;
