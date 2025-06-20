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
      title: "Retur Pembelian",
      path: "/inventory/pengajuan/manajemen-pengiriman/retur-pembelian",
      isSeparator: false,
      isActive: false,
    },
  ];
  return (
    <>
      {/* Breadcrumb Header */}
      <PageTitle breadcrumbs={breadcrumbs}>Tambah Retur Pembelian</PageTitle>
      <Form
        mode="create"
        successMessage="Retur Pembelian berhasil di tambah"
        headTitle="Tambah Retur Pembelian"
        buttonTitle="Tambah"
        confirmButtonLabel="Tambah"
        cancelButtonLabel="Kembali"
        message="Pastikan informasi sudah lengkap."
      />
    </>
  );
};

export default AddPage;
