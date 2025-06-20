// import React, { useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { useParams } from 'react-router-dom';
// import InputField from '@metronic/layout/components/form/molecules/InputField';
// import TextareaField from '@metronic/layout/components/form/molecules/TextareaField';
// import SelectField from '@metronic/layout/components/form/molecules/SelectField';
// import UomTableLayout from '../UomTableLayout';
// // import { dummyDataMaterial } from '../../organism/table/dummyData';

// interface MaterialSectionEditProps {
//     control: any;
//     errors: any;
// }

// export const MaterialSectionEdit: React.FC<MaterialSectionEditProps> = ({ control, errors }) => {
//     const { id } = useParams<{ id: string }>();
//     // const material = dummyDataMaterial.find((item) => item.id === parseInt(id || '0'));

//     const { reset, control: formControl } = useForm();

//     useEffect(() => {
//         if (material) {
//             reset({
//                 name: material.name,
//                 category_id: material.category_name,
//                 brand_id: material.brand_name,
//                 description: material.description,
//                 set_default: material.set_default,
//             });
//         }
//     }, [material, reset]);

//     const categories = [
//         { value: '1', label: 'Category 1' },
//         { value: '2', label: 'Category 2' },
//         { value: '3', label: 'Category 3' },
//     ];

//     const brands = [
//         { value: '1', label: 'Brand X' },
//         { value: '2', label: 'Brand Y' },
//         { value: '3', label: 'Brand Z' },
//     ];

//     return (
//         <>
//             <div className="font-secondary">
//                 <div className="card p-5 w-100 mb-4">
//                     <h2 className='mb-6'>Material</h2>
//                     <div className="row g-4">
//                         <div className="col-md-6">
//                             <label className="form-label">Foto Material</label>
//                             <label htmlFor="upload-image" className="relative bg-white border border-dashed border-gray-300 rounded-lg p-4 flex justify-center items-center h-48 cursor-pointer">
//                                 <div className='mx-12'>
//                                     <center>
//                                         <img
//                                             src={material?.photo}
//                                             alt="Material"
//                                             className="img-thumbnail"
//                                             style={{ width: '150px', height: '150px' }}
//                                         />
//                                     </center>
//                                     <div className="text-center">
//                                         <p className="text-sm text-gray-500">
//                                             Unggah file dengan format jpg, jpeg, png, gif, bmp, tiff. Maksimal file 15MB.
//                                         </p>
//                                     </div>
//                                 </div>
//                             </label>
//                             <input
//                                 type="file"
//                                 id="upload-image"
//                                 className="absolute opacity-0 w-full h-full top-0 left-0 cursor-pointer"
//                                 accept="image/*"
//                             />
//                         </div>

//                         <div className="col-md-6">
//                             <div className="mb-3">
//                                 <InputField
//                                     name="name"
//                                     label="Nama Material"
//                                     control={formControl}
//                                     placeholder="Masukkan nama material"
//                                     errors={errors}
//                                     type="text"
//                                 />
//                             </div>
//                             <div className="mb-3">
//                                 <SelectField
//                                     name="category_id"
//                                     placeholder="Pilih kategori material"
//                                     label="Kategori Material"
//                                     control={formControl}
//                                     options={categories}
//                                     errors={errors}
//                                 />
//                             </div>
//                             <div className="mb-3">
//                                 <SelectField
//                                     name="brand_id"
//                                     placeholder="Pilih brand"
//                                     label="Brand"
//                                     control={formControl}
//                                     options={brands}
//                                     errors={errors}
//                                 />
//                             </div>
//                             <div className="mb-3">
//                                 <label className="form-label">Set Default</label>
//                                 <div>
//                                     <div className="form-check form-check-inline">
//                                         <input
//                                             className="form-check-input"
//                                             type="checkbox"
//                                             id="penjualan"
//                                             value="penjualan"
//                                             defaultChecked={material?.set_default === 'Penjualan'}
//                                         />
//                                         <label className="form-label" htmlFor="penjualan">
//                                             Penjualan
//                                         </label>
//                                     </div>
//                                     <div className="form-check form-check-inline">
//                                         <input
//                                             className="form-check-input"
//                                             type="checkbox"
//                                             id="pembelian"
//                                             value="pembelian"
//                                             defaultChecked={material?.set_default === 'Pembelian'}
//                                         />
//                                         <label className="form-label" htmlFor="pembelian">
//                                             Pembelian
//                                         </label>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-md-6">
//                         <TextareaField
//                             name="description"
//                             label="Deskripsi"
//                             control={formControl}
//                             placeholder="Masukkan deskripsi"
//                             errors={errors}
//                         />
//                     </div>
//                 </div>
//             </div>
//             <UomTableLayout />
//         </>
//     );
// };

// export default MaterialSectionEdit;
