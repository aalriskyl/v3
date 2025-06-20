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
      title: "Purchase Order",
      path: "/accounting/manajemen-transaksi/purchase-order",
      isSeparator: false,
      isActive: false,
    },
  ];

  return (
    <>
      {/* Breadcrumb Header */}
      <PageTitle breadcrumbs={breadcrumbs}>Ubah Purchase Order</PageTitle>
      {/* Add Sales Order Form */}
      <Form
        mode="edit"
        formTitle="Edit Purchase Order?"
        submitButtonLabel="Edit"
        successMessage="Purchase Order berhasil di ubah"
        headTitle="Ubah Purchase Order"
        buttonTitle="Ubah"
        message="Pastikan bahwa semua informasi sudah benar"
      />
    </>
  );
};

export default EditPage;
