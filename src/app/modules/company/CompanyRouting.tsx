import { Routes, Route } from 'react-router-dom';
import PerusahaanRouting from './perusahaan/RoutePerusahaan';


function CompanyRouting() {
    return (
        <Routes>
            <Route path="perusahaan/*" element={<PerusahaanRouting />} />
        </Routes>
    );
}

export default CompanyRouting;
