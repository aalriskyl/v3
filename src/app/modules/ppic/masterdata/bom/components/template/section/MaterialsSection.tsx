/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useForm } from 'react-hook-form';
import InputField from '@metronic/layout/components/form/molecules/InputField';
import SelectField from '@metronic/layout/components/form/molecules/SelectField';
import ImageField from '@metronic/layout/components/form/molecules/ImageField';
import { useEffect, useState } from 'react';
import TextareaField from '@metronic/layout/components/form/molecules/TextareaField';
import axiosInstance from '../../../../../../../../service/axiosInstance';
import { useNavigate } from 'react-router-dom';

interface MaterialsSectionProps {
    control: any;
    errors?: any;
    saveData: any
}

interface FormData {
    picture: File | null;
    name: string;
    description: string;
    variant_default_purchase: boolean;
    variant_default_sale: boolean;
    category_id: string;
}


export const MaterialsSection = ({ saveData }: MaterialsSectionProps) => {

    const [activeTab, setActiveTab] = useState<'Material' | 'Finish Goods'>('Material');
    const [category, setCategory] = useState<{ value: string; label: string; }[]>([]);
    const [parent, setParent] = useState([]) as any

    // State untuk menyimpan data formulir
    const { control, handleSubmit, formState, reset } = useForm<FormData>({
        defaultValues: {
            picture: null,
            name: '',
            description: '',
            variant_default_purchase: false,
            variant_default_sale: false,
            category_id: '',
        },
    });

    const { errors, isValid } = formState;


    const onSubmitFinishGoods = async (data: FormData) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);

        // Pastikan nilai boolean dikirim dalam format angka (1 atau 0), jika backend mendukungnya
        formData.append('variant_default_purchase', data.variant_default_purchase ? 'true' : 'false');
        formData.append('variant_default_sale', data.variant_default_sale ? 'true' : 'false');

        formData.append('category_id', data.category_id);

        console.log("gambar", data.picture)

        // Pastikan picture adalah file yang valid
        if (data.picture && data.picture instanceof File) {
            formData.append('picture', data.picture);
        } else {
            console.error('Error: Picture is not a valid file');
        }

        console.log('FormData Entries:', Object.fromEntries(formData.entries()));


        try {
            const response = await axiosInstance.post(
                '/ppic/master-data/finish-goods',
                formData
            );

            console.log(response.data.id)

            window.location.href = `/ppic/masterdata/bom/finishgoods/detail/${response.data.data.id}?new=true`;
            // reset();  // Reset form setelah submit sukses
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        const product_type_id = activeTab == "Material" ? 1 : 3

        const fetchCategories = async () => {
            try {
                const response = await axiosInstance.get(
                    `/inventory/master-data/category/select?product_type_id=${product_type_id}`
                );


                if (response.data.status === 200) {
                    const formattedCategories = response.data.data.categories.map((item: any) => ({
                        value: item.id,
                        label: item.name,
                    }));

                    setCategory(formattedCategories);
                } else {
                    console.error('Error fetching categories:', response.data.message);
                }
            } catch (error) {
                console.error('API error:', error);
            }
        };

        fetchCategories();
    }, [activeTab])

    const goingBack = () => {
        navigate('../');
    };

    return (
        <div className="p-5 w-100 mb-4">
            {/* Main Form Card */}
            <div className="card mb-4">
                {/* Header Navigation */}
                <div className="p-5">
                <div className='nav nav-tabs nav-line-tabs mb-5 fs-6'>
                        <div className='nav-item'>
                            <button
                                className={`nav-link fw-bold fs-5 ${activeTab === 'Material' ? 'active' : ''}`}
                                onClick={() => setActiveTab('Material')}
                            >
                                Material
                            </button>
                        </div>
                        <div className='nav-item'>
                            <button
                                className={`nav-link fw-bold fs-5 ${activeTab === 'Finish Goods' ? 'active' : ''}`}
                                onClick={() => setActiveTab('Finish Goods')}
                            >
                                Finish Goods
                            </button>
                        </div>
                    </div>
                </div>

                {/* Form Content */}
                <div className="p-5">
                    {activeTab === 'Material' ? (
                        <div className="row g-2">
                            {/* Material Goods Form */}
                            <div className="col-md-12 col-lg-6 pe-6">
                                <Controller
                                    name="picture"
                                    control={control}
                                    render={({ field }) => (
                                        <ImageField
                                            name="picture"
                                            label="Foto Material"
                                            onChange={(file) => field.onChange(file)}
                                            errors={errors.picture?.message}
                                        />
                                    )}
                                />
                                <TextareaField
                                    name="description"
                                    label="Deskripsi"
                                    control={control}
                                    placeholder="Masukkan deskripsi"
                                    errors={errors}
                                />
                            </div>
                            <div className="col-md-12 col-lg-6">
                                <div className="row g-2">
                                    <div className="col-md-12">
                                        <InputField
                                            name="name"
                                            label="Nama Material"
                                            control={control}
                                            placeholder="Masukkan nama Material"
                                            errors={errors}
                                            type="text"
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <SelectField
                                            name="material"
                                            label="Kategori Material"
                                            placeholder="Pilih kategori material"
                                            control={control}
                                            errors={errors}
                                            options={category}
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <span className="me-2">Set default</span>
                                        <div className="checkbox-inline mt-2">
                                            <label className="d-flex align-items-center">
                                                <div className="d-flex align-items-center me-10">
                                                    <input
                                                        type="checkbox"
                                                        name="uom"
                                                        id="uom"
                                                        className="form-check-input"
                                                    />
                                                    <span className="ms-2">Varian Penjualan</span>
                                                </div>
                                                <div className="d-flex align-items-center me-10">
                                                    <input
                                                        type="checkbox"
                                                        name="sell"
                                                        id="sell"
                                                        className="form-check-input"
                                                    />
                                                    <span className="ms-2">Varian Pembelian</span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        // <></>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmitFinishGoods)} className="row g-2">
                            {/* Finish Goods Form */}
                            <div className="col-md-12 col-lg-6 pe-6">
                                <Controller
                                    name="picture"
                                    control={control}
                                    render={({ field }) => (
                                        <ImageField
                                            name="picture"
                                            label="Foto Finish Goods"
                                            onChange={(file) => field.onChange(file)}
                                            errors={errors.picture?.message}
                                        />
                                    )}
                                />
                                <TextareaField
                                    name="description"
                                    label="Deskripsi"
                                    control={control}
                                    placeholder="Masukkan deskripsi"
                                    errors={errors}
                                />
                            </div>
                            <div className="col-md-12 col-lg-6">
                                <div className="row g-2">
                                    <div className="col-md-12">
                                        <InputField
                                            name="name"
                                            label="Nama Finish Goods"
                                            control={control}
                                            placeholder="Masukkan nama finish goods"
                                            errors={errors}
                                            type="text"
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <SelectField
                                            name="category_id"
                                            label="Kategori Produk"
                                            placeholder="Pilih kategori produk"
                                            control={control}
                                            errors={errors}
                                            options={category}
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <span className="me-2">Set default</span>
                                        <div className="checkbox-inline mt-2">
                                            <label className="d-flex align-items-center">
                                                <div className="d-flex align-items-center me-10">
                                                    <Controller
                                                        name="variant_default_sale"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <>
                                                                <input
                                                                    type="checkbox"
                                                                    id="uom"
                                                                    className="form-check-input"
                                                                    checked={field.value}
                                                                    onChange={(e) => field.onChange(e.target.checked)}
                                                                />
                                                                <span className="ms-2">Varian Penjualan</span>
                                                            </>
                                                        )}
                                                    />
                                                </div>
                                                <div className="d-flex align-items-center me-10">
                                                    <Controller
                                                        name="variant_default_purchase"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <>
                                                                <input
                                                                    type="checkbox"
                                                                    id="sell"
                                                                    className="form-check-input"
                                                                    checked={field.value}
                                                                    onChange={(e) => field.onChange(e.target.checked)}
                                                                />
                                                                <span className="ms-2">Varian Pembelian</span>
                                                            </>
                                                        )}
                                                    />
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end mb-8 mr-10 mt-4">
                                <button onClick={goingBack} type="reset" className="btn border border-gray-500 px-12 py-2 me-4">
                                    Batalkan
                                </button>
                                <button type="submit" className="btn btn-primary px-12 py-4">
                                    {"Simpan"}
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                {/* 
                <div className="d-flex justify-content-end mb-8 mr-10 mt-4">
                    <button onClick={goingBack} type="reset" className="btn border border-gray-500 px-12 py-2 me-4">
                        Batalkan
                    </button>
                    <button onClick={saveData()} type="button" className="btn btn-primary px-12 py-4">
                        {"Simpan"}
                    </button>
                </div> */}
            </div>

            {/* Sub-section Cards */}
            {/* {
                parent.id !== "" && (
                    <>
                        {
                            parent.type == "Material" && (
                                <>
                                    {activeTab === 'Material' && (
                                        <div className="row g-4">
                                            <div className="col-12">
                                                <UOMSection />
                                            </div>
                                        </div>
                                    )}
                                </>
                            )
                        }

                        {
                            parent.type == "finish" && (
                                <>
                                    {activeTab === 'finish' && (
                                        <div className="row g-4">
                                            <div className="col-12">
                                                <GoodsSection />
                                            </div>
                                        </div>
                                    )}
                                </>
                            )
                        }
                    </>
                )
            } */}
            {/* <div className="d-flex justify-content-end mb-8 mr-10 mt-4">
                <button onClick={goingBack} type="reset" className="btn border border-gray-500 px-12 py-2 me-4">
                    Batalkan
                </button>
                <button type="submit" className="btn btn-primary px-12 py-4">
                    {"Simpan"}
                </button>
            </div> */}
        </div>
    );
};