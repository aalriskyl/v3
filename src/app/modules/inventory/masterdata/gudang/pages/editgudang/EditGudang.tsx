import React, { FC, useState } from "react";
import { PageLink, PageTitle } from "@metronic/layout/core";
import LayananForm from "../../components/template/GudangForm";

const EditGudang: FC = () => {
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
      <PageTitle breadcrumbs={breadcrumbs}>Ubah Gudang</PageTitle>
      <LayananForm
        mode="edit"
        successMessage="Gudang berhasil di ubah."
        headTitle="Ubah Gudang"
        buttonTitle="Ubah"
        cancelButtonLabel="Kembali"
        message="Pastikan bahwa semua informasi sudah benar."
      />
    </>
  );
};

export default EditGudang;
