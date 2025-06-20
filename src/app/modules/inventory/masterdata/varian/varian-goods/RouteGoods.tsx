import { Routes, Route } from 'react-router-dom';
import GoodsPage from './GoodsPage';
import DetailGoods from './pages/detail/DetailGoods';



function RouteVariantGoods() {
    return (
        <Routes>
            <Route path='/' element={<GoodsPage />} />
            <Route path='/detail-finish-goods' element={<DetailGoods />} />
        </Routes>
    );
}

export default RouteVariantGoods;
