import { Routes, Route } from 'react-router-dom';
import MasterDataRouting from './masterdata/MasterDataRouting';



function HrRouting() {
    return (
        <Routes>
            <Route path="/masterdata/*" element={<MasterDataRouting />} />
        </Routes>
    );
}

export default HrRouting;
