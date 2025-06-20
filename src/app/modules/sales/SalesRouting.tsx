import { Routes, Route } from 'react-router-dom';
import MasterDataRouting from './masterdata/RouteMasterData';
import PengajuanRouting from './pengajuan/RoutePengajuan';

function SalesRouting() {
    return (
        <Routes>
            <Route path="masterdata/*" element={<MasterDataRouting />} />
            <Route path="pengajuan/*" element={<PengajuanRouting />} />
        </Routes>
    );
}

export default SalesRouting;
