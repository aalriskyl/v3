import { Routes, Route } from "react-router-dom";
import Page from "./Page";
import Detail from "./pages/detailsupplier/DetailPage";

function RouteStockBalance() {
  return (
    <Routes>
      <Route path="/" element={<Page />} />
      {/* <Route path="/detail/:id" element={<Detail />} /> */}
    </Routes>
  );
}

export default RouteStockBalance;
