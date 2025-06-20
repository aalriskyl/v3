/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';
import { Controller } from 'react-hook-form';
import clsx from 'clsx';

interface InputFieldProps {
    name: string;
    label: string;
    control?: any;
    placeholder: string;
    type?: string;
    errors?: any;
    step?: any;
    disabled?: boolean;
    inputMode?: "text" | "numeric" | "decimal" | "email" | "tel" | "url" | "search";
    value?: string | number;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    min?: any;
    isRequired?: boolean;
    withPercentage?: boolean; // New prop to add % inside the field
    onKeyPress?: any;
    className?: any
}

const InputField: FC<any> = ({
    name,
    label,
    control,
    placeholder,
    type = 'text',
    errors,
    disabled,
    isRequired = true,
    withPercentage = false, // Default to false
    className
}) => (
    <div className="mb-4">
        <label htmlFor={name} className="form-label" style={{ fontSize: '14px' }}>
            {label}
            {isRequired && <span className="m-1 text-danger">*</span>}
        </label>
        <div className="position-relative">
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <input
                        {...field}
                        type={type}
                        className={clsx('form-control py-4', { 'pe-5': withPercentage })}
                        placeholder={placeholder}
                        disabled={disabled}
                        style={{ paddingRight: withPercentage ? '40px' : '12px' }} // Adjust padding for the % symbol
                    />
                )}
            />
            {withPercentage && (
                <span
                    className="position-absolute end-0 top-50 translate-middle-y px-5 bg-light rounded-end fw-bold"
                    style={{
                        backgroundColor: '#e9ecef', // Gray background
                        border: '1px solid #ced4da', // Divider line
                        pointerEvents: 'none', // Prevent interaction
                        paddingTop:'14.5px',
                        paddingBottom:'13px'
                    }}
                >
                    %
                </span>
            )}
        </div>
        {errors && errors[name] && (
            <div className="text-danger d-flex align-items-center">
                <i className="bi bi-exclamation-circle me-2"></i>
                {errors[name]?.message}
            </div>
        )}
    </div>
);

export default InputField;