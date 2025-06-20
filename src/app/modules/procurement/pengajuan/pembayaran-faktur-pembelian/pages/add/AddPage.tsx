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
      title: "Pembayaran Faktur Pembelian",
      path: "/procurement/pengajuan/pembayaran-faktur-pembelian",
      isSeparator: false,
      isActive: false,
    },
  ];
  return (
    <>
      {/* Breadcrumb Header */}
      <PageTitle breadcrumbs={breadcrumbs}>
        Tambah Pembayaran Faktur Pembelian
      </PageTitle>
      {/* Add Sales Order Form */}
      <Form
        mode="create"
        formTitle="Tambah Pembayaran Faktur Pembelian"
        submitButtonLabel="Tambah"
        successMessage="Pembayaran Faktur Pembelian berhasil di tambah"
        headTitle="Tambah Pembayaran Faktur Pembelian"
        buttonTitle="Tambah"
        message="Pastikan bahwa semua informasi sudah benar"
      />
    </>
  );
};

export default AddPage;
