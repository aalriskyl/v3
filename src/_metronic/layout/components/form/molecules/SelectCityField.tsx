import { FC, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import clsx from "clsx";
import axiosInstance from "../../../../../service/axiosInstance";

interface Option {
    value: string;
    label: string;
}

interface SelectFieldCityProps {
    name: string;
    label: string;
    control: any;
    errors: any;
    value: string;
    placeholder: string;
    options?: Option[]; // Static options
    fetchOptions?: () => Promise<Option[]>; // Dynamic options fetcher
    className?: string; // Optional custom class
    disabled?: boolean; // Disable the select field
}

const SelectCityField: FC<SelectFieldCityProps> = ({
    name,
    label,
    control,
    errors,
    placeholder,
    options = [],
    fetchOptions,
    className,
    disabled = false,
}) => {
    const [cities, setCities] = useState<Option[]>([]);
    const [dynamicOptions, setDynamicOptions] = useState<Option[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCities = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get("/core/city/select");
                setCities(response.data.data); // Assuming the response has the cities array
            } catch (error) {
                console.error("Failed to fetch cities:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCities();

        if (fetchOptions) {
            fetchOptions().then((fetchedOptions) => {
                setDynamicOptions(fetchedOptions);
            });
        }
    }, [fetchOptions]);

    const combinedOptions = [...options, ...dynamicOptions]; // Combine static and dynamic options

    return (
        <div className={clsx("mb-4", className)}>
            <label htmlFor={name} className="form-label">
                {label}
                <span className="m-1 text-danger">*</span>
            </label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <select
                        {...field} // This will automatically handle the `onChange` and `value` bindings
                        id={name}
                        className={clsx("form-select", { "is-invalid": errors[name] })}
                        disabled={disabled || loading}
                    >
                        <option value="" disabled>
                            {loading ? "Memuat..." : placeholder}
                        </option>
                        {combinedOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                )}
            />
            {errors[name] && (
                <div className="text-danger d-flex align-items-center mt-1">
                    <i className="bi bi-exclamation-circle me-2"></i>
                    {errors[name]?.message}
                </div>
            )}
        </div>
    );
};

export default SelectCityField;
