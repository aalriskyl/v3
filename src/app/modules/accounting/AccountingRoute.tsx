// AccountingRoute.tsx
import { lazy, Suspense } from 'react';
import { Routes, Route } from "react-router-dom";
import OverlayLoader from '@metronic/layout/components/OverlayLoader';

// Lazy load all route components
const MasterDataAccounting = lazy(() => import("./master-data/MasterDataAccountingRoute"));
const ManajemenTransaksiRoute = lazy(() => import("./manajemen-transaksi/ManajemenTransaksiRoute"));
const ManajemenPembukuanRoute = lazy(() => import("./manajemen-pembukuan/ManajemenPembukuanRoute"));
const LaporanRoute = lazy(() => import("./laporan/AccountingLaporanRoute"));

function AccountingRoute() {
    return (
        <Suspense fallback={<OverlayLoader />}>
            <Routes>
                <Route path="laporan/*" element={<LaporanRoute />} />
                <Route path="masterdata/*" element={<MasterDataAccounting />} />
                <Route path="manajemen-transaksi/*" element={<ManajemenTransaksiRoute />} />
                <Route path="manajemen-pembukuan/*" element={<ManajemenPembukuanRoute />} />
            </Routes>
        </Suspense>
    );
}

export default AccountingRoute;