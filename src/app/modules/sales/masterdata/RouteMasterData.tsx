import { Routes, Route } from 'react-router-dom';
import RouteCustomer from './customer/RouteCustomer';

function MasterDataRouting() {
    return (
        <Routes>
            <Route path="customers/*" element={<RouteCustomer />} />

        </Routes>

    );
}

export default MasterDataRouting;
