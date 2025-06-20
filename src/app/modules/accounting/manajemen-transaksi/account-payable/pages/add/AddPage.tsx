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
      title: "Accounting",
      path: "/accounting",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "Manajemen Transaksi",
      path: "/accounting/manajemen-transaksi",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "Purchase Order",
      path: "/accounting/manajemen-transaksi/purchase-order",
      isSeparator: false,
      isActive: false,
    },
  ];

  return (
    <>
      {/* Breadcrumb Header */}
      <PageTitle breadcrumbs={breadcrumbs}>Tambah Purchase Order</PageTitle>
      <Form
        mode="create"
        formTitle="Tambah Purchase Order"
        submitButtonLabel="Tambah"
        successMessage="Purchase Order berhasil di tambah"
        headTitle="Tambah Purchase Order"
        buttonTitle="Tambah"
        message="Pastikan bahwa semua informasi sudah benar"
      />
    </>
  );
};

export default AddPage;
