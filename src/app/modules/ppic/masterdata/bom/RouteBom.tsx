import { Routes, Route } from 'react-router-dom';
import BomPage from './BomPage';
import AddMaterials from './pages/add/AddMaterials';
import AddVariantFinishGoods from './pages/add/AddVariantFinishGoods';
import DetailMaterials from './pages/detail/DetailMaterials';
import DetailFinishGoods from './pages/detail/DetailFinishGoods';
import EditMaterials from './pages/edit/EditMaterials';
import EditFinishGoods from './pages/edit/EditFinishGoods';
import VariantSectionFinishGoods from './components/template/section/VariantSectionFinishGoods';
import DetailVariantFinishGoods from './pages/detail/DetailVariantFinishGoods';

function RouteBom() {
    // const { control, formState: { errors } } = useForm();

    return (
        <Routes>
            <Route path="/" element={<BomPage />} />

            <Route path="new" element={<AddMaterials />} />
            <Route path="new" element={<AddVariantFinishGoods />} />
            <Route
                path="new/varian"
                element={<VariantSectionFinishGoods />}
            />
            {/* <Route path="detail/:id" element={<DetailMaterials />} />
            <Route path="edit/:id" element={<EditMaterials />} /> */}

            <Route path="/material/detail/:id" element={<DetailMaterials />} />
            <Route path="/material/edit/:id" element={<EditMaterials />} />
            <Route path="/finishgoods/detail/:id" element={<DetailFinishGoods />} />
            <Route
                path="/finishgoods/:id/new/varian"
                element={<VariantSectionFinishGoods />}
            />
            <Route
                path="/finishgoods/variant/:id/"
                element={<DetailVariantFinishGoods />}
            />
            <Route path="/finishgoods/edit/:id" element={<EditFinishGoods />} />
        </Routes>
    );
}

export default RouteBom;
