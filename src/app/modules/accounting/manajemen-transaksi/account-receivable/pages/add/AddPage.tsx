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
      title: "Sales Order",
      path: "/accounting/manajemen-transaksi/sales-order",
      isSeparator: false,
      isActive: false,
    },
  ];

  return (
    <>
      {/* Breadcrumb Header */}
      <PageTitle breadcrumbs={breadcrumbs}>Tambah Sales Order</PageTitle>
      <Form
        mode="create"
        formTitle="Tambah Sales Order"
        submitButtonLabel="Tambah"
        successMessage="Sales Order berhasil di tambah"
        headTitle="Tambah Sales Order"
        buttonTitle="Tambah"
        message="Pastikan bahwa semua informasi sudah benar"
      />
    </>
  );
};

export default AddPage;
