import { Routes, Route } from "react-router-dom";
import RouteBrand from "./brand/RouteBrand";
import RouteMaterials from "./materials/RouteMaterials";
import RouteCategory from "./kategori-produk/RouteCategory";
import RouteLayanan from "./layanan/RouteLayanan";
import RouteUom from "./uom/RouteUom";
import RouteSkema from "./skema-harga/RouteSkema";
import RouteItem from "./item-bundling/RouteItem";
import RouteGoods from "./finishgoods/RouteGoods";
import RouteVarian from "./varian/VarianRouting";
import RouteGudang from "./gudang/RouteGudang";

function MasterDataInventoryRouting() {
  return (
    <Routes>
      <Route path="brand/*" element={<RouteBrand />} />
      <Route path="materials/*" element={<RouteMaterials />} />
      <Route path="kategori-produk/*" element={<RouteCategory />} />
      <Route path="layanan/*" element={<RouteLayanan />} />
      <Route path="satuan-uom/*" element={<RouteUom />} />
      <Route path="gudang/*" element={<RouteGudang />} />
      <Route path="skema-harga/*" element={<RouteSkema />} />
      <Route path="item-bundling/*" element={<RouteItem />} />
      <Route path="finish-goods/*" element={<RouteGoods />} />
      <Route path="varian/*" element={<RouteVarian />} />
    </Routes>
  );
}

export default MasterDataInventoryRouting;
