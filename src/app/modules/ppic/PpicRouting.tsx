import { Routes, Route } from 'react-router-dom';
import MasterDataPpicRouting from './masterdata/MasterDataPpicRouting';
import PengajuanRouting from './pengajuan/RoutePengajuan';
import LaporanRouting from './laporan/RouteLaporan';


function PpicRouting() {
    return (
        <Routes>
            <Route path="masterdata/*" element={<MasterDataPpicRouting />} />
            <Route path="pengajuan/*" element={<PengajuanRouting />} />
            <Route path="laporan/*" element={<LaporanRouting />} />

        </Routes>

    );
}

export default PpicRouting;
