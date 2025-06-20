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
      title: "Sales",
      path: "/sales",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "Pengajuan",
      path: "/sales/pengajuan",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "Pembayaran Faktur Penjualan",
      path: "/sales/pengajuan/pembayaran-faktur-penjualan",
      isSeparator: false,
      isActive: false,
    },
  ];
  return (
    <>
      {/* Breadcrumb Header */}
      <PageTitle breadcrumbs={breadcrumbs}>
        Ubah Pembayaran Faktur Penjualan
      </PageTitle>
      {/* Add Sales Order Form */}
      <Form
        mode="edit"
        formTitle="Pembayaran Faktur Penjualan"
        submitButtonLabel="Edit"
        successMessage="Pembayaran Faktur Penjualan berhasil di ubah"
        headTitle="Ubah Pembayaran Faktur Penjualan"
        buttonTitle="Ubah"
        message="Pastikan bahwa semua informasi sudah benar"
      />
    </>
  );
};

export default EditPage;
