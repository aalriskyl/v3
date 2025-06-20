import React, { FC, useState } from "react";
import { PageLink, PageTitle } from "@metronic/layout/core";
import Form from "../../components/template/RefactoredForm";

const AddPage: FC = () => {
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
      <PageTitle breadcrumbs={breadcrumbs}>Tambah Retur Penjualan</PageTitle>
      <Form
        mode="create"
        successMessage="Retur Penjualan berhasil di tambah"
        headTitle="Tambah Retur Penjualan"
        buttonTitle="Tambah"
        confirmButtonLabel="Tambah"
        cancelButtonLabel="Back"
        message="Pastikan informasi sudah lengkap."
      />
    </>
  );
};

export default AddPage;
