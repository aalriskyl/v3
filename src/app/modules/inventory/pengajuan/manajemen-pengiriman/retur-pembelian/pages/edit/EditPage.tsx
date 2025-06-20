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
      title: "Retur Pembelian",
      path: "/inventory/pengajuan/manajemen-pengiriman/retur-pembelian",
      isSeparator: false,
      isActive: false,
    },
  ];
  return (
    <>
      {/* Breadcrumb Header */}
      <PageTitle breadcrumbs={breadcrumbs}>Ubah Retur Pembelian</PageTitle>
      <Form
        mode="edit"
        successMessage="Retur Pembelian berhasil di Ubah"
        headTitle="Ubah Retur Pembelian"
        buttonTitle="Ubah"
        confirmButtonLabel="Ubah"
        cancelButtonLabel="Kembali"
        message="Pastikan informasi sudah lengkap."
      />
    </>
  );
};

export default EditPage;
