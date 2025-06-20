import { Routes, Route } from 'react-router-dom';
import CustomerPage from './CustomerPage';
import AddCustomerPage from './pages/addcustomer/AddCustomer';
import DetailCustomer from './pages/detailcustomer/DetailCustomer';
import EditCustomerPage from './pages/detailcustomer/EditCustomer';

function RouteCustomer() {
    return (
        <Routes>
            <Route path="/" element={<CustomerPage />} />
            <Route path="/new" element={<AddCustomerPage />} />
            <Route path="/detail-customer/:id" element={<DetailCustomer />} />
            <Route path="/edit/:id" element={<EditCustomerPage />} />
        </Routes>
    );
}

export default RouteCustomer;
