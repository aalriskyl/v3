// import { FC, useState, useEffect } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { useNavigate, useParams } from "react-router-dom";
// import ConfirmModal from "@metronic/layout/components/form/organism/ConfirmModal";
// import SuccessModal from "@metronic/layout/components/form/organism/SuccessModal";
// import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";
// import SelectField from "@metronic/layout/components/form/molecules/SelectField";
// import DateInputField from "../molecules/field/DateInputField";
// import MaterialTableLayout from "./MaterialTableLayout";
// import { getAllPurchaseOrder, createReceivedNote, getAllWarehouse } from "../../core/_request";
// import axiosInstance from "../../../../../../../../service/axiosInstance";

// interface FormData {
//     id?: string;
//     supplier_id: string;
//     purchase_order_number: string;
//     warehouse_id?: string;
//     received_date: Date;
//     type: string;
// }

// interface EditFormComponentProps {
//     defaultValues: FormData | null; // Accept defaultValues as a prop
// }

// const EditFormComponent: FC<EditFormComponentProps> = ({ defaultValues }) => {
//     const { id } = useParams<{ id: string }>();
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
//     const [isFailedModalVisible, setIsFailedModalVisible] = useState(false);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [confirmData, setConfirmData] = useState<any>(null);
//     const [purchaseOrderOptions, setPurchaseOrderOptions] = useState<any[]>([]);
//     const [warehouseOptions, setWarehouseOptions] = useState<any[]>([]);
//     const navigate = useNavigate();

//     const {
//         control,
//         handleSubmit,
//         formState: { errors, isValid },
//         reset,
//         watch,
//         setValue,
//     } = useForm<FormData>({
//         mode: "onTouched",
//         defaultValues: defaultValues, // Set default values from props
//     });

//     const type = watch("type");
//     const purchaseOrderNumber = watch("purchase_order_number");

//     useEffect(() => {
//         const fetchPurchaseOrders = async () => {
//             try {
//                 const response = await getAllPurchaseOrder();
//                 const options = response.data.purchase_orders.map((po: any) => ({
//                     value: po.id,
//                     label: po.no_purchase_order,
//                     type: po.type,
//                     supplier_id: po.supplier.id,
//                 }));
//                 setPurchaseOrderOptions(options);
//             } catch (error) {
//                 console.error("Failed to fetch purchase orders:", error);
//             }
//         };

//         const fetchWarehouses = async () => {
//             try {
//                 const response = await getAllWarehouse();
//                 const options = response.data.warehouses.map((warehouse: any) => ({
//                     value: warehouse.id,
//                     label: warehouse.name,
//                 }));
//                 setWarehouseOptions(options);
//             } catch (error) {
//                 console.error("Failed to fetch warehouses:", error);
//             }
//         };

//         fetchPurchaseOrders();
//         fetchWarehouses();
//     }, []);

//     const handlePurchaseOrderChange = (value: string) => {
//         const selectedOrder = purchaseOrderOptions.find((po) => po.value === value);
//         if (selectedOrder) {
//             setValue("type", selectedOrder.type);
//             setValue("supplier_id", selectedOrder.supplier_id ?? "");
//             if (selectedOrder.type === "Warehouse") {
//                 setValue("warehouse_id", selectedOrder.supplier_id);
//             } else if (selectedOrder.type === "Supplier") {
//                 setValue("supplier_id", selectedOrder.supplier_id);
//             }
//         }
//     };

//     const onSubmit = (data: FormData) => {
//         const payload = {
//             warehouse_id: data.warehouse_id || "",
//             supplier_id: data.supplier_id || "",
//             received_date: new Date(data.received_date).toISOString(),
//             type: data.type,
//             purchase_order_id: data.purchase_order_number,
//         };

//         console.log("Payload being sent:", payload);
//         setConfirmData(payload);
//         setIsModalVisible(true);
//     };

//     const handleConfirm = async () => {
//         if (confirmData) {
//             setIsSubmitting(true);
//             try {
//                 const response = await createReceivedNote(confirmData);
//                 if (response.success) {
//                     setIsSuccessModalVisible(true);
//                 }
//             } catch (error) {
//                 console.error("Failed to save data:", error);
//                 setIsFailedModalVisible(true);
//             } finally {
//                 setIsSubmitting(false);
//                 setIsModalVisible(false);
//             }
//         }
//     };

//     return (
//         <div className="font-secondary">
//             <form onSubmit={handleSubmit(onSubmit)}>
//                 <div className="card p-5 w-100 mb-8">
//                     <h3 className="mb-6">Edit Catatan Penerimaan</h3>
//                     <div className="row">
//                         <div className="col-md-6">
//                             <SelectField
//                                 placeholder="Pilih Nomor Purchase Order"
//                                 name="purchase_order_number"
//                                 label="Nomor Purchase Order"
//                                 control={control}
//                                 options={purchaseOrderOptions}
//                                 errors={errors}
//                                 onChange={handlePurchaseOrderChange}
//                             />
//                             <SelectField
//                                 placeholder="Pilih Tipe"
//                                 name="type"
//                                 label="Tipe"
//                                 control={control}
//                                 options={[
//                                     { value: "Warehouse", label: "Warehouse" },
//                                     { value: "Supplier", label: "Supplier" },
//                                 ]}
//                                 errors={errors}
//                                 disabled={!!watch("purchase_order_number")}
//                             />
//                         </div>
//                         <div className="col-md-6">
//                             <Controller
//                                 name="received_date"
//                                 control={control}
//                                 render={({ field: dateField }) => (
//                                     <DateInputField
//                                         label="Tanggal Penerimaan"
//                                         value={dateField.value}
//                                         onChange={(value) => dateField.onChange(new Date(value))}
//                                         error={errors.received_date?.message}
//                                     />
//                                 )}
//                             />
//                             <SelectField
//                                 placeholder="Pilih Warehouse"
//                                 name="warehouse_id"
//                                 label="Warehouse"
//                                 control={control}
//                                 options={warehouseOptions}
//                                 errors={errors}
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 <MaterialTableLayout purchaseOrderId={purchaseOrderNumber} type={type} />

//                 <div className="d-flex justify-content-end gap-3 my-4">
//                     <button
//                         type="button"
//                         onClick={() => navigate(-1)}
//                         className="btn px-12 py-3 border border-gray-500 me-2"
//                     >
//                         Batal
//                     </button>
//                     <button
//                         type="submit"
//                         className="btn btn-primary px-12 py-3 border border-primary"
//                         disabled={!isValid || isSubmitting}
//                     >
//                         {isSubmitting ? "Mengirim..." : "Konfirmasi"}
//                     </button>
//                 </div>

//                 {isModalVisible && (
//                     <ConfirmModal
//                         headTitle="Konfirmasi"
//                         message="Apakah Anda yakin ingin menyimpan perubahan?"
//                         confirmButtonLabel="Ya"
//                         cancelButtonLabel="Tidak"
//                         handleSubmit={handleConfirm}
//                         closeModal={() => setIsModalVisible(false)}
//                     />
//                 )}

//                 {isSuccessModalVisible && (
//                     <SuccessModal
//                         closeModal={() => {
//                             setIsSuccessModalVisible(false);
//                             navigate("../");
//                         }}
//                         successMessage="Data berhasil disimpan."
//                     />
//                 )}

//                 {isFailedModalVisible && (
//                     <FailedModal
//                         closeModal={() => setIsFailedModalVisible(false)}
//                         message="Terjadi kesalahan, coba lagi!"
//                     />
//                 )}
//             </form>
//         </div>
//     );
// };

// export default EditFormComponent;