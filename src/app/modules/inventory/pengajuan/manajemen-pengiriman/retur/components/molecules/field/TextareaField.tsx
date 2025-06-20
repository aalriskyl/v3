import { FC } from 'react';
import { Controller } from 'react-hook-form';
import clsx from 'clsx';

interface TextareaFieldProps {
    name: string;
    label: string;
    control: any;
    placeholder: string;
    errors: any;
    rows?: number;
}

const TextareaField: FC<TextareaFieldProps> = ({ name, label, control, placeholder, errors, rows = 4 }) => (
    <div className="mb-4">
        <label htmlFor={name} className="form-label">
            {label}
        </label>
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <textarea
                    {...field}
                    className={clsx('form-control', { 'is-invalid': errors && errors[name] })}
                    placeholder={placeholder}
                    rows={rows}
                ></textarea>
            )}
        />
        {errors && errors[name] && (
            <div className="text-danger d-flex align-items-center">
                <i className="bi bi-exclamation-circle me-2"></i>
                {errors[name]?.message}
            </div>
        )}
    </div>
);

export default TextareaField;