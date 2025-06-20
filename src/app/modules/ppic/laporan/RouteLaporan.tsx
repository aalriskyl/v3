import { Routes, Route } from 'react-router-dom';
import RoutePlanProduction from './plan-production/RoutePlanProduction';


function LaporanRouting() {
    return (
        <Routes>
            <Route path="plan-production/*" element={<RoutePlanProduction />} />

        </Routes>

    );
}

export default LaporanRouting;
