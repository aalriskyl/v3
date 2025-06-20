/* eslint-disable @typescript-eslint/no-explicit-any */
import InputField from '@metronic/layout/components/form/molecules/InputField';
import { RecipeSection } from './RecipeSection';
import { PageLink, PageTitle } from '@metronic/layout/core';

// import Form from '../FinishGoodsTableLayout';

interface VariantSectionFinishGoodsForEditProps {
    control: any;
    errors?: any;
}

export const VariantSectionFinishGoodsForEdit = ({ control, errors }: VariantSectionFinishGoodsForEditProps) => {

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

    return (
        <>
            <PageTitle breadcrumbs={breadcrumbs}>Ubah Finish Goods</PageTitle>

            <div className="p-5 w-100 mb-4">
                {/* Main Form Card */}
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

                <RecipeSection />

            </div>
        </>
    );
};

export default VariantSectionFinishGoodsForEdit;
