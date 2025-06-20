import { FC, useState, useEffect } from "react";
import { PageLink, PageTitle } from "@metronic/layout/core";
import { useParams } from "react-router-dom";
import ServiceFormEdit from "../../components/template/ServiceFormEdit";
import { getServiceById } from "../../components/core/_request";
import ServiceForm from "../../components/template/ServiceForm";

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
    title: "Master Data",
    path: "/accounting/masterdata",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "Chart of Account",
    path: "/accounting/masterdata/chart-of-account",
    isSeparator: false,
    isActive: false,
  },
];

const EditPage: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Ubah Chart of Account</PageTitle>
      <ServiceForm
        mode="edit"
        successMessage="Chart of Account berhasil diperbarui"
        headTitle="Edit Chart of Account"
        buttonTitle="Ubah"
        message="Pastikan bahwa informasi sudah benar."
        confirmButtonLabel="Simpan"
        cancelButtonLabel="Batal"
      />
    </>
  );
};

export default EditPage;
