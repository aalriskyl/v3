import { FC, useState, useEffect, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { ID } from '@metronic/helpers';
import { CatatanPengirimanModel, initialUser } from '../molecules/core/_models';
import ConfirmModal from '@metronic/layout/components/form/organism/ConfirmModal';
import SuccessModal from '@metronic/layout/components/form/organism/SuccessModal';
import { dummyUsers } from '../organisms/table/dummyUsers';
import { FailedModal } from '@metronic/layout/components/form/organism/FailedModal';
import SelectField from '@metronic/layout/components/form/molecules/SelectField';
import DateInputField from '../molecules/field/DateInputField';
import MaterialTableLayout from './MaterialTableLayout';

interface FormData extends CatatanPengirimanModel {
    id: ID;
    type: string;
    konsumen: string;
    sales_order_number: string;
    tanggal_pengiriman: Date;
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
    id: Yup.number().nullable().optional(),
    type: Yup.string().required('Tipe wajib diisi'),
    konsumen: Yup.string().required('Konsumen wajib diisi'),
    sales_order_number: Yup.string().required('Nomor Sales Order wajib diisi'),
    tanggal_pengiriman: Yup.date().required('Tanggal Pengiriman wajib diisi'),
});

const FormComponent: FC<FormProps> = ({
    mode,
    defaultValues,
    successMessage,
    headTitle,
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
        // resolver: yupResolver(validationSchema),
        defaultValues: defaultValues || initialUser,
    });
    

    const type = watch('type');

    const filteredKonsumenOptions = useMemo(() => {
        if (!type) return [];
        return dummyUsers
            .filter((user) => user.type === type)
            .map((user) => ({
                value: user.konsumen,
                label: user.konsumen,
            }));
    }, [type]);

    useEffect(() => {
        if (mode === 'edit' && customerId) {
            const foundData = dummyUsers.find((user) => user.id === Number(customerId));
            if (foundData) {
                reset(foundData);
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
                const newData: CatatanPengirimanModel = {
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
                    <h3 className='mb-6'>Catatan Pengiriman</h3>
                    <div className='row'>
                        <div className='col-md-6'>
                            <SelectField
                                placeholder="Pilih Nomor Sales Order"
                                name="sales_order_number"
                                label="Nomor Sales Order"
                                control={control}
                                options={[
                                    { value: 'Tidak Ada', label: 'Tidak Ada' },
                                    { value: 'SO-001', label: 'SO-001' },
                                    { value: 'SO-002', label: 'SO-002' },
                                ]}
                                errors={errors}
                            />
                            <SelectField
                                placeholder="Pilih Tipe"
                                name="type"
                                label="Tipe"
                                control={control}
                                options={[
                                    { value: 'Customer', label: 'Customer' },
                                    { value: 'Outlet', label: 'Outlet' },
                                ]}
                                errors={errors}
                                // disabled
                            />
                        </div>
                        <div className='col-md-6'>
                            <Controller
                                name="tanggal_pengiriman"
                                control={control}
                                render={({ field: dateField }) => (
                                    <DateInputField
                                        label="Tanggal Pengiriman"
                                        value={dateField.value}
                                        onChange={(value) => dateField.onChange(new Date(value))}
                                        error={errors.tanggal_pengiriman?.message}
                                    />
                                )}
                            />
                            {type && (
                                <SelectField
                                    placeholder={`Pilih ${type}`}
                                    name="konsumen"
                                    label={type}
                                    control={control}
                                    options={filteredKonsumenOptions}
                                    errors={errors}
                                    // disabled
                                />
                            )}
                        </div>
                    </div>
                </div>

                <MaterialTableLayout />

                <div className="d-flex justify-content-end gap-3 my-4">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="btn px-12 py-3 border border-gray-500 me-2"
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