import React, { FC, useState } from "react";
import { PageLink, PageTitle } from "@metronic/layout/core";
import Form from "../../components/template/RefactoredForm";
const breadcrumbs: Array<PageLink> = [
  {
    title: "Dashboard",
    path: "/",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "Inventory",
    path: "/inventory",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "Pengajuan",
    path: "/inventory/pengajuan/manajemen-stok",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "Stock Opname",
    path: "/inventory/pengajuan/manajemen-stok/stock-opname",
    isSeparator: false,
    isActive: false,
  },
];

const AddSupplierPage: FC = () => {
  return (
    <>
      {/* Breadcrumb Header */}
      <PageTitle breadcrumbs={breadcrumbs}>Tambah Stock Opname</PageTitle>
      <Form
        mode="create"
        successMessage="Stock Opname berhasil di tambah"
        headTitle="Tambah Stock Opname"
        buttonTitle="Tambah"
        confirmButtonLabel="Tambah"
        cancelButtonLabel="Batalkan"
        message="Pastikan informasi sudah lengkap."
      />
    </>
  );
};

export default AddSupplierPage;
