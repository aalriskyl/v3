import { FC } from 'react';
import { Controller } from 'react-hook-form';
import clsx from 'clsx';

interface TextareaFieldProps {
    name: string;
    label: string;
    control: any;
    placeholder: string;
    errors: any;
}

const TextareaField: FC<TextareaFieldProps> = ({ name, label, control, placeholder, errors }) => (
    <div className="mb-4">
        <label htmlFor={name} className="form-label">
            {label}
            <span className="m-1 text-danger">*</span>
        </label>
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <textarea
                    {...field}
                    className={clsx('form-control', { 'is-invalid': errors[name] })}
                    placeholder={placeholder}
                    rows={4}
                ></textarea>
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

export default TextareaField;
