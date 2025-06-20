import React, { useEffect, useState } from 'react';
import { KTIcon } from '@metronic/helpers';
import FilterModal from '../modals/FilterModal';
import { useMaterialEntryStocks } from '../../../../../../pengajuan/stock-management/entry-stock/components/molecules/core/MaterialEntryStockContext';

const SectionUomSearch: React.FC = () => {
   const { setSearchTerm } = useMaterialEntryStocks();
    const [searchTerm, setSearchTermLocal] = useState<string>('');
       
           const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                   setSearchTermLocal(e.target.value);
               };
           
               useEffect(() => {
                   const handler = setTimeout(() => {
                       setSearchTerm(searchTerm);
                   }, 300);
           
                   return () => clearTimeout(handler);
               }, [searchTerm, setSearchTerm]); // tambahin setSearchTerm kalau berubah tiap render
       
           return (
               <div className="card-title justify-content-between d-flex align-items-center w-100">
                   <div className="d-flex align-items-center position-relative my-1 pe-4 me-auto">
                       <KTIcon iconName="magnifier" className="fs-1 position-absolute ms-6" />
                       <input
                           type="text"
                           data-kt-user-table-filter="search"
                           className="form-control w-250px ps-14 border border-2"
                           placeholder="Cari"
                           value={searchTerm}
                           onChange={handleSearchChange}
                       />
                   </div>
        </div>
    );
};

export { SectionUomSearch };