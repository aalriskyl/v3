import React, { useEffect, useState } from 'react';
import InputField from '@metronic/layout/components/form/molecules/InputField';
import { RecipeSection } from './RecipeSection';
import { PageLink, PageTitle } from '@metronic/layout/core';
import { Button } from 'react-bootstrap';
import ConfirmModal from '@metronic/layout/components/form/organism/ConfirmModal';
import SuccessModal from '@metronic/layout/components/form/organism/SuccessModal';
import { FailedModal } from '@metronic/layout/components/form/organism/FailedModal';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../../../../../../../service/axiosInstance';

interface FormDataMaterial {
    name: string;
    sku: string;
    // expected_result: number;
    price_sell: number;
}

interface FormState extends FormDataMaterial {
    [key: string]: any;
}

export const VariantSectionFinishGoods = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [isFailedModalVisible, setIsFailedModalVisible] = useState(false);
    const [materialDataChoice, setMaterialDataChoice] = useState<any[]>([]);
    const [serviceDataChoice, setServiceDataChoice] = useState<any[]>([]);
    const navigate = useNavigate();
    const[margin, setMargin] = useState(0)

    // Handler untuk menutup modal konfirmasi
    const handleCloseModal = () => {
        setIsModalVisible(false);
    };


    // Handler untuk menutup modal sukses
    const handleCloseSuccessModal = () => {
        setIsSuccessModalVisible(false);
    };

    // Handler untuk menutup modal gagal
    const handleCloseFailedModal = () => {
        setIsFailedModalVisible(false);
    };

    // Handler untuk konfirmasi simpan data
    const handleConfirm = () => {
        setIsModalVisible(false); // Tutup modal konfirmasi
        // Simulasikan proses penyimpanan data
        try {
            // Logika penyimpanan data di sini
            console.log('Data berhasil disimpan');
            setIsSuccessModalVisible(true); // Tampilkan modal sukses
        } catch (error) {
            console.error('Gagal menyimpan data', error);
            setIsFailedModalVisible(true); // Tampilkan modal gagal
        }
    };

    const handleClose = () => {
        // window.location.href = '/ppic/masterdata/bom/new';
    };

    const breadcrumbs: Array<PageLink> = [
        {
            title: 'Dashboard',
            path: '/',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'PPIC',
            path: '/ppic',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Master Data',
            path: '/ppic/masterdata/',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Bill of Material',
            path: '/ppic/masterdata/bom',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Tambah Bill of Material',
            path: '/ppic/masterdata/bom/new',
            isSeparator: false,
            isActive: false,
        },
    ];

    // useEffect(() => {
    //     console.log(materialDataChoice)
    // })
    const { id } = useParams()
    const [formData, setFormData] = useState<FormDataMaterial | null>(null);

    const {
        control,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<FormDataMaterial>({
        mode: 'onTouched',
        defaultValues: {
            name: '',
            sku: '',
            // expected_result: 0,
            price_sell: 0,
        },
    });

    const handleSave = async () => {
        handleSubmit(async (data) => {
            await onSubmit(data);
            navigate(`/ppic/masterdata/bom/finishgoods/detail/${id}`);
        })();
    };

    const handleSaveAndAddNew = () => {
        handleSubmit(async (data) => {
            await onSubmit(data);
            reset();
            setMaterialDataChoice([]);
        })();
    };


    const selectedPriceSell = watch("price_sell")

    useEffect(() => {
        console.log(materialDataChoice)
    }, [materialDataChoice])


    const onSubmit = (data: FormDataMaterial) => {
        const formattedMaterialData = materialDataChoice.map((item) => ({
            material_id: item.material.id,
            uom_id: item.uom.id,
            amount: Number(item.quantity),
            supplier_id: item.supplier.id,
        }));

        const finalData = {
            finish_goods_id: id,
            name: data.name,
            sku: data.sku,
            // expected_result: Number(data.expected_result),
            // price_sell: Number(data.price),
            ingredients_finish_goods: formattedMaterialData,
            ingredients_service: serviceDataChoice.map((item:any) => item.supplier.id)
        };

        axiosInstance
            .post(`/ppic/master-data/finish-goods/variant-finish-goods`, finalData)
            .then(() => setIsSuccessModalVisible(true))
            .catch(() => setIsFailedModalVisible(true));
    };

    return (
        <>
            <PageTitle breadcrumbs={breadcrumbs}>Tambah Finish Goods</PageTitle>
            <div className="p-5 w-100 mb-4">
                <div className="card mb-4">
                    <div className="p-5">
                        <h3 className='mb-6'>Variant Finish Goods</h3>
                        <div className="row g-2">
                            <div className="col-md-6">
                                <InputField
                                    name="name"
                                    label="Nama Varian Finish Goods"
                                    control={control}
                                    placeholder="Masukkan nama varian finish goods"
                                    errors={errors}
                                    type="text"
                                />
                            </div>
                            <div className="col-md-6">
                                <InputField
                                    name="price_sell"
                                    label="Harga Jual"
                                    control={control}
                                    placeholder="Masukkan Harga Jual"
                                    errors={errors}
                                    type="text"
                                />
                            </div>
                            <div className="col-md-6">
                                <InputField
                                    name=""
                                    label="Margin" 
                                    control={control}
                                    placeholder="Masukkan ekspektasi jumlah hasil"
                                    errors={errors}
                                    value={`${margin} %`}
                                    type="text"
                                    disabled
                                />
                            </div>
                            <div className="col-md-6">
                                <InputField
                                    name="sku"
                                    label="Masukan SKU"
                                    control={control}
                                    placeholder="Masukan SKU"
                                    errors={errors}
                                    type="number"  
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <RecipeSection
                    materialDataChoice={materialDataChoice}
                    serviceDataChoice={serviceDataChoice}
                    setServiceDataChoice={setServiceDataChoice}
                    setMaterialDataChoice={setMaterialDataChoice}
                />

                <div className="d-flex mt-4 g-4 justify-content-end">
                    <div className="d-flex gap-4">
                        <Button variant="secondary" onClick={() => navigate('/ppic/masterdata/bom/new')}>
                            Kembali
                        </Button>
                        <button
                            type="button"
                            className="btn border border-primary px-8 py-2 text-primary"
                            onClick={handleSaveAndAddNew}
                        >
                            Simpan & Tambah Baru
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary border border-primary px-16 py-2"
                            onClick={handleSave}
                        >
                            Simpan
                        </button>
                    </div>
                </div>

                {isModalVisible && (
                    <ConfirmModal
                        handleSubmit={() => {
                            setIsModalVisible(false);
                            handleSubmit(onSubmit)();
                        }}
                        closeModal={() => setIsModalVisible(false)}
                        headTitle="Tambah Bill of Material"
                        confirmButtonLabel="Tambah"
                        cancelButtonLabel="Batalkan"
                        message="Pastikan bahwa semua informasi sudah benar."
                    />
                )}

                {isSuccessModalVisible && (
                    <SuccessModal
                        closeModal={() => {
                            setIsSuccessModalVisible(false);
                            navigate('../');
                        }}
                        message="Data berhasil disimpan!"
                    />
                )}

                {isFailedModalVisible && (
                    <FailedModal
                        closeModal={() => setIsFailedModalVisible(false)}
                        message="Gagal menyimpan data. Silakan coba lagi."
                        confirmLabel="Tutup"
                    />
                )}
            </div>
        </>
    );
};

export default VariantSectionFinishGoods;