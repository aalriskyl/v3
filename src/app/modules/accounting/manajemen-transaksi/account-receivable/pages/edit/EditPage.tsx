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
      <PageTitle breadcrumbs={breadcrumbs}>Ubah Sales Order</PageTitle>
      {/* Add Sales Order Form */}
      <Form
        mode="edit"
        formTitle="Edit Sales Order?"
        submitButtonLabel="Edit"
        successMessage="Sales Order berhasil di ubah"
        headTitle="Ubah Sales Order"
        buttonTitle="Ubah"
        message="Pastikan bahwa semua informasi sudah benar"
      />
    </>
  );
};

export default EditPage;
