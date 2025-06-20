import { Routes, Route } from "react-router-dom";
import RouteStockManagement from "./stock-management/RouteStockManagement";
import RouteManajemenPengiriman from "./manajemen-pengiriman/RouteManajemenPengiriman";

function LaporanRouting() {
  return (
    <Routes>
      <Route
        path="manajemen-pengiriman/*"
        element={<RouteManajemenPengiriman />}
      />
      <Route path="manajemen-stok/*" element={<RouteStockManagement />} />
      {/* <Route path="manajemen-stok/stock-card/*" element={} />  STOK CARD */}
      {/* <Route path="manajemen-stok/stock-ledger/*" element={} />  STOK LEDGER */}
    </Routes>
  );
}

export default LaporanRouting;
