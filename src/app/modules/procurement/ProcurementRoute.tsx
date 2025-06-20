import { Routes, Route } from 'react-router-dom';
import PengajuanRouting from './pengajuan/RoutePengajuan';
import MasterDataProcurementRouting from './masterdata/MasterDataRouting';


function ProcurementRouting() {
    return (
        <Routes>
            <Route path="masterdata/*" element={<MasterDataProcurementRouting />} />
            <Route path="pengajuan/*" element={<PengajuanRouting />} />

        </Routes>

    );
}

export default ProcurementRouting;
