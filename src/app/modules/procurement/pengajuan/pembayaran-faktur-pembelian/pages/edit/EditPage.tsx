import React, { FC } from "react";
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
        Ubah Pembayaran Faktur Pembelian
      </PageTitle>
      {/* Add Sales Order Form */}
      <Form
        mode="edit"
        formTitle="Pembayaran Faktur Pembelian"
        submitButtonLabel="Edit"
        successMessage="Pembayaran Faktur Pembelian berhasil di ubah"
        headTitle="Ubah Pembayaran Faktur Pembelian"
        buttonTitle="Ubah"
        message="Pastikan bahwa semua informasi sudah benar"
      />
    </>
  );
};

export default EditPage;
