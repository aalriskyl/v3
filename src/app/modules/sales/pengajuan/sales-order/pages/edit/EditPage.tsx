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
      title: "Request Order",
      path: "/sales/pengajuan/request-order",
      isSeparator: false,
      isActive: false,
    },
  ];
  return (
    <>
      {/* Breadcrumb Header */}
      <PageTitle breadcrumbs={breadcrumbs}>Ubah Request Order</PageTitle>
      {/* Add Request Order Form */}
      <Form
        mode="edit"
        formTitle="Edit Request Order"
        submitButtonLabel="Edit"
        successMessage="Request Order berhasil di ubah"
        headTitle="Ubah Request Order"
        buttonTitle="Ubah"
        message="Pastikan bahwa semua informasi sudah benar"
      />
    </>
  );
};

export default EditPage;
