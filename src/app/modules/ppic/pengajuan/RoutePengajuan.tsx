import { Routes, Route } from 'react-router-dom';
import RoutePlanProduction from './plan-production/RoutePlanProduction';


function PengajuanRouting() {
    return (
        <Routes>
            <Route path="plan-production/*" element={<RoutePlanProduction />} />

        </Routes>

    );
}

export default PengajuanRouting;
