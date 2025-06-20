import { FC } from "react";
import { Outlet } from "react-router-dom";
import { PageLink, PageTitle } from "@metronic/layout/core";
import CategoryTableLayout from "./components/template/CategoryTableLayout";
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

const CategoryPage: FC = () => {
    return (
        <main>
            <div className='d-flex flex-row w-100 position-relative'>
                <PageTitle>Kategori Produk</PageTitle>
            </div>
            <div>
                <Outlet />
                <CategoryTableLayout children="" />
            </div>
        </main>
    )
}

export default CategoryPage