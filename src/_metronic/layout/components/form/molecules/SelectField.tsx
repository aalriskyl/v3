/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import clsx from 'clsx';

interface Option {
    value: string | number;
    label: string;
}

interface SelectFieldProps {
    name: string;
    label: string;
    control?: any;
    errors?: any;
    placeholder: string;
    options?: Option[];
    fetchOptions?: () => Promise<any>;
    className?: string;
    disabled?: any;
    isRequired?: boolean;
    onChange?: (value: string) => void;
    value?: string;
}

const SelectField: FC<SelectFieldProps> = ({
    name,
    label,
    control,
    errors,
    placeholder,
    options = [],
    fetchOptions,
    className,
    disabled = false,
    isRequired = true,
    onChange,
}) => {
    const [dynamicOptions, setDynamicOptions] = useState<Option[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (fetchOptions) {
            setLoading(true);
            fetchOptions()
                .then((data) => {
                    const fetchedOptions = Array.isArray(data)
                        ? data.map((item: any) => ({ value: item.id, label: item.name }))
                        : [];
                    setDynamicOptions(fetchedOptions);
                })
                .catch(() => setDynamicOptions([]))
                .finally(() => setLoading(false));
        }
    }, [fetchOptions]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    const combinedOptions = [...options, ...dynamicOptions];
    const filteredOptions = searchQuery
        ? combinedOptions.filter((option) => option.label.toLowerCase().includes(searchQuery.toLowerCase()))
        : combinedOptions;

    return (
        <div className={clsx('mb-4', className)} ref={dropdownRef}>
            <label htmlFor={name} className="form-label">
                {label}
                {isRequired && <span className="m-1 text-danger">*</span>}
            </label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <div className="position-relative">
                        <input
                            type="text"
                            placeholder={placeholder}
                            className="form-select py-4"
                            value={
                                searchQuery ||
                                (combinedOptions.find((opt) => String(opt.value) === String(field.value))?.label ?? '')
                            }                            
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                if (e.target.value === '') {
                                    field.onChange('');
                                    if (onChange) onChange('');
                                }
                            }}
                            onClick={() => setIsDropdownOpen(true)}
                            disabled={disabled || loading}
                        />
                        {isDropdownOpen && (
                            <div
                                className="position-absolute w-100 bg-white border rounded mt-1"
                                style={{ maxHeight: '200px', overflowY: 'auto', zIndex: 1000 }}
                            >
                                {filteredOptions.map((option) => (
                                    <div
                                        key={option.value}
                                        className="p-2 cursor-pointer hover-bg-light"
                                        onClick={() => {
                                            field.onChange(String(option.value)); // Pastikan string untuk menghindari error
                                            setSearchQuery('');
                                            setIsDropdownOpen(false);
                                            if (onChange) onChange(String(option.value));
                                        }}
                                        
                                    >
                                        {option.label}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            />
            {errors && errors[name] && (
                <div className="text-danger d-flex align-items-center mt-1">
                    <i className="bi bi-exclamation-circle me-2"></i>
                    {errors[name]?.message}
                </div>
            )}
        </div>
    );
};

export default SelectField;