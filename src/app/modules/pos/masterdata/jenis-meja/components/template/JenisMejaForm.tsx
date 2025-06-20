import { FC, useState, useRef, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import InputField from '@metronic/layout/components/form/molecules/InputField';
import ConfirmModal from '@metronic/layout/components/form/organism/ConfirmModal';
import SuccessModal from '@metronic/layout/components/form/organism/SuccessModal';
import { createJenisMeja, deleteJenisMeja, getJenisMejaById, updateJenisMeja } from '../core/_request'; // Sesuaikan dengan API Anda
import { FailedModal } from '@metronic/layout/components/form/organism/FailedModal';

interface FormData {
    id?: string;
    name: string;
}

interface FormProps {
    mode: 'create' | 'edit';
    successMessage?: string;
    headTitle: string;
    buttonTitle: string;
    message: string;
    cancelButtonLabel?: string;
}

const schema = Yup.object().shape({
    name: Yup.string().required('Nama jenis meja wajib diisi'),
});

const JenisMejaForm: FC<FormProps> = ({
    mode,
    successMessage = 'Data berhasil disimpan!',
    headTitle,
    buttonTitle,
    message,
    cancelButtonLabel = 'Batal',
}) => {
    const { id = '' } = useParams<{ id: string }>();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isFailedModalVisible, setIsFailedModalVisible] = useState(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const handleConfirmData = useRef<FormData | null>(null);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)

    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,

    } = useForm<FormData>({
        resolver: yupResolver(schema),
        mode: 'onTouched',
        defaultValues: {
            name: '',
        },
    });

    // Fetch data for edit mode
    useEffect(() => {
        if (mode === 'edit' && id) {
            const fetchData = async () => {
                setIsLoading(true);
                try {
                    const response = await getJenisMejaById(id); // Sesuaikan dengan API Anda
                    reset({
                        name: response.name,
                    })
                } catch (error) {
                    console.error('Gagal memuat data:', error);
                    setIsFailedModalVisible(true);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchData();
        }
    }, [mode, id, reset]);

    const onSubmit = (data: FormData) => {
        console.log('Form data:', data);
        handleConfirmData.current = data;
        setIsModalVisible(true); // Show confirmation modal
    };

    const handleConfirm = async () => {
        if (handleConfirmData.current) {
            setIsSubmitting(true);
            try {
                const { name } = handleConfirmData.current;
                const payload = { name };

                if (mode === 'create') {
                    await createJenisMeja(payload); // Sesuaikan dengan API Anda
                } else if (mode === 'edit' && id) {
                    await updateJenisMeja(id, payload); // Sesuaikan dengan API Anda
                }

                setIsModalVisible(false);
                setIsSuccessModalVisible(true);
            } catch (error) {
                console.error('Gagal menyimpan data:', error);
                setIsModalVisible(false);
                setIsFailedModalVisible(true);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const handleDelete = async () => {
        try {
            await deleteJenisMeja(id); // Sesuaikan dengan API Anda
            setIsSuccessModalVisible(true);
        } catch (error) {
            console.error('Gagal menghapus data:', error);
            setIsFailedModalVisible(true);
        }
    }

    return (
        <div className="font-secondary">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card p-5 w-100 mb-4">
                    <div className="row g-6">
                        <InputField
                            name="name"
                            label="Nama Jenis Meja"
                            control={control}
                            placeholder="Masukkan nama jenis meja"
                            errors={errors}
                            type="text"
                            disabled={isLoading}
                        />
                    </div>
                </div>
                <div className="d-flex justify-content-end gap-2">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="btn px-12 py-3 border border-gray-400"
                        disabled={isSubmitting || isLoading}
                    >
                        {cancelButtonLabel}
                    </button>
                    {
                        mode === 'edit' && (
                            <button
                                type="button"
                                onClick={() => setIsDeleteModalVisible(true)}
                                className="btn btn-primary px-12 py-3 border border-primary"
                                disabled={isSubmitting || isLoading}
                            >
                                {"Hapus"}
                            </button>
                        )
                    }
                    <button
                        type="submit"
                        className="btn btn-primary px-12 py-3 border border-primary"
                        disabled={!isValid || isSubmitting || isLoading}
                    >
                        {isSubmitting ? 'Menyimpan...' : buttonTitle}
                    </button>
                </div>

                {/* Confirmation Modal */}
                {isModalVisible && (
                    <ConfirmModal
                        buttonTitle={buttonTitle}
                        handleSubmit={handleConfirm}
                        closeModal={() => setIsModalVisible(false)}
                        headTitle={"Tambah Jenis Meja"}
                        confirmButtonLabel={buttonTitle}
                        cancelButtonLabel="Kembali"
                        message={message}
                    // isSubmitting={isSubmitting}
                    />
                )}

                {isDeleteModalVisible && (
                    <ConfirmModal
                        buttonTitle={buttonTitle}
                        handleSubmit={handleDelete}
                        closeModal={() => setIsModalVisible(false)}
                        headTitle={
                            "Hapus Jenis Meja"
                        }
                        confirmButtonLabel={"Hapus"}
                        cancelButtonLabel="Kembali"
                        message={
                            "Apakah kamu yakin ingin menghapus nya?"
                        }
                    // isSubmitting={isSubmitting}
                    />
                )}

                {/* Success Modal */}
                {isSuccessModalVisible && (
                    <SuccessModal
                        successMessage={successMessage}
                        closeModal={() => {
                            setIsSuccessModalVisible(false);
                            navigate(-1); // Navigate back after success
                        }}
                    />
                )}

                {/* Failed Modal */}
                {isFailedModalVisible && (
                    <FailedModal
                        message="Gagal menyimpan data"
                        closeModal={() => setIsFailedModalVisible(false)}
                    />
                )}
            </form>
        </div>
    );
}

export default JenisMejaForm;