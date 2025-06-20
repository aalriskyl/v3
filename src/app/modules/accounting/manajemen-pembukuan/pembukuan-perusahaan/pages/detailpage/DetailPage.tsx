// import React, { FC, Fragment, useEffect, useState } from "react";
// import { PageTitle, PageLink } from "@metronic/layout/core";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import {
//   DeleteConfirmationModal,
//   DeleteSuccessModal,
// } from "@metronic/layout/components/form/organism/DeleteModal";
// import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";
// import ConfirmModal from "@metronic/layout/components/form/organism/ConfirmModal";
// import SuccessModal from "@metronic/layout/components/form/organism/SuccessModal";
// import OverlayLoader from "@metronic/layout/components/OverlayLoader";
// // import { SupplierTable } from '../../components/organism/table/SupplierTable';
// import SupplierTableLayout from "../../components/template/SupplierTableLayout";
// import {
//   DetailDataType,
//   PaymentTermsType,
// } from "../../components/core/_models";
// import axiosInstance from "../../../../../../../service/axiosInstance";
// import clsx from "clsx";
// import { Button } from "react-bootstrap";
// import TextareaField from "@metronic/layout/components/form/molecules/TextareaField";
// import InputField from "@metronic/layout/components/form/molecules/InputField";
// import { useForm } from "react-hook-form";

// const breadcrumbs: Array<PageLink> = [
//   {
//     title: "Dashboard",
//     path: "/",
//     isSeparator: false,
//     isActive: false,
//   },
//   {
//     title: "Inventory",
//     path: "/inventory",
//     isSeparator: false,
//     isActive: false,
//   },
//   {
//     title: "Master Data",
//     path: "/inventory/masterdata",
//     isSeparator: false,
//     isActive: false,
//   },
//   {
//     title: "Chart of Account",
//     path: "/inventory/masterdata/chart-of-account",
//     isSeparator: false,
//     isActive: false,
//   },
// ];

// const DetailPage: FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//   const [data, setData] = useState<DetailDataType | null>(null);

//   const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
//   const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
//   const [failedMessage, setFailedMessage] = useState<string | null>(null);

//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   useEffect(() => {
//     setIsLoading(true);
//     axiosInstance
//       .get(
//         `/accounting/master-data/top/${id}?company_id=${localStorage.getItem(
//           "company_id"
//         )}`
//       )
//       .then((res) => {
//         console.log({ res });
//         setData(res.data.data);
//       })
//       .finally(() => setIsLoading(false));
//   }, []);

//   const handleDelete = async () => {
//     try {
//       setIsLoading(true);
//       console.log("Service deleted:", id);
//       const res = await axiosInstance.delete(
//         `/accounting/master-data/top/${id}?company_id=${localStorage.getItem(
//           "company_id"
//         )}`
//       );
//       console.log({ res });
//       setDeleteModalVisible(false);
//       setSuccessModalVisible(true);
//     } catch (error) {
//       console.error("Gagal menghapus data", error);
//       setDeleteModalVisible(false);
//       setFailedMessage(
//         (error as any).response.data.field || "Gagal menghapus COA"
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       {isLoading && <OverlayLoader />}
//       <PageTitle breadcrumbs={breadcrumbs}>Detail Payment Terms</PageTitle>
//       {/* Display Brand Data */}
//       <div className="container card p-5 font-secondar mb-8">
//         <h4 className="mb-8">Payment Terms</h4>
//         <div className="row">
//           {/* Kolom Kiri */}
//           <div className="col-md-6">
//             <div className="mb-3">
//               <label className="form-label fw-bold">Nama</label>
//               <div className="fw-light text-gray-800">{data?.name || "-"}</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* <SupplierTableLayout /> */}

//       <ListPaymentTerms>
//         {({ handleUpdateAction }) => (
//           <div className="row">
//             <div className="col-12 text-end my-4">
//               <Link
//                 to="../"
//                 className="btn px-12 py-3 border border-gray-500 me-2"
//               >
//                 Kembali
//               </Link>
//               <button
//                 type="button"
//                 className="btn px-12 py-3 border border-gray-500 me-2"
//                 onClick={() => setDeleteModalVisible(true)}
//               >
//                 Hapus
//               </button>
//               <button
//                 className="btn btn-primary border border-primary px-16 py-3"
//                 onClick={handleUpdateAction}
//               >
//                 Ubah
//               </button>
//             </div>
//           </div>
//         )}
//       </ListPaymentTerms>

//       {isDeleteModalVisible && (
//         <DeleteConfirmationModal
//           cancelLabel="Kembali"
//           confirmLabel="Hapus"
//           onConfirmDelete={handleDelete}
//           closeModal={() => setDeleteModalVisible(false)}
//           title="Hapus Data?"
//           message="Data akan terhapus dan tidak bisa dikembalikan."
//         />
//       )}

//       {isSuccessModalVisible && (
//         <DeleteSuccessModal
//           closeModal={() => {
//             setSuccessModalVisible(false);
//             navigate("../");
//           }}
//           title="Berhasil"
//           message="Data berhasil dihapus."
//         />
//       )}

//       {failedMessage && (
//         <FailedModal
//           closeModal={() => setFailedMessage(null)}
//           title="Gagal"
//           message={failedMessage}
//         />
//       )}
//     </>
//   );
// };

// export default DetailPage;

// const ListPaymentTerms = ({
//   children,
// }: {
//   children: (props: {
//     handleUpdateAction: () => Promise<void>;
//   }) => React.ReactNode;
// }) => {
//   const { id } = useParams<{ id: string }>();
//   const [listPaymentTerms, setListPaymentTerms] = useState<PaymentTermsType[]>(
//     []
//   );
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const [failedMessage, setFailedMessage] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const [invoicePortionPreview, setInvoicePortionPreview] = useState<number>(0);

//   const fetchPaymentTerms = async () => {
//     if (!id) return;
//     const res = await axiosInstance.get(
//       `/accounting/master-data/top/payment-terms/top/${id}?company_id=${localStorage.getItem(
//         "company_id"
//       )}`
//     );
//     console.log({ fetchPaymentTerms2: res.data.data });
//     setListPaymentTerms(res.data.data);
//   };

//   const handleUpdateAction = async () => {
//     try {
//       setIsLoading(true);
//       const payload = {
//         datas: listPaymentTerms.map((item) => ({
//           name: item.name,
//           invoice_portion: parseFloat(item.invoice_portion.toString()),
//           due_date_based_on: item.due_date_based_on,
//           credit: parseFloat(item.credit.toString()),
//         })),
//       };
//       const res = await axiosInstance.put(
//         `/accounting/master-data/top/payment-terms/top/${id}?company_id=${localStorage.getItem(
//           "company_id"
//         )}`,
//         payload
//       );
//       console.log({ update: res.data });
//       console.log({ payload });
//       await fetchPaymentTerms();
//       setSuccessMessage("Berhasil update payment terms");
//     } catch (error) {
//       const field = (error as any)?.response?.data?.field;
//       if (field) {
//         let errorMessage = null;
//         Object.keys(field).forEach((key) => {
//           errorMessage = key.length > 3 ? `${key} : ${field[key]}` : null;
//         });
//         setFailedMessage(
//           errorMessage !== null
//             ? errorMessage
//             : field || "Gagal membuat payment terms"
//         );
//         console.log({ errorMessage });
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPaymentTerms();
//   }, []);

//   useEffect(() => {
//     setInvoicePortionPreview(
//       listPaymentTerms.reduce(
//         (acc, item) => acc + parseFloat(item.invoice_portion.toString()),
//         0
//       )
//     );
//   }, [listPaymentTerms]);

//   console.log({ listPaymentTerms });

//   const handleChange = (
//     index: number,
//     key: "name" | "invoice_portion" | "due_date_based_on" | "credit",
//     value: string | number
//   ) => {
//     setListPaymentTerms((prev) =>
//       prev.map((item, pIndex) => {
//         if (index === pIndex) {
//           return {
//             ...item,
//             [key]: value,
//           };
//         }
//         return item;
//       })
//     );
//   };

//   return (
//     <>
//       {isLoading && <OverlayLoader />}
//       <div className="card p-5 w-100">
//         <div className="row g-2">
//           <h3 className="mb-6">Payment Terms</h3>
//           <h5>
//             Invoice Portion :{" "}
//             <span
//               className={clsx(
//                 "text-success",
//                 invoicePortionPreview !== 100 && "text-danger"
//               )}
//             >
//               {invoicePortionPreview}%
//             </span>
//           </h5>
//           {/* Baris 1 */}
//           <hr style={{ marginTop: "20px" }} />
//           {listPaymentTerms.map((paymentTerms, index) => (
//             <>
//               <div className="row g-2">
//                 <div className="col-md-1">
//                   <p>{index + 1}</p>
//                 </div>
//                 <div className="col-md-11 position-relative">
//                   <div className="row">
//                     <div className="col-md-5">
//                       <label className="form-label">Nama Payment Terms</label>
//                       <input
//                         value={paymentTerms.name}
//                         type="text"
//                         placeholder="Masukkan Nama Payment Terms"
//                         className={clsx("form-control py-4")}
//                         onChange={(e) =>
//                           handleChange(index, "name", e.target.value)
//                         }
//                       />
//                     </div>
//                     <div className="col-md-5">
//                       <label className="form-label">Due Date</label>
//                       <select
//                         className={clsx("form-control py-4")}
//                         value={paymentTerms.due_date_based_on}
//                         onChange={(e) =>
//                           handleChange(
//                             index,
//                             "due_date_based_on",
//                             e.target.value
//                           )
//                         }
//                       >
//                         <option value="">Pilih Due Date</option>
//                         {dueDateOptions.map((item, index) => (
//                           <option value={item.value} key={index}>
//                             {item.label}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                   <div className="row">
//                     <div className="col-md-5">
//                       <label className="form-label">Invoice Portion</label>
//                       <input
//                         value={paymentTerms.invoice_portion}
//                         type="number"
//                         placeholder="Masukkan Invoice Portion"
//                         className={clsx("form-control py-4")}
//                         onChange={(e) =>
//                           handleChange(index, "invoice_portion", e.target.value)
//                         }
//                       />
//                     </div>
//                     <div className="col-md-5">
//                       <label className="form-label">Credit</label>
//                       <input
//                         value={paymentTerms.credit}
//                         type="number"
//                         placeholder="Masukkan Credit"
//                         className={clsx("form-control py-4")}
//                         onChange={(e) =>
//                           handleChange(index, "credit", e.target.value)
//                         }
//                       />
//                     </div>
//                   </div>
//                   <button
//                     className={clsx(
//                       "form-control py-4 btn-danger btn position-absolute top-0 end-0"
//                     )}
//                     style={{ width: "fit-content" }}
//                     onClick={() => {
//                       setListPaymentTerms((prev) =>
//                         prev.filter((_, pIndex) => index !== pIndex)
//                       );
//                     }}
//                   >
//                     Hapus
//                   </button>
//                 </div>
//               </div>
//               <hr style={{ marginTop: "20px" }} />
//             </>
//           ))}
//           <button
//             className={clsx("form-control py-4 btn-primary btn  ms-auto")}
//             style={{ width: "fit-content" }}
//             onClick={() => {
//               setListPaymentTerms((prev) => [
//                 ...prev,
//                 {
//                   credit: 0,
//                   due_date_based_on: "",
//                   id: "",
//                   invoice_portion: 0,
//                   name: "",
//                   status: true,
//                 },
//               ]);
//             }}
//           >
//             Tambah
//           </button>
//           {/* <hr style={{ marginTop: "20px" }} />
//           <button
//             className={clsx("form-control py-4 btn-primary btn  ms-auto")}
//             onClick={handleUpdateAction}
//           >
//             Simpan Payment Terms
//           </button> */}
//         </div>
//       </div>
//       {failedMessage && (
//         <FailedModal
//           closeModal={() => setFailedMessage(null)}
//           message={failedMessage}
//           confirmLabel={"Tutup"}
//         />
//       )}
//       {successMessage && (
//         <SuccessModal
//           closeModal={() => {
//             setFailedMessage(null);
//             setSuccessMessage(null);
//           }}
//           successMessage={successMessage}
//         />
//       )}

//       {children({
//         handleUpdateAction,
//       })}
//     </>
//   );
// };

// const dueDateOptions = [
//   {
//     id: "1",
//     value: "Days",
//     label: "Day(s) after invoice date",
//   },
//   {
//     id: "2",
//     value: "DaysAfterMonth",
//     label: "Day(s) after the end of the invoice month",
//   },
//   {
//     id: "3",
//     value: "Months",
//     label: "Month(s) after the end of the invoice month",
//   },
// ];
