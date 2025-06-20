import { FC, useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import InputField from '@metronic/layout/components/form/molecules/InputField';
import TextareaField from '@metronic/layout/components/form/molecules/TextareaField';
import ConfirmModal from '@metronic/layout/components/form/organism/ConfirmModal';
import SuccessModal from '@metronic/layout/components/form/organism/SuccessModal';
import ImageField from '@metronic/layout/components/form/molecules/ImageField';

interface FormData {
    foto: File | null;
    name: string;
    desc: string;
}

interface FormProps {
    formTitle?: string;
    submitButtonLabel?: string;
    successMessage?: string;
    headTitle: string;
    buttonTitle: string;
    message: string;
}

const schema = Yup.object().shape({
    foto: Yup.mixed<File>()
        .nullable()
        .transform((value, originalValue) => {
            return originalValue instanceof File ? originalValue : null;
        }),
    name: Yup.string().required('Format nama tidak valid'),
    desc: Yup.string().required('Deskripsi wajib diisi'),
});

const GoodsForm: FC<FormProps> = ({ successMessage, headTitle, buttonTitle, message }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const handleConfirmData = useRef<FormData | null>(null);

    const navigate = useNavigate();

    const { control, handleSubmit, formState: { errors, isValid }, reset } = useForm<FormData>({
        resolver: yupResolver(schema as any),
        mode: 'onTouched',
        defaultValues: {
            foto: null,
            name: '',
            desc: '',
        },
    });

    const onSubmit = (data: FormData) => {
        console.log('Data valid:', data);
        setIsModalVisible(true);
        // Simpan data sementara untuk diteruskan ke handleConfirm
        handleConfirmData.current = data;
    };

    const handleConfirm = () => {
        if (handleConfirmData.current) {
            console.log('Data dikonfirmasi:', handleConfirmData.current);
            // Lakukan sesuatu dengan data
        }
        setIsModalVisible(false);
        setIsSuccessModalVisible(true);
        reset();
    };
    return (
        <div className="font-secondary">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card p-5 w-100 mb-4">
                    <div className="row g-6">
                        <div className="col-md-12 col-lg-6">
                            <Controller
                                name="foto"
                                control={control}
                                render={({ field }) => (
                                    <ImageField
                                        name="foto"
                                        label="Foto Brand"
                                        onChange={(file) => field.onChange(file)}
                                        errors={errors.foto?.message}
                                    />
                                )}
                            />
                        </div>
                        <div className="col-md-12 col-lg-6">
                            <div className="row g-2">
                                <div className="col-md-12">
                                    <InputField
                                        name="name"
                                        label="Nama Brand"
                                        control={control}
                                        placeholder="Masukkan nama brand"
                                        errors={errors}
                                        type="text"
                                    />
                                </div>
                                <div className="col-md-12">
                                    <TextareaField
                                        name="desc"
                                        label="Deskripsi"
                                        control={control}
                                        placeholder="Masukkan deskripsi"
                                        errors={errors}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-end gap-2">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="btn px-12 py-3 border border-gray-500"
                    >
                        Batal
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

export default GoodsForm;