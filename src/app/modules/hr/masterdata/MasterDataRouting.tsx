import { Routes, Route } from 'react-router-dom';
import RoutePegawai from './pegawai/RoutePegawai';
import RouteJabatan from './jabatan/RouteJabatan';



function MasterDataRouting() {
    return (
        <Routes>
            <Route path="/pegawai/*" element={<RoutePegawai />} />
            <Route path="/jabatan/*" element={<RouteJabatan/>} />
        </Routes>
    );
}

export default MasterDataRouting;
