import { Routes, Route } from 'react-router-dom';
import PengajuanRouting from './pengajuan/PengajuanRouting';


function CRMRouting() {
    return (
        <Routes>
            {/* <Route path="masterdata/*" element={<MasterDataInventoryRouting />} /> */}
            <Route path="pengajuan/*" element={<PengajuanRouting />} />
            {/* <Route path="laporan/*" element={<LaporanRouting />} /> */}

        </Routes>

    );
}

export default CRMRouting;
