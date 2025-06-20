import { Routes, Route } from 'react-router-dom';
import RoutePurchaseOrder from './purchase-order/Route';
import RouteFakturPembelian from './faktur-pembelian/Route';
import RoutePembayaranFakturPembelian from './pembayaran-faktur-pembelian/Route';

function PengajuanRouting() {
    return (
        <Routes>
            <Route path="purchase-request/*" element={<RoutePurchaseOrder />} />
            <Route path="faktur-pembelian/*" element={<RouteFakturPembelian />} />
            <Route path="pembayaran-faktur-pembelian/*" element={<RoutePembayaranFakturPembelian />} />

        </Routes>

    );
}

export default PengajuanRouting;
