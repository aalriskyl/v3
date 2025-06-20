import { FC, useState, useRef, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import InputField from '@metronic/layout/components/form/molecules/InputField';
import ConfirmModal from '@metronic/layout/components/form/organism/ConfirmModal';
import SuccessModal from '@metronic/layout/components/form/organism/SuccessModal';
import SelectField from '../molecules/field/SelectField';
import { createScheme, updateScheme } from '../../core/_request';

interface FormData {
    id?: string;
    name: string;
    type: string;
}

interface FormProps {
    mode?: 'create' | 'edit';
    defaultValues?: FormData;
    submitButtonLabel?: string;
    successMessage?: string;
    headTitle: string;
    buttonTitle: string;
    message: string;
    cancelButtonLabel?: string;
}

const schema = Yup.object().shape({
    name: Yup.string().required('Nama skema harga wajib diisi'),
    type: Yup.string().required('Pilih tipe skema harga'),
});

const SkemaForm: FC<FormProps> = ({
    mode = 'create',
    defaultValues,
    successMessage = 'Skema harga berhasil diubah',
    headTitle,
    buttonTitle = 'Simpan',
    message,
    cancelButtonLabel = 'Kembali',
}) => {
    const { id: skemaId } = useParams<{ id: string }>();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [categories, setCategories] = useState<{ value: string; label: string }[]>([
        { value: 'pembelian', label: 'Pembelian' },
        { value: 'penjualan', label: 'Penjualan' },
    ]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const handleConfirmData = useRef<FormData | null>(null);

    const navigate = useNavigate();

    const { control, handleSubmit, formState: { errors, isValid }, reset } = useForm<FormData>({
        resolver: yupResolver(schema),
        mode: 'onTouched',
        defaultValues: defaultValues || {
            name: '',
            type: '',
        },
    });

    const onSubmit = (data: FormData) => {
        setErrorMessage(null);
        setIsModalVisible(true);
        handleConfirmData.current = data;
    };

    const handleConfirm = async () => {
        if (handleConfirmData.current) {
            try {
                if (mode === 'edit' && skemaId) {
                    await updateScheme(skemaId, handleConfirmData.current);
                } else {
                    await createScheme(handleConfirmData.current);
                }
                setIsModalVisible(false);
                setIsSuccessModalVisible(true);
                reset();
            } catch (error: any) {
                setErrorMessage(error.response?.data?.message || 'Terjadi kesalahan saat mengubah skema harga');
                setIsModalVisible(false);
            }
        }
    };

    return (
        <div className="font-secondary">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card p-5 w-100 mb-4">
                    <div className="row g-6">
                        <div className="col-md-6">
                            <InputField
                                name="name"
                                label="Nama Skema Harga"
                                control={control}
                                placeholder="Masukkan nama skema harga"
                                errors={errors}
                                type="text"
                            />
                        </div>
                        <div className="col-md-6">
                            <SelectField
                                name="type"
                                label="Tipe Skema Harga"
                                control={control}
                                options={categories}
                                errors={errors}
                            />
                        </div>
                    </div>
                </div>

                {errorMessage && (
                    <div className="alert alert-danger">{errorMessage}</div>
                )}

                <div className="d-flex justify-content-end gap-2">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="btn px-12 py-3 border border-gray-400"
                    >
                        {cancelButtonLabel}
                    </button>

                    <button
                        type="submit"
                        className="btn btn-primary px-12 py-3 border border-primary"
                        disabled={!isValid}
                    >
                        {buttonTitle}
                    </button>
                </div>
            </form>

            {isModalVisible && (
                <ConfirmModal
                    handleSubmit={handleConfirm}
                    closeModal={() => setIsModalVisible(false)}
                    headTitle={headTitle}
                    confirmButtonLabel={buttonTitle}
                    cancelButtonLabel="Kembali"
                    buttonTitle={buttonTitle}
                    message={message}
                />
            )}

            {isSuccessModalVisible && (
                <SuccessModal
                    closeModal={() => setIsSuccessModalVisible(false)}
                    message={successMessage}
                />
            )}
        </div>
    );
};

export default SkemaForm;