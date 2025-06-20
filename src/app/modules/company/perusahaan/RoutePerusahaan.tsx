import { Routes, Route } from 'react-router-dom';
import CompanyPage from './CompanyPage';
import AddCompany from './pages/add/AddCustomer';
import DetailCompany from './pages/detail/DetailCompany';
import EditCompanyPage from './pages/edit/EditCustomer';



function PerusahaanRouting() {
    return (
        <Routes>
            <Route index element={<CompanyPage />} />
            <Route path='new' element={<AddCompany />} />
            <Route path='/detail/:id' element={<DetailCompany />} />
            <Route path='/edit/:id' element={<EditCompanyPage />} />
        </Routes>
    );
}

export default PerusahaanRouting;
