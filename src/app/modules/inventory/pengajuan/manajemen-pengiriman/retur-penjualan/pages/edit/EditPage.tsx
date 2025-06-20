import React, { FC, useState } from "react";
import { PageLink, PageTitle } from "@metronic/layout/core";
import Form from "../../components/template/RefactoredForm";

const EditPage: FC = () => {
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
      title: "Pengajuan",
      path: "/inventory/pengajuan",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "Manajemen Pengiriman",
      path: "/inventory/pengajuan/manajemen-pengiriman",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "Retur Penjualan",
      path: "/inventory/pengajuan/manajemen-pengiriman/retur-penjualan",
      isSeparator: false,
      isActive: false,
    },
  ];
  return (
    <>
      {/* Breadcrumb Header */}
      <PageTitle breadcrumbs={breadcrumbs}>Ubah Retur Penjualan</PageTitle>
      <Form
        mode="edit"
        successMessage="Retur Penjualan berhasil di Ubah"
        headTitle="Ubah Retur Penjualan"
        buttonTitle="Ubah"
        confirmButtonLabel="Ubah"
        cancelButtonLabel="Back"
        message="Pastikan informasi sudah lengkap."
      />
    </>
  );
};

export default EditPage;
