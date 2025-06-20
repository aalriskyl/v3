import React, { useState } from "react";
import { Controller } from "react-hook-form";
import InputField from "@metronic/layout/components/form/molecules/InputField";
import TextareaField from "@metronic/layout/components/form/molecules/TextareaField";
import SelectField from "@metronic/layout/components/form/molecules/SelectField";

interface ServiceSectionProps {
  control: any;
  errors: any;
}

export const ServiceSection: React.FC<ServiceSectionProps> = ({
  control,
  errors,
}) => {
  const [dueDateBasedOn, setDueDateBasedOn] = useState<string>("");

  // Options for "Due Date Based On"
  const dueDateOptions = [
    {
      id: "1",
      value: "days_after_invoice_date",
      label: "Day(s) after invoice date",
    },
    {
      id: "2",
      value: "days_after_end_of_invoice_month",
      label: "Day(s) after the end of the invoice month",
    },
    {
      id: "3",
      value: "months_after_end_of_invoice_month",
      label: "Month(s) after the end of the invoice month",
    },
  ];

  return (
    <div className="font-secondary">
      <div className="card p-5 w-100 mb-4">
        <h2 className="mb-6">Terms of Payment</h2>
        <div className="row g-4">
          <div className="col-md-12">
            <InputField
              name="name"
              label="Nama Terms of Payment"
              control={control}
              placeholder="Masukkan nama terms of payment"
              errors={errors}
              type="text"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;
