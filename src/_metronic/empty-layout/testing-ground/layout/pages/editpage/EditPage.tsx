import { FC, useState, useEffect } from "react";
import { PageLink, PageTitle } from "@metronic/layout/core";
import { useParams } from "react-router-dom";
import FormSubmission from "../../components/template/FormSubmission";

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
    title: "Module",
    path: "/accounting/masterdata/chart-of-account",
    isSeparator: false,
    isActive: false,
  },
];

const EditPage: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Ubah Module</PageTitle>
      <FormSubmission
        mode="edit"
        successMessage="Module berhasil diperbarui"
        headTitle="Edit Module"
        buttonTitle="Ubah"
        message="Pastikan bahwa informasi sudah benar."
        confirmButtonLabel="Simpan"
        cancelButtonLabel="Batal"
      />
    </>
  );
};

export default EditPage;
