import { Routes, Route } from 'react-router-dom';
import RoutePenawaran from './penawaran/PenawaranRouting';

function PengajuanRouting() {
    return (
        <Routes>
            <Route path="penawaran/*" element={<RoutePenawaran />} />
        </Routes>

    );
}

export default PengajuanRouting;
