import { FC, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import SelectField from '../molecules/field/SelectField';
import { getVariantFinishGoodsById } from '../../../finishgoods/core/_request';

interface VariantSelectProps {
    control: any;
    index: number;
    finishGoodId: string;
    errors: any;
    onVariantChange: (variantId: string) => void;
    variants: Array<{ id: string; name: string }>;
    loading: boolean;
    error: any;
}

const VariantSelect: FC<VariantSelectProps> = ({
    control,
    index,
    finishGoodId,
    errors,
    onVariantChange,
    variants,
    loading,
    error
}) => {
    return (
        <Controller
            name={`items.${index}.variantId`}
            control={control}
            render={({ field }) => (
                <SelectField
                    {...field}
                    label="Varian"
                    control={error}
                    options={[
                        { value: '', label: loading ? 'Memuat...' : 'Pilih Varian' },
                        ...variants.map(variant => ({
                            value: variant.id,
                            label: variant.name,
                        }))
                    ]}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        field.onChange(e.target.value);
                        onVariantChange(e.target.value);
                    }}
                    errors={errors}
                    disabled={!finishGoodId || loading}
                />
            )}
        />
    );
};

export default VariantSelect;