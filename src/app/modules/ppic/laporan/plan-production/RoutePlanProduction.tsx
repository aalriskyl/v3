import { Routes, Route } from 'react-router-dom';
import Page from './Page';
// import AddplanproductionPage from './pages/addplanproduction/AddPlanProductionPage';
import DetailPlanProductionPage from './pages/detailplanproduction/DetailPlanProductionPage';
// import EditPlanProductionPage from './pages/editplanproduction/EditPlanProductionPage';


function RoutePlanProduction() {
    return (
        <Routes>
            <Route path="/" element={<Page />} />
            {/* <Route path="/new" element={<AddplanproductionPage />} /> */}
            <Route path="/detail/:id" element={<DetailPlanProductionPage />} />
            {/* <Route path="/edit/:id" element={<EditPlanProductionPage />} /> */}
        </Routes>
    );
}

export default RoutePlanProduction;
