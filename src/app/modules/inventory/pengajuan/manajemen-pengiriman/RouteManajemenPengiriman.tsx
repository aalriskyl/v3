import { Routes, Route } from "react-router-dom";
import RouteRequestMaterial from "./request-material/Route";
import RouteCatatanPengiriman from "./catatan-pengiriman/RouteCatatanPengiriman";
import RouteCatatanPenerimaan from "./catatan-penerimaan/RouteCatatanPenerimaan";
import RouteReturPenjualan from "./retur-penjualan/RouteRetur";
import RouteReturPembelian from "./retur-pembelian/RouteRetur";

function RouteManajemenPengiriman() {
  return (
    <Routes>
      <Route path="material-request/*" element={<RouteRequestMaterial />} />
      <Route path="catatan-pengiriman/*" element={<RouteCatatanPengiriman />} />
      <Route path="catatan-penerimaan/*" element={<RouteCatatanPenerimaan />} />
      <Route path="retur-penjualan/*" element={<RouteReturPenjualan />} />
      <Route path="retur-pembelian/*" element={<RouteReturPembelian />} />

    </Routes>
  );
}
export default RouteManajemenPengiriman;
