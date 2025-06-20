import { Routes, Route } from "react-router-dom";
import RouteAccountPayable from "./account-payable/Route";
import RouteAccountReceivable from "./account-receivable/Route";
// import MasterDataAccounting from "./master-data/MasterDataAccountingRoute";

function ManajemenTransaksiRoute() {
  return (
    <Routes>
      <Route path="purchase-order/*" element={<RouteAccountPayable />} />
      <Route path="sales-order/*" element={<RouteAccountReceivable />} />
    </Routes>
  );
}

export default ManajemenTransaksiRoute;
