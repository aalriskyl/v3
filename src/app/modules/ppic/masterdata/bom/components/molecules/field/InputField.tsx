import { FC } from 'react';
import { Controller } from 'react-hook-form';
import clsx from 'clsx';

interface InputFieldProps {
    name: string;
    label: string;
    control: any;
    placeholder: string;
    type?: string;
    errors: any;
}

const InputField: FC<InputFieldProps> = ({ name, label, control, placeholder, type = 'text', errors }) => (
    <div className="mb-4 col-md-12">
        <label htmlFor={name} className="form-label">
            {label}
            <span className="m-1 text-danger">*</span>
        </label>
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <input
                    {...field}
                    type={type}
                    className={clsx('form-control', { 'is-invalid': errors[name] })}
                    placeholder={placeholder}
                />
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

export default InputField;
