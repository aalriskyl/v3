import { FC } from "react";
import { PageLink, PageTitle } from "@metronic/layout/core";
import UomForm from "../../components/template/GudangForm";

const AddGudang: FC = () => {
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
      isActive: false,
    },
    {
      title: "Master Data",
      path: "/inventory/masterdata",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "Gudang",
      path: "/inventory/masterdata/gudang",
      isSeparator: false,
      isActive: false,
    },
  ];
  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Tambah Gudang</PageTitle>
      <UomForm
        mode="create"
        successMessage="Gudang berhasil di tambah"
        headTitle="Tambah Gudang"
        buttonTitle="Tambah"
        message="Pastikan bahwa semua informasi sudah benar."
      />
    </>
  );
};

export default AddGudang;
