import { Routes, Route } from "react-router-dom";
import ChartOfAccountRoute from "./chart-of-account/Route";
import TermPaymentRoute from "./term-payment/Route";

function MasterDataAccounting() {
    return (
        <Routes>
            <Route path="chart-of-account/*" element={<ChartOfAccountRoute />} />
            <Route path="payment-term/*" element={<TermPaymentRoute />} />

        </Routes>
    );
}

export default MasterDataAccounting;
