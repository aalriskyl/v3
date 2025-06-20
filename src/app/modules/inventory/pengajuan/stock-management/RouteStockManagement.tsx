import { Routes, Route } from 'react-router-dom';
// import Page from './entry-stock/Page';
import RouteEntry from './entry-stock/Route';
import RouteOpname from './stock-opname/Route';

function RouteStockManagement() {
    return (
        <Routes>
            <Route path="entry-stock/*" element={<RouteEntry />} />
            <Route path="stock-opname/*" element={<RouteOpname />} />

        </Routes>
    );
}
export default RouteStockManagement;
