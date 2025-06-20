import { FC } from 'react';
import { Controller } from 'react-hook-form';
import clsx from 'clsx';

interface SelectFieldProps {
    name: string;
    label: string;
    control: any;
    options: { value: string; label: string }[];
    errors: any;
}

const SelectField: FC<SelectFieldProps> = ({ name, label, control, options, errors }) => (
    <div className="mb-4">
        <label htmlFor={name} className="form-label">
            {label}
            <span className="m-1 text-danger">*</span>
        </label>
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <select {...field} className={clsx('form-select', { 'is-invalid': errors[name] })}>
                    <option value="" disabled>
                        Pilih {label.toLowerCase()}
                    </option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            )}
        />
        {errors[name] && (
            <div className="text-danger d-flex align-items-center">
                <i className="bi bi-exclamation-circle me-2"></i>
                {errors[name]?.message}
            </div>
        )}
    </div>
);

export default SelectField;
