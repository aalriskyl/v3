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
      title: "Faktur Pembelian",
      path: "/procurement/pengajuan/faktur-pembelian",
      isSeparator: false,
      isActive: false,
    },
  ];
  return (
    <>
      {/* Breadcrumb Header */}
      <PageTitle breadcrumbs={breadcrumbs}>Ubah Faktur Pembelian</PageTitle>
      {/* Add Sales Order Form */}
      <Form
        mode="edit"
        formTitle="Edit Faktur Pembelian"
        submitButtonLabel="Edit"
        successMessage="Faktur Pembelian berhasil di ubah"
        headTitle="Ubah Faktur Pembelian"
        buttonTitle="Ubah"
        message="Pastikan bahwa semua informasi sudah benar"
      />
    </>
  );
};

export default EditPage;
