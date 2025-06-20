import { Routes, Route } from "react-router-dom";
// import Page from './entry-stock/Page';
import RouteEntry from "./entry-stock/Route";
import RouteOpname from "./stock-opname/Route";
import RouteStockLedger from "./stock-ledger/RouteStockLedger";
import RouteStokCard from "./stok-card/Route";
import RouteJournalLedger from "./stock-journal/RouteStockLedger";
import RouteStockBalance from "./stok-balance/Route";

function RouteStockManagement() {
  return (
    <Routes>
      <Route path="entry-stock/*" element={<RouteEntry />} />
      <Route path="stock-opname/*" element={<RouteOpname />} />
      <Route path="stock-card/*" element={<RouteStokCard />} />
      <Route path="stock-ledger/*" element={<RouteStockLedger />} />
      <Route path="stock-journal/*" element={<RouteJournalLedger />} />
      <Route path="stock-balance/*" element={<RouteStockBalance />} />
    </Routes>
  );
}
export default RouteStockManagement;
