import { FC, ChangeEvent } from 'react';
import { Controller, Control, FieldError } from 'react-hook-form';
import clsx from 'clsx';

interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

interface SelectFieldProps {
    name: string;
    label: string;
    control: Control<any>;
    options: SelectOption[];
    errors?: { [key: string]: FieldError | any };
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
    disabled?: boolean;
}

const SelectField: FC<SelectFieldProps> = ({
    name,
    label,
    control,
    options,
    errors = {},
    onChange,
    disabled = false
}) => {
    // Fixed error path resolution
    const error = name.split('.').reduce((acc: any, part) => {
        return acc?.[part];
    }, errors) as FieldError | undefined;

    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">
                {label}
                <span className="m-1 text-danger">*</span>
            </label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <select
                        {...field}
                        id={name}
                        disabled={disabled}
                        onChange={(e) => {
                            field.onChange(e);
                            onChange?.(e);
                        }}
                        className={clsx('form-select py-4', { 'is-invalid': error })}
                    >
                        <option value="" disabled>
                            Pilih {label.toLowerCase()}
                        </option>
                        {options.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                                disabled={option.disabled}
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>
                )}
            />
            {/* Safe error message access */}
            {error?.message && (
                <div className="text-danger d-flex align-items-center">
                    <i className="bi bi-exclamation-circle me-2"></i>
                    {error.message}
                </div>
            )}
        </div>
    );
};

export default SelectField;