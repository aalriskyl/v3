import React, { FC } from "react";
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
      title: "Procurement",
      path: "/procurement",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "Pengajuan",
      path: "/procurement/pengajuan",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "Faktur Pembelian",
      path: "/procurement/pengajuan/faktur-pembelian",
      isSeparator: false,
      isActive: false,
    },
  ];
  return (
    <>
      {/* Breadcrumb Header */}
      <PageTitle breadcrumbs={breadcrumbs}>Tambah Faktur Pembelian</PageTitle>
      {/* Add Sales Order Form */}
      <Form
        mode="create"
        formTitle="Tambah Faktur Pembelian"
        submitButtonLabel="Tambah"
        successMessage="Faktur Pembelian berhasil di tambah"
        headTitle="Tambah Faktur Pembelian"
        buttonTitle="Tambah"
        message="Pastikan bahwa semua informasi sudah benar"
      />
    </>
  );
};

export default AddPage;
