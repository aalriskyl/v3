import { FC } from "react";
import { Outlet } from "react-router-dom";
import { PageLink, PageTitle } from "@metronic/layout/core";
import MejaTableLayout from "./components/template/MejaTableLayout";
// import MaterialsTableLayout from "./components/template/MaterialsTableLayout";


const breadCrumbs: Array<PageLink> = [
    {
        title: 'Dashboard',
        path: '/',
        isSeparator: false,
        isActive: false
    },
    {
        title: 'Inventory',
        path: '/inventory',
        isSeparator: false,
        isActive: false
    },
    {
        title: 'Master Data',
        path: '/inventory/masterdata/kategori-produk',
        isSeparator: false,
        isActive: true,
    },
]

const  MejaPage: FC = () => {
    return (
        <main>
            <div className='d-flex flex-row w-100 position-relative'>
                <PageTitle>Meja</PageTitle>
            </div>
            <div>
                <Outlet />
                <MejaTableLayout/>
            </div>
        </main>
    )
}

export default  MejaPage