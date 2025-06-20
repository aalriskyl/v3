// import { useState } from 'react';
// import { Service } from '../../molecules/core/_models';
// import { ServiceTable } from '../../organism/table/ServiceTable';
// import { SearchComponent } from '../../molecules/header/Search';
// import { AddServiceModal } from '../../molecules/modals/AddServiceModal';

// interface UOMSectionProps {
//     Service?: Service[]; // Make optional
//     setService?: React.Dispatch<React.SetStateAction<Service[]>>; // Make optional
// }

// export const ServiceSection = ({
//     Service = [], // Default value if not provided
//     setService = () => { }, // Default function if not provided
// }: UOMSectionProps) => {
//     const [showModal, setShowModal] = useState(false);

//     const handleOpenModal = () => setShowModal(true);
//     const handleCloseModal = () => setShowModal(false);

//     return (
//         <div className="card mt-4 p-5 w-100 mb-4">
//             <h3>Layanan</h3>
//             <div className="card p-5 mt-10 justify-content-end col-md-12">
//                 <div className="d-flex align-items-center justify-content-between">
//                     <SearchComponent />
//                     <button type="button" onClick={handleOpenModal} className="btn border border-primary px-12 py-4 text-primary">
//                         Tambah
//                     </button>
//                 </div>
//                 <ServiceTable />
//             </div>

//             <AddServiceModal
//                 show={showModal}
//                 handleClose={handleCloseModal}
//             />
//         </div>
//     );
// };