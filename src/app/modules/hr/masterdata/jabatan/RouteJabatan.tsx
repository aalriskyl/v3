import { Routes, Route } from 'react-router-dom';
import AddJabatan from './pages/add/AddJabatan';
import EditJabatan from './pages/edit/EditJabatan';
import JabatanPage from './JabatanPage';
import DetailJabatan from './pages/detail/DetailJabatan';



function RouteJabatan() {
    return (
        <Routes>
            <Route path="/" element={<JabatanPage />} />
            <Route path="/new" element={<AddJabatan />} />
            <Route path="/detail/:id" element={<DetailJabatan />} />
            <Route path="/edit/:id" element={<EditJabatan />} />
        </Routes>
    );
}

export default RouteJabatan;
