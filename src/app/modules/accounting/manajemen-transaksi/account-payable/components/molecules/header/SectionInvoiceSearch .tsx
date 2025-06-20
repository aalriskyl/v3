import React, { useState } from 'react';
import { KTIcon } from '@metronic/helpers';
import { useInvoice } from '../../template/InvoiceLayout';
// import FilterModal from '../modals/FilterModal';
// import { AddStockModal } from '../modals/AddMaterialModal';


const SectionInvoiceSearch: React.FC = () => {
   const { setSearchTerm } = useInvoice();
       const [localSearchTerm, setLocalSearchTerm] = useState('');
   
       const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
           const value = e.target.value;
           setLocalSearchTerm(value);
           setSearchTerm(value);
       };
   
       return (
           <div className="card-title justify-content-between d-flex align-items-center w-100">
               <div className="d-flex align-items-center position-relative my-1 pe-4 me-auto">
                   <KTIcon iconName="magnifier" className="fs-1 position-absolute ms-6" />
                   <input
                       type="text"
                       data-kt-user-table-filter="search"
                       className="form-control w-250px ps-14 border border-2"
                       placeholder="Cari"
                       value={localSearchTerm}
                       onChange={handleSearchChange}
                   />
               </div>
           </div>
       );
   };

export { SectionInvoiceSearch };