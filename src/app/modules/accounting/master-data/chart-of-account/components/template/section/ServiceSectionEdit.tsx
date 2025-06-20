/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import InputField from '@metronic/layout/components/form/molecules/InputField';
import TextareaField from '@metronic/layout/components/form/molecules/TextareaField';
import SelectField from '@metronic/layout/components/form/molecules/SelectField';
// import SupplierTableLayout from '../SupplierTableLayout';
import { dummyDataService } from '../../organism/table/dummyData';
// import { getBrandByActive } from '../../../../brand/core/_request';


interface ServiceSectionEditProps {
    control: any;
    errors: any;
}

export const ServiceSectionEdit: React.FC<ServiceSectionEditProps> = ({ control, errors }: any) => {
    const { id } = useParams<{ id: string }>();
    const service: any = dummyDataService.find((item) => item.id === parseInt(id || '0'));

    const { reset, control: formControl } = useForm();

    useEffect(() => {
        if (service) {
            reset({
                name: service.name,
                category: service.category_name,
                brand: service.brand,
                description: service.description,
            });
        }
    }, [service, reset]);

    const categories = [
        { value: '1', label: 'Category 1' },
        { value: '2', label: 'Category 2' },
        { value: '3', label: 'Category 3' },
    ];

    const brands = [
        { value: '1', label: 'Brand X' },
        { value: '2', label: 'Brand Y' },
        { value: '3', label: 'Brand Z' },
    ];

    return (
        <>
            <div className="font-secondary">
                <div className="card p-5 w-100 mb-4">
                    <h2 className='mb-6'>Layanan</h2>
                    <div className="row g-4">
                        <div className="col-md-6">
                            <InputField
                                name="name"
                                label="Nama"
                                control={formControl}
                                placeholder="Masukkan nama layanan"
                                errors={errors}
                                type="text"
                            />
                        </div>

                        <div className="col-md-6">
                            <SelectField
                                name="category"
                                placeholder="Pilih kategori layanan"
                                label="Kategori Layanan"
                                control={formControl}
                                options={categories}
                                errors={errors}
                            />
                        </div>
                        <div className="col-md-6">
                            <SelectField
                                name="brand"
                                placeholder="Pilih brand"
                                label="Brand"
                                control={formControl}
                                options={brands}
                                errors={errors}
                            />
                        </div>
                        <div className="col-md-6">
                            <TextareaField
                                name="description"
                                label="Deskripsi"
                                control={formControl}
                                placeholder="Masukkan deskripsi"
                                errors={errors}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* <SupplierTableLayout /> */}
        </>
    );
};

export default ServiceSectionEdit;