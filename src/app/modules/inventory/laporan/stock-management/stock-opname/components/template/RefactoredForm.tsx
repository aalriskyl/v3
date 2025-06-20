import { FC, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import InputField from '@metronic/layout/components/form/molecules/InputField';
import ConfirmModal from '@metronic/layout/components/form/organism/ConfirmModal';
import SuccessModal from '@metronic/layout/components/form/organism/SuccessModal';
import DateInputField from '@metronic/layout/components/form/molecules/DateInputField';
import TextareaField from '../molecules/field/TextareaField';
import { dummyUsers } from '../organisms/table/dummyUsers';
import { FailedModal } from '@metronic/layout/components/form/organism/FailedModal';
import { Model } from '../molecules/core/_models';

interface FormData {
    id?: number; // Change from string to number
    actual_stock: number;
    note?: string;
    opname_date: string;
    approved_by?: string;
    request_by?: string;
    status?: string;
    material?: string;
    uom?: string;
}

interface FormProps {
    mode: 'create' | 'edit';
    defaultValues?: FormData;
    successMessage?: string;
    headTitle: string;
    buttonTitle: string;
    confirmButtonLabel?: string;
    cancelButtonLabel?: string;
    message: string;
}

const validationSchema = Yup.object().shape({
    id: Yup.number().optional(), // Change from string to number
    actual_stock: Yup.number().required('Actual stock wajib dipilih'),
    opname_date: Yup.string().required('Tanggal opname wajib diisi'),
    note: Yup.string().optional(),
    approved_by: Yup.string().optional(),
    request_by: Yup.string().optional(),
    status: Yup.string().optional(),
    material: Yup.string().optional(),
    uom: Yup.string().optional(),
});

const Form: FC<FormProps> = ({
    mode,
    defaultValues,
    successMessage,
    headTitle,
    buttonTitle,
    confirmButtonLabel,
    cancelButtonLabel,
    message,
}) => {
    const { customerId } = useParams<{ customerId: string }>();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [isFailedModalVisible, setIsFailedModalVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [confirmData, setConfirmData] = useState<FormData | null>(null);
    const navigate = useNavigate();

    const { control, handleSubmit, formState: { errors, isValid }, reset, watch, setValue } = useForm<FormData>({
        mode: 'onTouched',
        resolver: yupResolver(validationSchema),
        defaultValues: defaultValues || {
            opname_date: '',
        },
    });

    useEffect(() => {
        if (mode === 'edit' && customerId) {
            const foundData = dummyUsers.find(user => user.id === Number(customerId));
            if (foundData) {
                reset({
                    id: foundData.id as number, // Explicitly cast to number
                    actual_stock: foundData.actual_stock,
                    note: foundData.note,
                    opname_date: foundData.opname_date,
                });
            }
        } else {
            reset({
                opname_date: '',
                actual_stock: undefined,
                note: '',
            });
        }
    }, [mode, customerId, reset]);

    const onSubmit = (data: FormData) => {
        setConfirmData(data);
        setIsModalVisible(true);
    };

    const handleConfirm = async () => {
        if (confirmData) {
            setIsSubmitting(true);
            try {
                if (mode === 'create') {
                    // Simulasi penambahan data baru
                    const newData = {
                        ...confirmData,
                        id: dummyUsers.length + 1, 
                        approved_by: confirmData.approved_by || '',
                        request_by: confirmData.request_by || '',
                        status: confirmData.status || '',
                        material: confirmData.material || '',
                        uom: confirmData.uom || '',
                    };
                    dummyUsers.push(newData as Model);
                    setIsSuccessModalVisible(true); // Tampilkan modal sukses
                } else if (mode === 'edit' && customerId) {
                    const index = dummyUsers.findIndex(user => user.id === Number(customerId));
                    if (index !== -1) {
                        dummyUsers[index] = {
                            ...dummyUsers[index],
                            ...confirmData,
                            approved_by: confirmData.approved_by || '',
                            request_by: confirmData.request_by || '',
                            status: confirmData.status || '',
                            material: confirmData.material || '',
                            uom: confirmData.uom || '',
                        };
                        setIsSuccessModalVisible(true); // Tampilkan modal sukses
                    } else {
                        throw new Error('Data tidak ditemukan');
                    }
                }
                reset();
                setConfirmData(null);
            } catch (error) {
                console.error('Failed to perform action:', error);
                setIsFailedModalVisible(true); // Tampilkan modal gagal
            } finally {
                setIsSubmitting(false);
                setIsModalVisible(false); // Tutup modal konfirmasi
            }
        }
    };

    return (
        <div className="font-secondary">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card p-5 w-100 mb-8">
                    <div className="row g-2">
                        <h3 className="mb-6">Stock Opname</h3>
                        <DateInputField
                            label="Tanggal Opname"
                            value={watch('opname_date')}
                            onChange={(date) => setValue('opname_date', date, { shouldValidate: true })}
                        />
                    </div>
                </div>
                <div className="card p-5 w-100">
                    <div className="row g-2">
                        <h3 className="mb-6">Material</h3>
                        {/* Baris 1 */}
                        <div className="row g-2">
                            <div className="col-md-1">
                                <p>1</p>
                            </div>
                            <div className="col-md-2">
                                <label className="form-label">Material</label>
                                <p>Ultra Milk</p>
                            </div>
                            <div className="col-md-2">
                                <label className="form-label">UOM</label>
                                <p>Dus</p>
                            </div>
                            <div className="col-md-3">
                                <InputField
                                    control={control}
                                    name="actual_stock"
                                    label="Actual Stock"
                                    type="number"
                                    placeholder='Masukkan Stock Aktual'
                                    errors={errors.actual_stock?.message}
                                />
                            </div>
                            <div className="col-md-4">
                                <TextareaField
                                    control={control}
                                    name="note"
                                    label="Catatan"
                                    placeholder='Masukkan Catatan'
                                    errors={errors.note?.message}
                                />
                            </div>
                        </div>
                        {/* Baris 2 */}
                        <div className="row g-2">
                            <div className="col-md-2 offset-md-3">
                                <label className="form-label">UOM</label>
                                <p>Pack</p>
                            </div>
                            <div className="col-md-3">
                                <InputField
                                    control={control}
                                    name="actual_stock"
                                    label="Actual Stock"
                                    type="number"
                                    placeholder='Masukkan Stock Aktual'
                                    errors={errors.actual_stock?.message}
                                />
                            </div>
                            <div className="col-md-4">
                                <TextareaField
                                    control={control}
                                    name="note"
                                    label="Catatan"
                                    placeholder='Masukkan Catatan'
                                    errors={errors.note?.message}
                                />
                            </div>
                        </div>
                        {/* Baris 3 */}
                        <div className="row g-2">
                            <div className="col-md-1">
                                <p>2</p>
                            </div>
                            <div className="col-md-2">
                                <label className="form-label">Material</label>
                                <p>Ultra Milk</p>
                            </div>
                            <div className="col-md-2">
                                <label className="form-label">UOM</label>
                                <p>Dus</p>
                            </div>
                            <div className="col-md-3">
                                <InputField
                                    control={control}
                                    name="actual_stock"
                                    label="Actual Stock"
                                    type="number"
                                    placeholder='Masukkan Stock Aktual'
                                    errors={errors.actual_stock?.message}
                                />
                            </div>
                            <div className="col-md-4">
                                <TextareaField
                                    control={control}
                                    name="note"
                                    label="Catatan"
                                    placeholder='Masukkan Catatan'
                                    errors={errors.note?.message}
                                />
                            </div>
                        </div>
                        {/* Baris 4 */}
                        <div className="row g-2">
                            <div className="col-md-2 offset-md-3">
                                <label className="form-label">UOM</label>
                                <p>Pack</p>
                            </div>
                            <div className="col-md-3">
                                <InputField
                                    control={control}
                                    name="actual_stock"
                                    label="Actual Stock"
                                    type="number"
                                    placeholder='Masukkan Stock Aktual'
                                    errors={errors.actual_stock?.message}
                                />
                            </div>
                            <div className="col-md-4">
                                <TextareaField
                                    control={control}
                                    name="note"
                                    label="Catatan"
                                    placeholder='Masukkan Catatan'
                                    errors={errors.note?.message}
                                />
                            </div>
                        </div>
                        <div className="row g-2">
                            <div className="col-md-2 offset-md-3">
                                <label className="form-label">UOM</label>
                                <p>Pack</p>
                            </div>
                            <div className="col-md-3">
                                <InputField
                                    control={control}
                                    name="actual_stock"
                                    label="Actual Stock"
                                    type="number"
                                    placeholder='Masukkan Stock Aktual'
                                    errors={errors.actual_stock?.message}
                                />
                            </div>
                            <div className="col-md-4">
                                <TextareaField
                                    control={control}
                                    name="note"
                                    label="Catatan"
                                    placeholder='Masukkan Catatan'
                                    errors={errors.note?.message}
                                />
                            </div>
                        </div>
                        <div className="row g-2">
                            <div className="col-md-2 offset-md-3">
                                <label className="form-label">UOM</label>
                                <p>Pack</p>
                            </div>
                            <div className="col-md-3">
                                <InputField
                                    control={control}
                                    name="actual_stock"
                                    label="Actual Stock"
                                    type="number"
                                    placeholder='Masukkan Stock Aktual'
                                    errors={errors.actual_stock?.message}
                                />
                            </div>
                            <div className="col-md-4">
                                <TextareaField
                                    control={control}
                                    name="note"
                                    label="Catatan"
                                    placeholder='Masukkan Catatan'
                                    errors={errors.note?.message}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-end row">
                    <div className="col-12 text-end my-4">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="btn px-12 py-3 border border-gray-500 me-2"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary px-12 py-3 border border-primary"
                            disabled={!isValid || isSubmitting}
                        >
                            {isSubmitting ? 'Mengirim...' : buttonTitle}
                        </button>
                    </div>
                </div>
                {isModalVisible && (
                    <ConfirmModal
                        headTitle={headTitle}
                        message={message}
                        confirmButtonLabel={confirmButtonLabel}
                        cancelButtonLabel={cancelButtonLabel}
                        handleSubmit={handleConfirm}
                        closeModal={() => setIsModalVisible(false)}
                    />
                )}
                {isSuccessModalVisible && (
                    <SuccessModal
                        closeModal={() => {
                            setIsSuccessModalVisible(false);
                            navigate('../'); // Navigasi ke halaman induk setelah sukses
                        }}
                        successMessage={successMessage}
                    />
                )}
                {isFailedModalVisible && (
                    <FailedModal
                        closeModal={() => setIsFailedModalVisible(false)}
                        message="Terjadi kesalahan, coba lagi!"
                    />
                )}
            </form>
        </div>
    );
};

export default Form;