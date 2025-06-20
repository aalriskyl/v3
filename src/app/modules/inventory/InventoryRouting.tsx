import { Routes, Route } from 'react-router-dom';
import PengajuanRouting from './pengajuan/RoutePengajuan';
import LaporanRouting from './laporan/RouteLaporan';
import MasterDataInventoryRouting from './masterdata/MasterDataInventoryRouting';


function InventoryRouting() {
    return (
        <Routes>
            <Route path="masterdata/*" element={<MasterDataInventoryRouting />} />
            <Route path="pengajuan/*" element={<PengajuanRouting />} />
            <Route path="laporan/*" element={<LaporanRouting />} />

        </Routes>

    );
}

export default InventoryRouting;
