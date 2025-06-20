import { FC } from "react";
import { PageLink, PageTitle } from "@metronic/layout/core";
import BrandForm from "../../components/template/BrandForm";

const AddBrand: FC = () => {
  const breadcrumbs: Array<PageLink> = [
    {
      title: "Dashboard",
      path: "/",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "Inventory",
      path: "/inventory",
      isSeparator: false,
      isActive: true,
    },
    {
      title: "Master Data",
      path: "/inventory/masterdata",
      isSeparator: false,
      isActive: true,
    },
    {
      title: "Brand",
      path: "/inventory/masterdata/brand",
      isSeparator: false,
      isActive: false,
    },
  ];
  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Tambah Brand</PageTitle>
      <BrandForm
        mode="create"
        // formTitle='Tambah Brand?'
        // submitButtonLabel='Tambah'
        successMessage="Brand berhasil di tambah"
        headTitle="Tambah Brand"
        buttonTitle="Tambah"
        message="Pastikan bahwa semua informasi sudah benar."
      />
    </>
  );
};

export default AddBrand;
