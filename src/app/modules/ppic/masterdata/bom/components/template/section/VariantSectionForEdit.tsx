/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState, useEffect } from 'react';
import { useForm, Control, FieldErrors  } from 'react-hook-form';
import { PageTitle } from '@metronic/layout/core';
import { useParams, useNavigate } from 'react-router-dom';
import ImageHolder from '../../molecules/field/ImageHolder';
import InputField from '@metronic/layout/components/form/molecules/InputField';
import SelectField from '@metronic/layout/components/form/molecules/SelectField';
import TextareaField from '@metronic/layout/components/form/molecules/TextareaField';
import { RecipeSection } from './RecipeSection';
import { GoodsSection } from './VariantFinishGoods';
import { FormData } from '../MaterialsFormForEdit';

const dummyBOMData = {
    id: '1',
    picture: 'Here is the picture',
    description: 'Ini adalah deskripsi material 1',
    material_name: 'Material 1',
    category: 'Category 1',
    // brand: 'Brand2',
    setDefault: 'Varian Penjualan',
};

interface VariantSectionForEditProps {
    control: Control<FormData>;
    errors: FieldErrors<FormData>;
}

export const VariantSectionForEdit: FC<VariantSectionForEditProps> = ({ control, errors }) => {
    const { handleSubmit } = useForm();
    const [activeTab, setActiveTab] = useState<'raw' | 'finish'>('raw');
    const [formData, setFormData] = useState<any>({
        picture: '',
        description: '',
        material_name: '',
        category: '',
        // brand: '',
        setDefault: '',
    });

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const fetchDummyData = async () => {
                setTimeout(() => {
                    setFormData(dummyBOMData);
                }, 500);
            };
            fetchDummyData();
        }
    }, [id]);

    const onSubmit = (data: any) => {
        console.log('Updated Data:', { ...formData, ...data });
        navigate('../');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData: typeof formData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    if (!formData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <PageTitle breadcrumbs={[]}>Ubah Bill of Material</PageTitle>

            <div className="card mb-4">
                {/* Header Navigation */}
                <div className="p-5">
                    <div className="d-flex gap-8">
                        <button
                            type="button"
                            style={{ fontSize: '18px', fontWeight: '600' }}
                            className={`p-0 bg-transparent border-0 ${activeTab === 'raw'
                                ? 'text-primary border-bottom-2 border-primary'
                                : 'text-gray-600 border-bottom-2 border-transparent hover-text-primary'
                                }`}
                            onClick={() => setActiveTab('raw')}
                        >
                            <span className="fw-bold fs-5">Material</span>
                        </button>

                        <button
                            type="button"
                            style={{ fontSize: '18px', fontWeight: '600' }}
                            className={`p-0 bg-transparent border-0 ${activeTab === 'finish'
                                ? 'text-primary border-bottom-2 border-primary'
                                : 'text-gray-600 border-bottom-2 border-transparent hover-text-primary'
                                }`}
                            onClick={() => setActiveTab('finish')}
                        >
                            <span className="fw-bold fs-5">Finish Goods</span>
                        </button>
                    </div>
                    <hr />
                </div>

                {/* Form Content */}
                <div className="p-5">
                    {activeTab === 'raw' ? (
                        <form className="row g-2" onSubmit={handleSubmit(onSubmit)}>
                            {/* Raw Goods Form */}
                            <div className="col-md-12 col-lg-6 pe-6">
                                {/* Foto Material */}
                                <label className="form-label fw-bold">Foto Material</label>
                                <ImageHolder
                                    imageUrl={formData.picture}
                                    altText={`Logo ${formData.material_name}`}
                                    className=""
                                    placeholder="No image available"
                                />

                                {/* Deskripsi */}
                                <label className="form-label fw-bold" htmlFor="description">
                                    Deskripsi
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    className="form-control"
                                    rows={4}
                                    value={formData.description || ''}
                                    onChange={handleInputChange}
                                    placeholder="Masukkan deskripsi material"
                                />
                            </div>
                            <div className="col-md-12 col-lg-6">
                                <div className="row g-2">
                                    <div className="col-md-12">
                                        <label className="form-label fw-bold">Nama Material</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="material_name"
                                            value={formData.material_name || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="form-label fw-bold">Kategori Material</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="category"
                                            value={formData.category || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    {/* <div className="col-md-12">
                                        <label className="form-label fw-bold">Brand</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="brand"
                                            value={formData.brand || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div> */}
                                    <div className="d-flex flex-column align-items-start">
                                        <label className="form-label fw-bold">Set Default</label>
                                        <div className="checkbox-inline my-2 d-flex">
                                            <div className="d-flex align-items-center me-10">
                                                <input
                                                    type="checkbox"
                                                    name="uom"
                                                    id="uom"
                                                    className="form-check-input"
                                                    checked={formData.set || false}
                                                    onChange={handleInputChange}
                                                />
                                                <span className="ms-2">Varian Penjualan</span>
                                            </div>
                                            <div className="d-flex align-items-center me-10">
                                                <input
                                                    type="checkbox"
                                                    name="sell"
                                                    id="sell"
                                                    className="form-check-input"
                                                    checked={formData.sell || false}
                                                    onChange={handleInputChange}
                                                />
                                                <span className="ms-2">Varian Pembelian</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <div className="row g-2">
                            {/* Finish Goods Form */}
                            <div className="col-md-12 col-lg-6 pe-6">
                                <label className="form-label fw-bold">Foto Finish Goods</label>
                                <ImageHolder
                                    imageUrl={formData.picture}
                                    altText={`Logo ${formData.material_name}`}
                                    className=""
                                    placeholder="No image available"
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
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <SelectField
                                            name="material"
                                            label="Kategori Produk"
                                            placeholder="Pilih kategori produk"
                                            control={control}
                                            errors={errors}
                                            options={[
                                                { value: 'material1', label: 'Material 1' },
                                                { value: 'material2', label: 'Material 2' },
                                            ]}
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <label className="form-label fw-bold">Set Default</label>
                                        <div className="checkbox-inline my-2 d-flex">
                                            <div className="d-flex align-items-center me-10">
                                                <input
                                                    type="checkbox"
                                                    name="uom"
                                                    id="uom"
                                                    className="form-check-input"
                                                    checked={formData.set || false}
                                                    onChange={handleInputChange}
                                                />
                                                <span className="ms-2">Varian Penjualan</span>
                                            </div>
                                            <div className="d-flex align-items-center me-10">
                                                <input
                                                    type="checkbox"
                                                    name="sell"
                                                    id="sell"
                                                    className="form-check-input"
                                                    checked={formData.sell || false}
                                                    onChange={handleInputChange}
                                                />
                                                <span className="ms-2">Varian Pembelian</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}
                </div>
            </div>

            {activeTab === 'raw' && <RecipeSection />}
            {activeTab === 'finish' && <GoodsSection />}
        </>
    );
};

export default VariantSectionForEdit;