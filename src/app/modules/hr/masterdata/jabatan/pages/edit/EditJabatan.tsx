import { FC } from "react";
import { PageLink, PageTitle } from "@metronic/layout/core";
import Form from "../../components/template/JabatanForm";

const EditJabatan: FC = () => {
  const breadcrumbs: Array<PageLink> = [
    {
      title: "Dashboard",
      path: "/",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "HR",
      path: "/hr",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "Master Data",
      path: "/hr/masterdata/",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "Jabatan",
      path: "/hr/masterdata/jabatan",
      isSeparator: false,
      isActive: false,
    },
  ];

  const handleSubmissionDate = (date: string) => {
    console.log("Selected submission date:", date);
  };

  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Ubah Jabatan</PageTitle>
      <Form
        setSubmissionDate={handleSubmissionDate}
        formTitle="Ubah Jabatan"
        submitButtonLabel="Ubah"
        successMessage="Jabatan berhasil diubah"
        headTitle="Ubah Jabatan"
        buttonTitle="Ubah"
        message="Pastikan bahwa semua informasi sudah benar."
      />
    </>
  );
};

export default EditJabatan;
