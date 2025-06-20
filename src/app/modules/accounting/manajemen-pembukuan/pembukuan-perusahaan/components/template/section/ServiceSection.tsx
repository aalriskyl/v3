import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import InputField from "@metronic/layout/components/form/molecules/InputField";
import TextareaField from "@metronic/layout/components/form/molecules/TextareaField";
import SelectField from "@metronic/layout/components/form/molecules/SelectField";
import axiosInstance from "../../../../../../../../service/axiosInstance";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";
import { DetailView } from "../../../core/_models";

interface ServiceSectionProps {
  control: any;
  errors: any;
  children: (props: {
    handleUpdateAction: () => Promise<void>;
  }) => React.ReactNode;
}

type DataValueType = {
  float: number;
  coa_material_id: string;
  coa_service_id: string;
  coa_sell_tax_id: string;
  coa_buy_tax_id: string;
  coa_ceil_id: string;
  coa_debt_id: string;
  coa_receivable_id: string;
  coa_payment_method_id: string;
  coa_retur_purchase_id: string;
  coa_retur_sales_id: string;
  income_tax: number;
  coa_buy_income_tax_id?: string;
  coa_sell_income_tax_id?: string;
};

export const ServiceSection: React.FC<ServiceSectionProps> = ({
  control,
  errors,
  children,
}) => {
  const [coaChoice, setCoaChoice] = useState<CoaChoiceType[]>([]);
  const [dataValue, setDataValue] = useState<DataValueType>({
    float: 0,
    coa_material_id: "",
    coa_service_id: "",
    coa_sell_tax_id: "",
    coa_buy_tax_id: "",
    coa_ceil_id: "",
    coa_debt_id: "",
    coa_receivable_id: "",
    coa_payment_method_id: "",
    coa_retur_purchase_id: "",
    coa_retur_sales_id: "",
    income_tax: 0,
    coa_buy_income_tax_id: "",
    coa_sell_income_tax_id: "",
  });

  useEffect(() => {
    axiosInstance.get(`/accounting/master-data/coa/select`).then((res) => {
      console.log({ getSelectCoa: res.data.data });
      const data = res.data.data;
      setCoaChoice(data);
    });
  }, []);

  const handleUpdateAction = async () => {
    // console.log("awdwad");
  };

  return (
    <>
      <div className="font-secondary">
        <div className="card p-5 col-md-12 mb-4">
          <div className="row g-4">
            <h4 className="">Pembukuan Transaksi</h4>
            <div className="col-md-6">
              <SelectField
                name="coa_material_id"
                label="Pembukuan Material"
                control={control}
                errors={errors}
                options={coaChoice.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
                placeholder="Pilih COA"
                isRequired={true}
              />
            </div>
            <div className="col-md-6">
              <SelectField
                name="coa_service_id"
                label="Pembukuan Layanan"
                control={control}
                errors={errors}
                options={coaChoice.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
                placeholder="Pilih COA"
              />
            </div>
            <div className="col-md-6">
              <SelectField
                name="coa_debt_id"
                label="Pembukuan Hutang"
                control={control}
                errors={errors}
                options={coaChoice.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
                placeholder="Pilih COA"
                isRequired={true}
              />
            </div>
            <div className="col-md-6">
              <SelectField
                name="coa_receivable_id"
                label="Pembukuan Piutang"
                control={control}
                errors={errors}
                options={coaChoice.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
                placeholder="Pilih COA"
                isRequired={true}
              />
            </div>
            <div className="col-md-6">
              <SelectField
                name="coa_ceil_id"
                label="Pembukuan Pembulatan"
                control={control}
                errors={errors}
                options={coaChoice.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
                placeholder="Pilih COA"
                isRequired={true}
              />
            </div>
            <div className="col-md-6">
              <SelectField
                name="coa_payment_method_id"
                label="Pembukuan COA Induk Metode Bayar"
                control={control}
                errors={errors}
                options={coaChoice.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
                placeholder="Pilih COA"
                isRequired={true}
              />
            </div>
          </div>
        </div>
        <div className="card p-5 col-md-12 mb-4">
          <div className="row g-4">
            <h4 className="">Pembukuan PPN</h4>
            <div className="col-md-6">
              <SelectField
                name="coa_buy_tax_id"
                label="Pembukuan PPN Masukan"
                control={control}
                errors={errors}
                options={coaChoice.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
                placeholder="Pilih COA"
                isRequired={true}
              />
            </div>
            <div className="col-md-6">
              <SelectField
                name="coa_sell_tax_id"
                label="Pembukuan PPN Keluaran"
                control={control}
                errors={errors}
                options={coaChoice.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
                placeholder="Pilih COA"
                isRequired={true}
              />
            </div>
            <div className="col-md-6">
              <SelectField
                name="coa_buy_income_tax_id"
                label="Pembukuan PPH Masukan"
                control={control}
                errors={errors}
                options={coaChoice.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
                placeholder="Pilih COA"
                isRequired={true}
              />
            </div>
            <div className="col-md-6">
              <SelectField
                name="coa_sell_income_tax_id"
                label="Pembukuan PPH Keluaran"
                control={control}
                errors={errors}
                options={coaChoice.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
                placeholder="Pilih COA"
                isRequired={true}
              />
            </div>
            <div className="col-md-6">
              <InputField
                name="float"
                label="Persentase PPN Jual Beli"
                control={control}
                errors={errors}
                options={coaChoice.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
                placeholder="0"
                withPercentage={true}
              />
            </div>
            <div className="col-md-6">
              <InputField
                name="income_tax"
                label="Persentase PPH"
                control={control}
                errors={errors}
                options={coaChoice.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
                placeholder="0"
                withPercentage={true}
              />
            </div>
          </div>
        </div>
        {/* <div className="card p-5 col-md-12 mb-4">
          <div className="row g-4">
            <h4 className="">Pembukuan POS</h4>
            <div className="col-md-6">
              <SelectField
                name="coa_sell_tax_id"
                label="Pembukuan Penjualan POS"
                control={control}
                errors={errors}
                options={coaChoice.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
                placeholder="Pilih COA"
                isRequired={true}
              />
            </div>
            <div className="col-md-6">
              <SelectField
                name="coa_ceil_id"
                label="COA"
                control={control}
                errors={errors}
                options={coaChoice.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
                placeholder="Pilih COA"
              />
            </div>
          </div>
        </div> */}
        <div className="card p-5 col-md-12 mb-4">
          <div className="row g-4">
            <h4 className="">Pembukuan Retur</h4>
            <div className="col-md-6">
              <SelectField
                name="coa_retur_sales_id"
                label="Pembukuan Retur Penjualan"
                control={control}
                errors={errors}
                options={coaChoice.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
                placeholder="Pilih COA"
                isRequired={true}
              />
            </div>
            <div className="col-md-6">
              <SelectField
                name="coa_retur_purchase_id"
                label="Pembukuan Retur Pembelian"
                control={control}
                errors={errors}
                options={coaChoice.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
                placeholder="Pilih COA"
                isRequired={true}
              />
            </div>
          </div>
        </div>
      </div>
      {children({ handleUpdateAction })}
    </>
  );
};

export default ServiceSection;

type CoaChoiceType = {
  id: string;
  name: string;
  no_account: string;
  parent_account: {
    id: string;
    name: string;
  };
  status: boolean;
  type: string;
};
