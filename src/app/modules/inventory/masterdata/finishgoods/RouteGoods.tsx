import { Routes, Route } from 'react-router-dom';
import GoodsPage from './GoodsPage';
import DetailGoods from './pages/detail/DetailGoods';



function RouteGoods() {
    return (
        <Routes>
            <Route path='/' element={<GoodsPage />} />
            <Route path='/detail/:id' element={<DetailGoods />} />
        </Routes>
    );
}

export default RouteGoods;
