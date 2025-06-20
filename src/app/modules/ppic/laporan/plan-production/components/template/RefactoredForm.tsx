import { FC, useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { ID } from '@metronic/helpers';
import { PlanProductionModel, initialUser } from '../molecules/core/_models';
import ConfirmModal from '@metronic/layout/components/form/organism/ConfirmModal';
import SuccessModal from '@metronic/layout/components/form/organism/SuccessModal';
import { dummyUsers } from '../organisms/table/dummyUsers';
import { FailedModal } from '@metronic/layout/components/form/organism/FailedModal';
import { Form } from 'react-bootstrap';
import DateInputField from '../molecules/field/DateInputField';
import MaterialTableLayout from './MaterialTableLayout';

interface FormData {
    id?: ID;
    rencana_produksi: 'Mingguan' | 'Harian';
    tanggal_mulai?: Date;
    tanggal_berakhir?: Date;
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
    id: Yup.number().nullable(),
    rencana_produksi: Yup.string()
        .oneOf(['Mingguan', 'Harian'], 'Pilih jenis rencana produksi')
        .required('Rencana produksi wajib diisi'),
    tanggal_mulai: Yup.date()
        .when('rencana_produksi', (rencana_produksi, schema) => {
            return Array.isArray(rencana_produksi) 
                ? schema.nullable() // Jika array, jangan validasi tanggal_mulai
                : rencana_produksi === 'Mingguan'
                ? schema.required('Tanggal mulai produksi wajib diisi')
                : schema.nullable();
        }),
    tanggal_berakhir: Yup.date()
        .when('rencana_produksi', (rencana_produksi, schema) => {
            return Array.isArray(rencana_produksi) 
                ? schema.nullable() // Jika array, jangan validasi tanggal_berakhir
                : rencana_produksi === 'Mingguan'
                ? schema.required('Tanggal berakhir produksi wajib diisi')
                : schema.nullable();
        }),
});

const FormComponent: FC<FormProps> = ({
    mode,
    defaultValues,
    successMessage,
    headTitle,
    // buttonTitle,
    confirmButtonLabel = 'Konfirmasi',
    cancelButtonLabel = 'Batal',
    message,
}) => {
    const { customerId } = useParams<{ customerId: string }>();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [isFailedModalVisible, setIsFailedModalVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [confirmData, setConfirmData] = useState<FormData | null>(null);
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
        watch,
    } = useForm<FormData>({
        mode: 'onTouched',
        resolver: yupResolver(validationSchema),
        defaultValues: defaultValues || {},
    });

    const rencanaProduksi = watch('rencana_produksi');

    useEffect(() => {
        if (mode === 'edit' && customerId) {
            const foundData = dummyUsers.find((user) => user.id === Number(customerId));
            if (foundData) {
                reset({
                    id: foundData.id,
                    rencana_produksi: foundData.rencana_produksi as 'Mingguan' | 'Harian',
                });
            }
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
                const newData: PlanProductionModel = {
                    ...initialUser,
                    ...confirmData,
                    id: mode === 'create' ? dummyUsers.length + 1 : confirmData.id,
                };

                if (mode === 'create') {
                    dummyUsers.push(newData);
                } else if (mode === 'edit' && customerId) {
                    const index = dummyUsers.findIndex((user) => user.id === Number(customerId));
                    if (index !== -1) dummyUsers[index] = newData;
                }

                setIsSuccessModalVisible(true);
                reset();
            } catch (error) {
                console.error('Gagal menyimpan data:', error);
                setIsFailedModalVisible(true);
            } finally {
                setIsSubmitting(false);
                setIsModalVisible(false);
            }
        }
    };

    return (
        <div className="font-secondary">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card p-5 w-100 mb-8">
                    <label className="form-label">Rencana Produksi</label>

                    <Controller
                        name="rencana_produksi"
                        control={control}
                        rules={{ required: 'Rencana produksi wajib diisi' }}
                        render={({ field }) => (
                            <Form.Group className="mb-4">
                                <div className="d-flex gap-4">
                                    <Form.Check
                                        {...field}
                                        type="radio"
                                        id="Mingguan"
                                        label="Mingguan"
                                        value="Mingguan"
                                        checked={field.value === 'Mingguan'}
                                        onChange={() => field.onChange('Mingguan')}
                                    />
                                    <Form.Check
                                        {...field}
                                        type="radio"
                                        id="Harian"
                                        label="Harian"
                                        value="Harian"
                                        checked={field.value === 'Harian'}
                                        onChange={() => field.onChange('Harian')}
                                    />
                                </div>

                                {errors.rencana_produksi && (
                                    <Form.Text className="text-danger">
                                        {errors.rencana_produksi.message}
                                    </Form.Text>
                                )}
                            </Form.Group>
                        )}
                    />

                    {rencanaProduksi === 'Mingguan' && (
                        <div className='row mt-4'>
                            <div className='col-md-6'>
                                <Controller
                                    name="tanggal_mulai"
                                    control={control}
                                    render={({ field: dateField }) => (
                                        <DateInputField
                                            label="Tanggal Mulai Produksi"
                                            value={dateField.value}
                                            onChange={(value) => dateField.onChange(new Date(value))}
                                            error={errors.tanggal_mulai?.message}
                                        />
                                    )}
                                />
                            </div>
                            <div className='col-md-6'>
                                <Controller
                                    name="tanggal_berakhir"
                                    control={control}
                                    render={({ field: dateField }) => (
                                        <DateInputField
                                            label="Tanggal Berakhir Produksi"
                                            value={dateField.value}
                                            onChange={(value) => dateField.onChange(new Date(value))}
                                            error={errors.tanggal_berakhir?.message}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    )}

                    {rencanaProduksi === 'Harian' && (
                        <div className='row mt-4'>
                            <div className='col-md-6'>
                                <Controller
                                    name="tanggal_mulai"
                                    control={control}
                                    render={({ field: dateField }) => (
                                        <DateInputField
                                            label="Tanggal Produksi"
                                            value={dateField.value}
                                            onChange={(value) => dateField.onChange(new Date(value))}
                                            error={errors.tanggal_mulai?.message}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    )}
                </div>

                <MaterialTableLayout />

                <div className="d-flex justify-content-end gap-3 my-4">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="btn btn-primary px-12 py-3 border border-primary"
                    >
                        {cancelButtonLabel}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="btn px-12 py-3 border border-gray-500 me-2"
                    >
                        Simpan Draft
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary px-12 py-3 border border-primary"
                        disabled={!isValid || isSubmitting}
                    >
                        {isSubmitting ? 'Mengirim...' : confirmButtonLabel}
                    </button>
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
                            navigate('../');
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

export default FormComponent;