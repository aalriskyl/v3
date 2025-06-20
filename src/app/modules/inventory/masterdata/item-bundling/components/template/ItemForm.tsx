import { FC, useState, useEffect } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import InputField from '@metronic/layout/components/form/molecules/InputField';
import TextareaField from '@metronic/layout/components/form/molecules/TextareaField';
import ConfirmModal from '@metronic/layout/components/form/organism/ConfirmModal';
import SuccessModal from '@metronic/layout/components/form/organism/SuccessModal';
import SelectField from '../molecules/field/SelectField';
import { getFinishGoods, getVariantFinishGoodsById } from '../../../finishgoods/core/_request';
import { createItemBundling } from '../core/_request';

interface FinishGood {
    id: string;
    name: string;
}

interface Variant {
    id: string;
    name: string;
    price_sell: number;
}

interface FormData {
    name: string;
    description: string;
    items: Array<{
        finishGoodsId: string;
        variantId: string;
        price: number;
    }>;
    discountType: string;
    discount: string;
}

const schema = Yup.object().shape({
    name: Yup.string().required('Nama tidak boleh kosong'),
    description: Yup.string().required('Deskripsi tidak boleh kosong'),
    items: Yup.array()
        .of(
            Yup.object().shape({
                finishGoodsId: Yup.string().required('Finish Good harus dipilih'),
                variantId: Yup.string().required('Varian harus dipilih'),
                price: Yup.number()
                    .typeError('Harga harus berupa angka')
                    .min(0, 'Harga tidak boleh negatif')
                    .required(),
            })
        )
        .min(1, 'Minimal harus ada 1 barang')
        .required('Items are required'),
    discountType: Yup.string().required('Jenis discount harus dipilih'),
    discount: Yup.string()
        .required('Discount tidak boleh kosong')
        .test('is-valid-discount', 'Discount tidak valid', function (value) {
            const discountType = this.parent.discountType;
            if (!value) return false;

            if (discountType === 'percent') {
                const percentRegex = /^(\d+)(%)?$/;
                const match = value.match(percentRegex);
                if (!match) return false;
                const number = parseInt(match[1], 10);
                return number >= 0 && number <= 100;
            } else if (discountType === 'nominal') {
                const nominalValue = value.replace(/,/g, '');
                const number = parseFloat(nominalValue);
                return !isNaN(number) && number >= 0;
            }
            return false;
        }),
});

interface FormProps {
    formTitle: string;
    successMessage?: string;
    headTitle: string;
    buttonTitle: string;
    message: string;
    submitButtonLabel?: string;
    cancelButtonLabel?: string;
}

const ItemForm: FC<FormProps> = ({
    formTitle,
    successMessage = 'Data berhasil disimpan!',
    headTitle,
    buttonTitle,
    message,
    submitButtonLabel,
    cancelButtonLabel = 'Batal',
}) => {
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [submissionData, setSubmissionData] = useState<FormData | null>(null);
    const [finishGoodsOptions, setFinishGoodsOptions] = useState<{ value: string; label: string }[]>([]);
    const [variantCache, setVariantCache] = useState<Record<string, Variant[]>>({});
    const [loadingVariants, setLoadingVariants] = useState<Record<string, boolean>>({});
    const [variantErrors, setVariantErrors] = useState<Record<string, string>>({});

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
        setValue,
        watch,
    } = useForm<FormData>({
        resolver: yupResolver(schema),
        mode: 'onTouched',
        defaultValues: {
            name: '',
            description: '',
            items: [{ finishGoodsId: '', variantId: '', price: 0 }],
            discountType: '',
            discount: '',
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'items',
    });

    const discountType = watch('discountType');

    useEffect(() => {
        const fetchFinishGoods = async () => {
            try {
                const data = await getFinishGoods();
                const options = data.map((item: FinishGood) => ({
                    value: item.id,
                    label: item.name,
                }));
                setFinishGoodsOptions([{ value: '', label: 'Pilih Finish Good' }, ...options]);
            } catch (error) {
                console.error('Error fetching finish goods:', error);
            }
        };

        fetchFinishGoods();
    }, []);

    const handleFinishGoodChange = async (index: number, finishGoodsId: string) => {
        // Use tuple type for path to ensure type safety
        setValue(`items.${index}.variantId` as `items.${number}.variantId`, '');
        setValue(`items.${index}.price` as `items.${number}.price`, 0);

        if (!finishGoodsId) return;

        try {
            setLoadingVariants(prev => ({ ...prev, [finishGoodsId]: true }));
            setVariantErrors(prev => ({ ...prev, [finishGoodsId]: '' }));

            if (!variantCache[finishGoodsId]) {
                const response = await getVariantFinishGoodsById(finishGoodsId);
                const variantsData = response.data.data.variant_finish_goods;

                if (!Array.isArray(variantsData)) {
                    throw new Error('Invalid variants data format');
                }

                setVariantCache(prev => ({
                    ...prev,
                    [finishGoodsId]: variantsData.map((v: Variant) => ({
                        id: v.id,
                        name: v.name,
                        price_sell: v.price_sell
                    }))
                }));
            }
        } catch (error) {
            setVariantErrors(prev => ({
                ...prev,
                [finishGoodsId]: 'Gagal memuat varian'
            }));
        } finally {
            setLoadingVariants(prev => ({ ...prev, [finishGoodsId]: false }));
        }
    };

    const handleVariantSelect = (index: number, variantId: string) => {
        const finishGoodsId = watch(`items.${index}.finishGoodsId`);
        const variant = variantCache[finishGoodsId]?.find(v => v.id === variantId);
        if (variant) {
            setValue(`items.${index}.price` as const, variant.price_sell);
        }
    };

    const onSubmit = (data: FormData) => {
        setSubmissionData(data);
        setIsModalVisible(true);
    };

    const handleConfirm = async () => {
        if (!submissionData) return;

        try {
            let parsedDiscount = 0;
            if (submissionData.discountType === 'percent') {
                const numericValue = submissionData.discount.replace(/[^0-9]/g, '');
                parsedDiscount = numericValue ? parseInt(numericValue, 10) : 0;
            } else {
                const numericValue = submissionData.discount.replace(/,/g, '');
                parsedDiscount = parseFloat(numericValue) || 0;
            }

            const payload = {
                name: submissionData.name,
                disc_percent: submissionData.discountType === 'percent' ? parsedDiscount : undefined,
                disc_nominal: submissionData.discountType === 'nominal' ? parsedDiscount : undefined,
                variant_finish_goods_ids: submissionData.items.map(item => item.variantId)
            };

            await createItemBundling(payload);
            setIsModalVisible(false);
            setIsSuccessModalVisible(true);
            reset();
        } catch (error) {
            console.error('Submission failed:', error);
            setIsModalVisible(false);
        }
    };

    return (
        <div className="font-secondary fw-normal">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-100 mb-4">
                    {/* Deskripsi Section */}
                    <div className="card p-6 mb-8">
                        <h2 style={{ fontSize: '18px' }}>Deskripsi</h2>
                        <div className="row g-2 mt-2">
                            <div className="col-md-6">
                                <InputField
                                    name="name"
                                    label="Nama"
                                    control={control}
                                    placeholder="Masukkan nama"
                                    errors={errors}
                                />
                            </div>
                            <div className="col-md-6">
                                <TextareaField
                                    name="description"
                                    label="Deskripsi"
                                    control={control}
                                    placeholder="Masukkan deskripsi"
                                    errors={errors}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Items Section */}
                    <div className="card p-6">
                        <h2 style={{ fontSize: '18px' }}>Barang</h2>
                        {fields.map((item, index) => (
                            <div key={item.id} className="mb-4">
                                <div className="d-flex align-items-start mt-6">
                                    <div className="fs-6 mt-12 text-center" style={{ minWidth: '40px' }}>
                                        {index + 1}
                                    </div>
                                    <div className="me-3 flex-grow-1">
                                        <Controller
                                            name={`items.${index}.finishGoodsId`}
                                            control={control}
                                            render={({ field }) => (
                                                <SelectField
                                                    control={control}
                                                    {...field}
                                                    label="Finish Goods"
                                                    options={finishGoodsOptions}
                                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                                        field.onChange(e.target.value);
                                                        handleFinishGoodChange(index, e.target.value);
                                                    }}
                                                    errors={errors}
                                                />
                                            )}
                                        />
                                    </div>
                                    <div className="me-3 flex-grow-1">
                                        <Controller
                                            name={`items.${index}.variantId`}
                                            control={control}
                                            render={({ field }) => {
                                                const finishGoodsId = watch(`items.${index}.finishGoodsId`);
                                                const variants = finishGoodsId ? variantCache[finishGoodsId] || [] : [];
                                                return (
                                                    <SelectField
                                                        {...field}
                                                        label="Varian"
                                                        control={control}
                                                        options={[
                                                            { value: '', label: 'Pilih Varian' },
                                                            ...variants.map(variant => ({
                                                                value: variant.id,
                                                                label: variant.name,
                                                            }))
                                                        ]}
                                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                                            field.onChange(e.target.value);
                                                            handleVariantSelect(index, e.target.value);
                                                        }}
                                                        errors={errors}
                                                        disabled={!finishGoodsId || loadingVariants[finishGoodsId]}
                                                    />
                                                );
                                            }}
                                        />
                                        {variantErrors[watch(`items.${index}.finishGoodsId`)] && (
                                            <div className="text-danger mt-1">
                                                {variantErrors[watch(`items.${index}.finishGoodsId`)]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="me-3 flex-grow-1">
                                        <InputField
                                            name={`items.${index}.price`}
                                            label="Harga Barang"
                                            control={control}
                                            placeholder="0"
                                            errors={errors}
                                            disabled
                                        />
                                    </div>
                                    <div className="d-flex flex-column align-items-center">
                                        <span
                                            onClick={() => fields.length > 1 && remove(index)}
                                            style={{
                                                cursor: fields.length > 1 ? 'pointer' : 'not-allowed',
                                                color: fields.length > 1 ? 'inherit' : 'gray',
                                            }}
                                        >
                                            <i
                                                className={`fa-solid fa-trash d-flex align-items-center fs-2 ${fields.length > 1 ? 'text-muted' : 'text-gray-400'
                                                    } mt-12`}
                                            ></i>
                                        </span>
                                    </div>
                                </div>
                                {index < fields.length - 1 && (
                                    <div className="separator border-gray-400 mt-6 w-90"></div>
                                )}
                            </div>
                        ))}

                        <div className="separator border-gray-400 mt-2 mb-5 w-90"></div>
                        <button
                            type="button"
                            onClick={() => append({ finishGoodsId: '', variantId: '', price: 0 })}
                            className="btn border border-primary px-12 py-4 text-primary mx-auto mt-3"
                        >
                            Tambah
                        </button>
                    </div>

                    {/* Discount Section */}
                    <div className="card p-6 mb-8">
                        <h2 className="mb-6" style={{ fontSize: '18px' }}>Discount</h2>
                        <div className="row g-2">
                            <div className="col-md-6">
                                <Controller
                                    name="discountType"
                                    control={control}
                                    render={({ field }) => (
                                        <SelectField
                                            {...field}
                                            control={control}
                                            label="Jenis Discount"
                                            options={[
                                                { value: '', label: 'Pilih Jenis Discount' },
                                                { value: 'percent', label: 'Persentase' },
                                                { value: 'nominal', label: 'Nominal' },
                                            ]}
                                            errors={errors}
                                        />
                                    )}
                                />
                            </div>
                            <div className="col-md-6">
                                <InputField
                                    name="discount"
                                    label="Nilai Discount"
                                    control={control}
                                    placeholder={
                                        discountType === 'percent'
                                            ? 'Masukkan persentase (contoh: 10%)'
                                            : 'Masukkan nominal (contoh: 5000)'
                                    }
                                    errors={errors}
                                    type="text"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="d-flex justify-content-end gap-2 mb-4">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="btn px-12 py-3 border border-gray-400"
                    >
                        {cancelButtonLabel}
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

            {/* Modals */}
            {isModalVisible && (
                <ConfirmModal
                    handleSubmit={handleConfirm}
                    closeModal={() => setIsModalVisible(false)}
                    headTitle={headTitle}
                    confirmButtonLabel={buttonTitle}
                    cancelButtonLabel="Kembali"
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

export default ItemForm;