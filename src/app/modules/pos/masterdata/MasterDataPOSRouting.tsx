import { Routes, Route } from "react-router-dom";
import RouteJenisMeja from "./jenis-meja/RouteJenisMeja";
import RouteMeja from "./meja/RouteMeja";
import RouteCustomer from "./customer/RouteCustomer";

function MasterDataPOSRouting() {
  return (
    <Routes>
      <Route path="costumer/*" element={<RouteCustomer />} />
      <Route path="meja/*" element={<RouteMeja/>}/>
      <Route path="jenis-meja/*" element={<RouteJenisMeja/>} />

    </Routes>
  );
}

export default MasterDataPOSRouting;
