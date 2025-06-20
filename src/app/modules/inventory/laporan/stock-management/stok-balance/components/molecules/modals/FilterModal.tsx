// import React, { useEffect, useState } from "react";
// import DateInputField from "@metronic/layout/components/form/molecules/field/DateInputField";
// import StatusDropdownField from "@metronic/layout/components/form/molecules/StatusDropdownField";
// import { useTableLayoutStockBalance } from "../../template/TableLayout";

// interface FilterModalProps {
//   closeModal: () => void;
// }

// const FilterModal: React.FC<FilterModalProps> = ({ closeModal }) => {
//   const { setStartDate, setEndDate, startDate, endDate } =
//     useTableLayoutStockBalance();
//   const [startDateFilter, setStartDateFilter] = useState<string>("");
//   const [endDateFilter, setEndDateFilter] = useState<string>("");

//   const reset = () => {
//     setStartDateFilter("");
//     setEndDateFilter("");
//     setStartDate("");
//     setEndDate("");
//   };

//   const handleFilter = () => {
//     try {
//       if (startDateFilter.length > 0 && endDateFilter.length > 0) {
//         setStartDate(startDateFilter);
//         setEndDate(endDateFilter);
//       } else {
//         setStartDate("");
//         setEndDate("");
//       }
//     } finally {
//       closeModal();
//     }
//   };
//   return (
//     <div
//       className="modal fade show d-block"
//       tabIndex={-1}
//       role="dialog"
//       aria-hidden="true"
//       style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
//     >
//       <div
//         className="modal-dialog modal-dialog-centered"
//         role="document"
//         style={{ maxWidth: "360px" }}
//       >
//         <div className="modal-content px-2 py-8">
//           <div className="text-start">
//             <h1 className="modal-title fw-bold font-secondary mx-7">Filter</h1>
//           </div>
//           <div className="modal-body col-md-12">
//             {/* Submission Date Input */}
//             <div className="col-md-12">
//               <DateInputField
//                 label="Start Date"
//                 value={startDateFilter}
//                 onChange={setStartDateFilter}
//               />

//               {/* Approval Date Input */}
//               <DateInputField
//                 label="End Date"
//                 value={endDateFilter}
//                 onChange={setEndDateFilter}
//               />
//             </div>
//           </div>
//           <div className="text-center row mx-4">
//             <div className="d-flex justify-content-between">
//               <button
//                 type="button"
//                 className="btn px-12 text-primary py-3 border w-100 border-primary me-2"
//                 onClick={() => {
//                   reset();
//                   closeModal();
//                 }}
//               >
//                 Reset
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-primary px-12 py-3 fw-bold px-6 w-100 border border-primary"
//                 disabled={
//                   startDateFilter.length === 0 || endDateFilter.length === 0
//                 }
//                 onClick={() => {
//                   handleFilter();
//                 }}
//               >
//                 Simpan
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FilterModal;

// const getDateForInput = (dateStr: string) => {
//   if (dateStr.length === 0) return "";
//   const date = new Date(dateStr);

//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const day = String(date.getDate()).padStart(2, "0");

//   const hours = String(date.getHours()).padStart(2, "0");
//   const minutes = String(date.getMinutes()).padStart(2, "0");
//   const seconds = String(date.getSeconds()).padStart(2, "0");

//   return `${year}-${month}-${day}`;
// };
