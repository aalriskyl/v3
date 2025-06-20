import { FC, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import DateRangeInputField from "@metronic/layout/components/form/molecules/DateRangeInputField";
import DropdownField from "../../../../../../masterdata/materials/components/molecules/field/DropdownField";
import { useEntryStocks } from "../../../../../../pengajuan/stock-management/entry-stock/components/molecules/core/EntryStockContext";
import { useStockLedger } from "../../../core/useContext";

interface FilterModalProps {
    closeModal: () => void;
}

interface FormValues {
    startDate: string;
    endDate: string;
}

const FilterModal: FC<FilterModalProps> = ({ closeModal }) => {
    const { startDate, setStartDate, endDate, setEndDate } = useStockLedger();
    const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormValues>({
        defaultValues: {
            startDate: startDate || "",
            endDate: endDate || "",
        },
    });
    const [loading, setLoading] = useState(false);

    // Fungsi untuk mereset form
    const handleReset = () => {
        reset({
            startDate: "",
            endDate:  "",
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
        // console.log(data);
        try {
            // Format tanggal dan simpan ke context
            setStartDate(formatDateForPayload(data.startDate));
            setEndDate(formatDateForPayload(data.endDate));

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
                    name="startDate"
                    control={control}
                    render={({ field }) => (
                        <DateRangeInputField
                            label="Tanggal Posting"
                            startDate={field.value}
                            endDate={control._formValues.endDate} // Ambil nilai submittedTo dari form
                            onChange={(start, end) => {
                                field.onChange(start); // Simpan nilai submittedFrom
                                setValue("endDate", end); // Simpan nilai submittedTo menggunakan setValue
                            }}
                        />
                    )}
                />
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