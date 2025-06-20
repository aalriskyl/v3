import { Routes, Route } from 'react-router-dom';
import ItemPage from './ItemPage';
import AddItem from './pages/additem/AddItem';
import DetailItem from './pages/detailitem/DetailItem';
import EditItem from './pages/edititem/EditUom';

function RouteItem() {
    return (
        <Routes>
            <Route path="/" element={<ItemPage />} />
            <Route path="/new" element={<AddItem />} />
            <Route path="/detail-item-bundling" element={<DetailItem />} />
            <Route path="/edit" element={<EditItem />} />


        </Routes>
    );
}

export default RouteItem;
