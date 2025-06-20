import { Routes, Route } from 'react-router-dom';
import RouteVariantGoods from './varian-goods/RouteGoods';
/* import RouteVariantMaterial from './varian-material/RouteVariantMaterial';
import RouteVariantLayanan from './varian-layanan/RouteVariantLayanan'; */
// import DetailLayanan from './pages/detailuom/DetailUom';
// import AddLayanan from './pages/adduom/AddUom';
// import EditLayanan from './pages/edituom/EditUom';
// import LayananPage from './UomPage';
// import DetailUom from './pages/detailuom/DetailUom';



function RouteVarian() {
    return (
        <Routes>
            <Route path="varian-finish-goods/*" element={<RouteVariantGoods />} />
{/*             <Route path="varian-material/*" element={<RouteVariantMaterial />} />
            <Route path="varian-layanan/*" element={<RouteVariantLayanan />} /> */}

            {/* <Route path="/" element={<MaterialsPage />} />
            <Route path="new" element={<AddMaterials />} />
            <Route path="/edit" element={<EditMaterials />} />
            <Route path="/detail-materials" element={<DetailMaterials />} /> */}
        </Routes>
    );
}

export default RouteVarian;
