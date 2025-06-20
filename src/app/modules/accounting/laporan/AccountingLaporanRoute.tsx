import { Routes, Route } from "react-router-dom";
import JurnalRoute from "./jurnal/Route";
import BukuBesarRoute from "./buku-besar/Route";


function LaporanRoute() {
  return (
    <Routes>
     <Route path="jurnal/*" element={<JurnalRoute />} />
     <Route path="buku-besar/*" element={<BukuBesarRoute />} />

    </Routes>
  );
}

export default LaporanRoute;
