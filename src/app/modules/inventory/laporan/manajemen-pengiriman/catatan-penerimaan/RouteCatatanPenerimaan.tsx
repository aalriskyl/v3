import { Routes, Route } from 'react-router-dom';
import Page from './Page';
import DetailPage from './pages/detail/DetailPage';


function RouteCatatanPenerimaan() {
    return (
        <Routes>
            <Route path="/" element={<Page />} />
            <Route path="/detail/:id" element={<DetailPage />} />
        </Routes>
    );
}

export default RouteCatatanPenerimaan;
