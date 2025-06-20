/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

interface Option {
    value: string;
    label: string;
}

interface SelectFieldProps {
    name: string;
    label: string;
    placeholder: string;
    options?: Option[];
    fetchOptions?: () => Promise<any>;
    dummyOptions?: Option[]; // New prop for dummy data
    className?: string;
    disabled?: boolean;
    isRequired?: boolean;
    onChange?: (value: string) => void;
    value?: string; // Optional controlled value
}

const SelectFieldDummy: FC<SelectFieldProps> = ({
    name,
    label,
    placeholder,
    options = [],
    fetchOptions,
    dummyOptions = [], // Default to an empty array
    className,
    disabled = false,
    isRequired = true,
    onChange,
    value = '', // Controlled value
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

    // Use dummyOptions if no fetchOptions are provided
    const combinedOptions = fetchOptions ? [...options, ...dynamicOptions] : [...options, ...dummyOptions];
    const filteredOptions = searchQuery
        ? combinedOptions.filter((option) => option.label.toLowerCase().includes(searchQuery.toLowerCase()))
        : combinedOptions;

    return (
        <div className={clsx('mb-4', className)} ref={dropdownRef}>
            <label htmlFor={name} className="form-label">
                {label}
                {/* {isRequired && <span className="m-1 text-danger">*</span>} */}
            </label>
            <div className="position-relative">
                <input
                    type="text"
                    placeholder={placeholder}
                    className="form-select py-4"
                    value={searchQuery || combinedOptions.find((opt) => opt.value === value)?.label || ''}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        if (e.target.value === '') {
                            if (onChange) onChange(''); // Clear the value
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
                                    if (onChange) onChange(option.value); // Trigger the onChange prop
                                    setSearchQuery(''); // Clear the search query
                                    setIsDropdownOpen(false); // Close the dropdown
                                }}
                            >
                                {option.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SelectFieldDummy;