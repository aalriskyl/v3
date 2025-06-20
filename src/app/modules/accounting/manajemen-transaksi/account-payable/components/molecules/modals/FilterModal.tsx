import { FC, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import DateRangeInputField from "@metronic/layout/components/form/molecules/DateRangeInputField";
import DropdownField from "../../../../../../inventory/masterdata/materials/components/molecules/field/DropdownField";
import { useAccountPayable } from "../../../core/useContext";

interface FilterModalProps {
    closeModal: () => void;
}

interface FormValues {
    status: string;
    submittedFrom: string;
    submittedTo: string;
    approvedFrom: string;
    approvedTo: string;
    requestedDate: string;
    requestedDateTo: string;
}

const FilterModal: FC<FilterModalProps> = ({ closeModal }) => {
    const { setSubmittedDate, setSubmittedDateTo, setApprovedDate, setApprovedDateTo, setStatus, submittedDate, submittedDateTo, approvedDate, approvedDateTo, requestedDate, requestedDateTo, setRequestedDate, setRequestedDateTo, status } = useAccountPayable();
    const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormValues>({
        defaultValues: {
            status: status || "",
            submittedFrom: submittedDate || "",
            submittedTo: submittedDateTo || "",
            approvedFrom: approvedDate || "",
            approvedTo: approvedDateTo || "",
            requestedDate: requestedDate || "",
            requestedDateTo: requestedDateTo || "",
        },
    });
    const [loading, setLoading] = useState(false);

    // Fungsi untuk mereset form
    const handleReset = () => {
        reset({
            status: "", // Reset status juga
            submittedFrom: "",
            submittedTo: "",
            approvedFrom: "",
            approvedTo: "",
            requestedDate: "",
            requestedDateTo: "",

        });
    };

    // Fungsi untuk memformat tanggal ke format 'yyyy-MM-dd'
    const formatDateForPayload = (dateString: string) => {
        if (!dateString) return ""; // Jika tanggal kosong, kembalikan string kosong
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate() + 1).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Fungsi yang dipanggil saat form disubmit
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setLoading(true); // Set loading ke true saat proses submit
        console.log(data);
        try {
            setRequestedDate(formatDateForPayload(data.requestedDate));
            setRequestedDateTo(formatDateForPayload(data.requestedDateTo));
            setSubmittedDate(formatDateForPayload(data.submittedFrom));
            setSubmittedDateTo(formatDateForPayload(data.submittedTo));
            setApprovedDate(formatDateForPayload(data.approvedFrom));
            setApprovedDateTo(formatDateForPayload(data.approvedTo));
            setStatus(data.status); // Simpan status ke context
            closeModal(); // Tutup modal setelah submit
        } finally {
            setLoading(false); // Set loading ke false setelah proses selesai
        }
    };

    return (
        <div className="bg-white rounded shadow-lg p-6" style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            zIndex: 1000,
            width: '360px',
            marginTop: '8px',
        }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold fs-4">Filter</h2>
                <button className="btn btn-sm btn-icon" onClick={closeModal}>
                    <i className="fas fa-times"></i>
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Field untuk rentang tanggal pengajuan */}
                <Controller
                    name="requestedDate"
                    control={control}
                    render={({ field }) => (
                        <DateRangeInputField
                            label="Tanggal Pembuatan"
                            startDate={field.value}
                            endDate={control._formValues.requestedDateTo} // Ambil nilai dueDateTo dari form
                            onChange={(start, end) => {
                                field.onChange(start); // Simpan nilai dueDateFrom
                                setValue("requestedDateTo", end); // Simpan nilai dueDateTo menggunakan setValue
                            }}
                        />
                    )}
                />
                
                <Controller
                    name="submittedFrom"
                    control={control}
                    render={({ field }) => (
                        <DateRangeInputField
                            label="Tanggal Pengajuan"
                            startDate={field.value}
                            endDate={control._formValues.submittedTo} // Ambil nilai submittedTo dari form
                            onChange={(start, end) => {
                                field.onChange(start); // Simpan nilai submittedFrom
                                setValue("submittedTo", end); // Simpan nilai submittedTo menggunakan setValue
                            }}
                        />
                    )}
                />

                {/* Field untuk rentang tanggal persetujuan */}
                <Controller
                    name="approvedFrom"
                    control={control}
                    render={({ field }) => (
                        <DateRangeInputField
                            label="Tanggal Persetujuan"
                            startDate={field.value}
                            endDate={control._formValues.approvedTo} // Ambil nilai approvedTo dari form
                            onChange={(start, end) => {
                                field.onChange(start); // Simpan nilai approvedFrom
                                setValue("approvedTo", end); // Simpan nilai approvedTo menggunakan setValue
                            }}
                        />
                    )}
                />
                <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                        <DropdownField
                            label="Status"
                            value={field.value}
                            onChange={field.onChange}
                            options={[
                                { value: "Draft", label: "Draft" },
                                { value: "Submitted", label: "Submitted" },
                                { value: "Waiting", label: "Waiting" },
                                { value: "Approved", label: "Approved" },
                                { value: "Rejected", label: "Rejected" },
                            ]}
                        />
                    )}
                />

                {/* Tombol Reset dan Simpan */}
                <div className="d-flex gap-2 mt-8">
                    <button
                        type="button"
                        className="btn border border-primary text-primary btn-light w-50"
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary border border-primary w-50"
                        disabled={loading}
                    >
                        {loading ? 'Memuat...' : 'Simpan'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FilterModal;
