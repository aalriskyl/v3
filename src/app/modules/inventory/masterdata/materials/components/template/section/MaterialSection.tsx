// import React, { useEffect, useState } from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import InputField from '@metronic/layout/components/form/molecules/InputField';
// import TextareaField from '@metronic/layout/components/form/molecules/TextareaField';
// import SelectField from '@metronic/layout/components/form/molecules/SelectField';
// import ImageField from '@metronic/layout/components/form/molecules/ImageField';
// import ConfirmModal from '@metronic/layout/components/form/organism/ConfirmModal';
// import { FailedModal } from '@metronic/layout/components/form/organism/FailedModal';
// import SuccessModal from '@metronic/layout/components/form/organism/SuccessModal';
// import { getMaterialsCategory, getActiveBrands, createMaterials } from '../../core/_request';

// interface Option {
//     value: string;
//     label: string;
// }

// const MaterialSection: React.FC = () => {
//     const { handleSubmit, control, setValue, watch, formState: { errors } } = useForm();
//     const navigate = useNavigate();

//     const [categories, setCategories] = useState<Option[]>([]);
//     const [brands, setBrands] = useState<Option[]>([]);
//     const [loadingCategories, setLoadingCategories] = useState(true);
//     const [loadingBrands, setLoadingBrands] = useState(true);
//     const [isFailedModalVisible, setIsFailedModalVisible] = useState(false);
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await getMaterialsCategory();
//                 setCategories(response.map((category: any) => ({
//                     value: category.id,
//                     label: category.name,
//                 })));
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//                 setCategories([]);
//             } finally {
//                 setLoadingCategories(false);
//             }
//         };

//         const fetchBrands = async () => {
//             try {
//                 const response = await getActiveBrands();
//                 setBrands(response.map((brand: any) => ({
//                     value: brand.id,
//                     label: brand.name,
//                 })));
//             } catch (error) {
//                 console.error('Error fetching brands:', error);
//                 setBrands([]);
//             } finally {
//                 setLoadingBrands(false);
//             }
//         };

//         fetchCategories();
//         fetchBrands();
//     }, []);

//     const handleCloseFailedModal = () => setIsFailedModalVisible(false);
//     const handleCloseSuccessModal = () => setIsSuccessModalVisible(false);

//     const onSubmit = async (data: any) => {
//         try {
//             const formData = {
//                 name: data.name,
//                 category_ID: data.category_id,
//                 brand_ID: data.brand_id,
//                 picture: data.picture instanceof File ? data.picture : undefined,
//             };

//             await createMaterials(formData);
//             setIsSuccessModalVisible(true);
//         } catch (error) {
//             console.error('Gagal membuat material:', error);
//             setIsFailedModalVisible(true);
//         }
//     };

//     return (
//         <>
//             <div className="font-secondary">
//                 <div className="card p-5 w-100 mb-4">
//                     <h2 className="mb-6">Material</h2>
//                     <div className="row g-4">
//                         <div className="col-md-6">
//                             <Controller
//                                 name="picture"
//                                 control={control}
//                                 render={({ field }) => (
//                                     <ImageField
//                                         name="picture"
//                                         label="Foto Brand"
//                                         onChange={(file) => setValue("picture", file)}
//                                         // errors={errors.picture?.message}
//                                         defaultValue={watch("picture") instanceof File ? undefined : watch("picture")}
//                                     />
//                                 )}
//                             />
//                         </div>
//                         <div className="col-md-6">
//                             <div className="mb-3">
//                                 <InputField
//                                     name="name"
//                                     label="Nama Material"
//                                     control={control}
//                                     placeholder="Masukkan nama varian"
//                                     errors={errors}
//                                     type="text"
//                                 />
//                             </div>
//                             <div className="mb-3">
//                                 <SelectField
//                                     name="category_id"
//                                     placeholder={loadingCategories ? 'Loading categories...' : 'Pilih kategori material'}
//                                     label="Kategori Material"
//                                     control={control}
//                                     options={categories}
//                                     errors={errors}
//                                 />
//                             </div>
//                             <div className="mb-3">
//                                 <SelectField
//                                     name="brand_id"
//                                     placeholder={loadingBrands ? 'Loading brands...' : 'Pilih brand'}
//                                     label="Brand"
//                                     control={control}
//                                     options={brands}
//                                     errors={errors}
//                                 />
//                             </div>
//                             <div className="mb-3">
//                                 <label className="form-label">Set Default</label>
//                                 <div>
//                                     <Controller
//                                         name="default_penjualan"
//                                         control={control}
//                                         render={({ field }) => (
//                                             <div className="form-check form-check-inline">
//                                                 <input
//                                                     className="form-check-input"
//                                                     type="checkbox"
//                                                     {...field}
//                                                     id="penjualan"
//                                                 />
//                                                 <label className="form-label" htmlFor="penjualan">
//                                                     Penjualan
//                                                 </label>
//                                             </div>
//                                         )}
//                                     />
//                                     <Controller
//                                         name="default_pembelian"
//                                         control={control}
//                                         render={({ field }) => (
//                                             <div className="form-check form-check-inline">
//                                                 <input
//                                                     className="form-check-input"
//                                                     type="checkbox"
//                                                     {...field}
//                                                     id="pembelian"
//                                                 />
//                                                 <label className="form-label" htmlFor="pembelian">
//                                                     Pembelian
//                                                 </label>
//                                             </div>
//                                         )}
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-md-6">
//                         <TextareaField
//                             name="description"
//                             label="Deskripsi"
//                             control={control}
//                             placeholder="Masukkan deskripsi"
//                             errors={errors}
//                         />
//                     </div>
//                 </div>
//             </div>
//             <div className="d-flex justify-content-end mb-8 mt-4">
//                 <button onClick={() => navigate('../')} type="button" className="btn border border-gray-500 px-12 py-2 me-4">
//                     Batalkan
//                 </button>
//                 <button onClick={() => setIsModalVisible(true)} type="button" className="btn btn-primary px-12 py-4">
//                     Simpan
//                 </button>
//             </div>

//             {isFailedModalVisible && (
//                 <FailedModal
//                     closeModal={handleCloseFailedModal}
//                     message="Material gagal ditambahkan"
//                     confirmLabel="Coba Lagi"
//                 />
//             )}

//             {isModalVisible && (
//                 <ConfirmModal
//                     handleSubmit={handleSubmit(onSubmit)}
//                     closeModal={() => setIsModalVisible(false)}
//                     headTitle="Konfirmasi"
//                     confirmButtonLabel="Ya, Simpan"
//                     cancelButtonLabel="Batal"
//                     message="Apakah Anda yakin ingin menyimpan material ini?"
//                 />
//             )}

//             {isSuccessModalVisible && (
//                 <SuccessModal
//                     closeModal={handleCloseSuccessModal}
//                     message="Material berhasil ditambahkan!"
//                 />
//             )}
//         </>
//     );
// };

// export { MaterialSection };
