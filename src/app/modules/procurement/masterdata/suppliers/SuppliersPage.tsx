import { FC, useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { PageLink, PageTitle } from '@metronic/layout/core'
import SuppliersTableLayout from './components/template/SuppliersTableLayout'
import { FilterValues } from './components/molecules/header/filters';

const pemasokBreadCrumbs: Array<PageLink> = [
    {
        title: 'Dashboard',
        path: '/',
        isSeparator: false,
        isActive: false,
    },
    {
        title: 'Procurement',
        path: '/procurement',
        isSeparator: false,
        isActive: true,
    },
    {
        title: 'Master Data',
        path: '/procurement/masterdata',
        isSeparator: false,
        isActive: true,
    },

]

const SuppliersPage: FC = () => {
    const location = useLocation();
        const navigate = useNavigate();
        const [filters, setFilters] = useState<FilterValues>({
            search: '',
            city: '',
            industry: '',
            status: undefined,
            // category: ''
        });
    
        // Sync URL parameters with state
        useEffect(() => {
            const params = new URLSearchParams(location.search);
            setFilters({
                search: params.get('search') || '',
                city: params.get('city') || '',
                industry: params.get('industry') || '',
                // Convert 'status' param to boolean
                status: params.get('status') === 'true',
                // category: params.get('category') || ''
            });
        }, [location.search]);
    
        const handleFilterUpdate = (newFilters: Partial<FilterValues>) => {
            const mergedFilters = { ...filters, ...newFilters };
            const queryParams = new URLSearchParams();
    
            Object.entries(mergedFilters).forEach(([key, value]) => {
                // Convert value to string and check if it's non-empty
                const stringValue = String(value);
                if (stringValue) {
                    queryParams.set(key, stringValue);
                }
            });
    
            navigate(`?${queryParams.toString()}`);
        };

    return (
        <main>
            <div className='d-flex flex-row w-100 position-relative'>
                <PageTitle breadcrumbs={pemasokBreadCrumbs}>Supplier</PageTitle>
            </div>
            <div>
                <SuppliersTableLayout />
                <Outlet />

            </div>
        </main >
    )
}

export default SuppliersPage
