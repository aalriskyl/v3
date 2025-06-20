import { Routes, Route } from 'react-router-dom';
import RouteBom from './bom/RouteBom';
// import RouteBrand from './brand/RouteBrand';
// import RouteMaterials from './materials/RouteMaterials';
// import RouteCategory from './kategori-produk/RouteCategory';
// import RouteLayanan from './layanan/RouteLayanan';
// import RouteUom from './uom/RouteUom';
// import RouteSkema from './skema-harga/RouteSkema';
// import RouteItem from './item-bundling/RouteItem';
// import RouteGoods from './finishgoods/RouteGoods';
// import RouteVarian from './varian/VarianRouting';


function MasterDataPpicRouting() {
    return (
        <Routes>
            <Route path="bom/*" element={<RouteBom />} />
        </Routes>
    );
}

export default MasterDataPpicRouting;