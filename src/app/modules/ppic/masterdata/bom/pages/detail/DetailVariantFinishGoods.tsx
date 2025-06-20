/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import InputField from '@metronic/layout/components/form/molecules/InputField';
import { PageLink, PageTitle } from '@metronic/layout/core';
import { Button } from 'react-bootstrap';
import ConfirmModal from '@metronic/layout/components/form/organism/ConfirmModal';
import SuccessModal from '@metronic/layout/components/form/organism/SuccessModal';
import { FailedModal } from '@metronic/layout/components/form/organism/FailedModal';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../../../../../../../service/axiosInstance';
import { RecipeSection } from '../../components/template/section/RecipeSection';

// interface VariantSectionFinishGoodsProps {
//     control: any;
//     errors?: any;
// }

interface FormDataMaterial {
    id: string
    name: string;
    sku: string;
    expected_result: any;
    price: any;
}

export const DetailVariantFinishGoods = () => {
    // State untuk mengontrol visibilitas modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [isFailedModalVisible, setIsFailedModalVisible] = useState(false);
    const [materialDataChoice, setMaterialDataChoice] = useState([]) as any;
    const [serviceDataChoice, setServiceDataChoice] = useState([]) as any;

    const {id} = useParams()

    useEffect(() => {
        axiosInstance.get(`/ppic/master-data/finish-goods/variant-finish-goods/${id}`).then((res : any) => {
            const data = res.data.data;
            console.log("ini data",data)
            setFormData(data);
            reset({
                id: data.id,
                name: data.name,
                sku: data.sku,
                expected_result: data.expected_result,
                price: data.price_sell,
            });
            const ingredients_finish_goods: any = []
            data.ingredients_finish_goods.forEach((item : any) => {
                // append ke ingredient
                ingredients_finish_goods.push({
                    material: {
                        id: item.material_uom.material_id,
                        name: item.material_uom.material.name,
                    },
                    quantity: item.amount,
                    uom: {
                        id: item.material_uom_id,
                        name: item.material_uom.uom_actual.name,
                    },
                    supplier: {
                        id: item.material_supplier.id,
                        name: item.material_supplier.supplier.name,
                    }
                })
            })

            const ingredients_service : any = []
            data.ingredient_finish_goods_service.forEach((item: any) => {
                ingredients_service.push({
                    service: {
                        id: item.service_supplier.service_id,
                        name: item.service_supplier.service.name,
                    },
                    supplier: {
                        id: item.service_supplier.id,
                        name: item.service_supplier.supplier.name   
                    }
                })
            })




            // id: index + 1,  // Memberikan id unik berdasarkan index
            // material: item.material.name,  // Bisa diganti dengan nama jika tersedia
            // satuan_uom: item.uom.name,  // Mengambil nama satuan dari UOM
            // jumlah_material: parseInt(item.quantity, 10),  // Konversi string ke number
            // supplier: item.supplier.name 

            console.log("ingredients_service", ingredients_service)
            setMaterialDataChoice(ingredients_finish_goods)
            setServiceDataChoice(ingredients_service)
        })
    }, [])

    const navigate = useNavigate();

    const handleSave = async () => {
        handleSubmit(async (data) => {
            await onSubmit(data);
            // Kembali satu tingkat URL setelah berhasil menyimpan
            navigate(`/ppic/masterdata/bom/finishgoods/detail/${id}`);
        })();
    };

    const handleSaveAndAddNew = () => {
        handleSubmit(async (data) => {
            await onSubmit(data);
            // Reset semua data form dan state materialDataChoice
            reset({
                name: '',
                sku: '',
                expected_result: 0,
                price: 0,
            });
            setMaterialDataChoice([]); // Kosongkan material data pilihan
            console.log('Form telah direset untuk input baru');
        })();
    };


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

    const [formData, setFormData] = useState<FormDataMaterial | null>(null);

    const {
        control,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm<FormDataMaterial>({
        mode: 'onTouched',
        defaultValues: {
            name: '',
            sku: '',
            expected_result: 0,
            price: 0,
        },
    });

    // Menangkap perubahan nilai input secara real-time
    useEffect(() => {
        const subscription = watch((value: any) => {
            setFormData(value);  // Simpan perubahan data input ke state
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    // Fungsi untuk menyimpan data saat submit form
    const onSubmit = (data: FormDataMaterial) => {
        // Validasi angka
        if (isNaN(data.expected_result) || isNaN(data.price)) {
            console.error("Expected result atau price harus berupa angka");
            setIsFailedModalVisible(true); // Tampilkan modal gagal
            return;
        }

        // Transformasi materialDataChoice menjadi format yang diinginkan
        const formattedMaterialData = materialDataChoice.map((item: any) => ({
            material_id: item.material.id,
            uom_id: item.uom.id,
            amount: parseInt(item.quantity, 10), // Pastikan jumlah dalam angka
            supplier_id: item.supplier.id,
        }));

        // Gabungkan data form dan materialDataChoice
        const finalData = {
            finish_goods_id: id, // Menggunakan ID dari useParams
            name: data.name,
            sku: data.sku,
            expected_result: parseInt(data.expected_result, 10), // Sudah dalam format angka
            price_sell: parseFloat(data.price), // Sudah dalam format angka
            ingredients_finish_goods: formattedMaterialData,
            ingredients_service: serviceDataChoice.map((item:any) => item.supplier.id)

        };

        console.log("Data yang akan disimpan:", finalData);

        axiosInstance
            .post(`/ppic/master-data/finish-goods/variant-finish-goods`, finalData)
            .then(() => {
                setIsSuccessModalVisible(true);
            })
            .catch(() => {
                setIsFailedModalVisible(true); // Tampilkan modal gagal
            });
    };


    return (
        <>
            <PageTitle breadcrumbs={breadcrumbs}>Tambah Finish Goods</PageTitle>
            <div className="p-5 w-100 mb-4">
                {/* Main Form Card */}
                {/* <form onSubmit={}> */}
                <div className="card mb-4">
                    <div className="p-5">
                        <h3 className='mb-6'>Variant Finish Goods</h3>
                        <div className="row g-2">
                            {/* Finish Goods Form */}
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
                                    name="sku"
                                    label="SKU"
                                    control={control}
                                    placeholder="Masukkan SKU"
                                    errors={errors}
                                    type="text"
                                />
                            </div>
                            <div className="col-md-6">
                                <InputField
                                    name="expected_result"
                                    label="Ekspektasi Jumlah Hasil"
                                    control={control}
                                    placeholder="Masukkan ekspektasi jumlah hasil"
                                    errors={errors}
                                    type="number"
                                />
                            </div>
                            <div className="col-md-6">
                                <InputField
                                    name="price"
                                    label="Harga Jual"
                                    control={control}
                                    placeholder="Masukkan harga jual"
                                    errors={errors}
                                    type="number"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <RecipeSection materialDataChoice={materialDataChoice} serviceDataChoice={serviceDataChoice} setServiceDataChoice={setServiceDataChoice} setMaterialDataChoice={setMaterialDataChoice} />

                {/* Tombol */}
                <div className="d-flex mt-4 g-4 justify-content-end">
                    <div className="d-flex gap-4">
                        <Button variant="secondary" onClick={handleClose}>
                            Kembali
                        </Button>
                        <button
                            type="button"
                            className="btn border border-primary px-8 py-2 text-primary"
                            onClick={handleSaveAndAddNew} // Memanggil handleSaveAndAddNew
                        >
                            Simpan & Tambah Baru
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary border border-primary px-16 py-2"
                            onClick={handleSave} // Memanggil handleSave
                        >
                            Simpan
                        </button>
                    </div>
                </div>

                {/* </form> */}

                {/* Modal Konfirmasi */}
                {isModalVisible && (
                    <ConfirmModal
                        handleSubmit={handleConfirm}
                        closeModal={handleCloseModal}
                        headTitle="Tambah Bill of Material"
                        confirmButtonLabel="Tambah"
                        cancelButtonLabel="Batalkan"
                        message="Pastikan bahwa semua informasi sudah benar."
                    />
                )}

                {/* Modal Sukses */}
                {isSuccessModalVisible && (
                    <SuccessModal
                        closeModal={handleCloseSuccessModal}
                        message="Data berhasil disimpan!"
                    />
                )}

                {/* Modal Gagal */}
                {isFailedModalVisible && (
                    <FailedModal
                        closeModal={handleCloseFailedModal}
                        message="Gagal menyimpan data. Silakan coba lagi."
                        confirmLabel="Tutup"
                    />
                )}
            </div>
        </>
    );
};

export default DetailVariantFinishGoods;