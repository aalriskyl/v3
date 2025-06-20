/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ConfirmModal from '@metronic/layout/components/form/organism/ConfirmModal';
import SuccessModal from '@metronic/layout/components/form/organism/SuccessModal';
import { FailedModal } from '@metronic/layout/components/form/organism/FailedModal';
import UomSectionEdit from './section/UomSectionEdit';

const schema = Yup.object().shape({
    satuan_uom: Yup.string().required('Satuan UOM wajib dipilih'),
    satuan_konversi: Yup.string().required('Satuan Konversi wajib dipilih'),
    konversi_uom: Yup.string().required('Konversi UOM wajib diisi'),
    barcode: Yup.string().required('Barcode wajib diisi'),
    sku: Yup.string().required('SKU wajib diisi'),
    bisa_dijual: Yup.boolean().default(false),
});

type FormData = {
    satuan_uom: string;
    satuan_konversi: string;
    konversi_uom: string;
    barcode: string;
    sku: string;
    bisa_dijual: boolean;
};

const UomFormEdit: FC<{
    successMessage?: string;
    headTitle: string;
    buttonTitle: string;
    message: string;
    confirmButtonLabel: string;
    cancelButtonLabel: string;
}> = ({
    successMessage,
    headTitle,
    buttonTitle,
    message,
    confirmButtonLabel,
    cancelButtonLabel,
}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [isFailedModalVisible, setIsFailedModalVisible] = useState(false);
    const handleConfirmData = useRef<FormData | null>(null);
    const navigate = useNavigate();
    const [uomDefaultOption, setUOMDefaultOption] = useState([]) as any



    const { control, handleSubmit, formState: { errors, isValid }, reset } = useForm<FormData>({
        resolver: yupResolver(schema),
        mode: 'onTouched',
        defaultValues: {
            satuan_uom: '',
            satuan_konversi: '',
            konversi_uom: '',
            barcode: '',
            sku: '',
            bisa_dijual: false,
        },
    });

    const handleCloseFailedModal = () => {
        setIsFailedModalVisible(false);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleConfirm = async () => {
        try {
            // Jika sukses
            setIsModalVisible(false);
            setIsSuccessModalVisible(true);
            reset();
        } catch (error) {
            console.error('Submission error:', error);
            setIsModalVisible(false);
            setIsFailedModalVisible(true);
        }
    };

    const handleCloseSuccessModal = () => {
        navigate('../new');
        setIsSuccessModalVisible(false);
    };

    const goingBack = () => {
        navigate('../');
    };

    return (
        <div className="font-secondary">
            <form>
                <div className="">
                    <UomSectionEdit
                        control={control}
                        errors={errors}
                    />
                </div>
                <div className="d-flex justify-content-end mb-8 mt-4">
                    <Button
                        variant="secondary"
                        onClick={goingBack}
                        type="reset"
                        className="btn border border-gray-500 px-12 py-2 me-4"
                    >
                        {cancelButtonLabel}
                    </Button>
                    <div className="d-flex gap-4">
                        <button
                            type="button"
                            className="btn border border-primary text-primary px-12 py-4"
                        >
                            Simpan & Tambah Baru
                        </button>
                        <button
                            onClick={showModal}
                            type="button"
                            className="btn btn-primary px-12 py-4"
                        >
                            {confirmButtonLabel}
                        </button>
                    </div>
                </div>
            </form>
            {isFailedModalVisible && (
                <FailedModal
                    closeModal={handleCloseFailedModal}
                    message="Bill of Material gagal ditambahkan"
                    confirmLabel={buttonTitle}
                />
            )}
            {isModalVisible && (
                <ConfirmModal
                    handleSubmit={handleConfirm}
                    closeModal={() => setIsModalVisible(false)}
                    headTitle={headTitle}
                    confirmButtonLabel={buttonTitle}
                    buttonTitle={confirmButtonLabel}
                    cancelButtonLabel='Batalkan'
                    message={message}
                />
            )}

            {isSuccessModalVisible && (
                <SuccessModal
                    closeModal={handleCloseSuccessModal}
                    message={successMessage}
                />
            )}
        </div>
    );
};

export default UomFormEdit;