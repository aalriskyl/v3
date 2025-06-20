import { Routes, Route } from "react-router-dom";
import PembukuanPerusahaanRoute from "./pembukuan-perusahaan/Route";
// import RouteAccountPayable from "./account-payable/Route";
// import RouteAccountReceivable from "./account-receivable/Route";
// import MasterDataAccounting from "./master-data/MasterDataAccountingRoute";

function ManajemenPembukuanRoute() {
  return (
    <Routes>
     <Route path="pembukuan-perusahaan/*" element={<PembukuanPerusahaanRoute />} />
    </Routes>
  );
}

export default ManajemenPembukuanRoute;
