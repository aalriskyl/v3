import { FC, useState, useEffect } from "react";
import { PageLink, PageTitle } from "@metronic/layout/core";
import { useParams } from "react-router-dom";
import ServiceFormEdit from "../../components/template/ServiceFormEdit";
import { getServiceById } from "../../components/core/_request";
import ServiceForm from "../../components/template/ServiceForm";

const EditPage: FC = () => {
  const { id } = useParams<{ id: string }>(); // Extract the `id` from the URL
  const [serviceData, setServiceData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      title: "Detail Pembukuan",
      path: "/accounting/manajemen-pembukuan/pembukuan-perusahaan",
      isSeparator: false,
      isActive: false,
    },
  ];

  // Fetch service data based on the `id` from the URL
  // useEffect(() => {
  //     const fetchServiceData = async () => {
  //         setIsLoading(true);
  //         setError(null);
  //         try {
  //             const data = await getServiceById(id!); // Call the `getServiceById` function
  //             setServiceData(data); // Set the fetched data
  //         } catch (err) {
  //             setError('Failed to fetch service data.');
  //             console.error(err);
  //         } finally {
  //             setIsLoading(false);
  //         }
  //     };

  //     fetchServiceData();
  // }, [id]);

  // if (isLoading) {
  //     return <div>Loading...</div>; // Show loading state
  // }

  if (error) {
    return <div>{error}</div>; // Show error message
  }

  // if (!serviceData) {
  //     return <div>Data tidak ditemukan</div>; // Show message if no data is found
  // }

  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Ubah Pembukuan</PageTitle>
      <ServiceForm
        mode="edit"
        successMessage="Pembukuan berhasil diperbarui"
        headTitle="Edit Pembukuan"
        buttonTitle="Ubah"
        message="Pastikan bahwa informasi sudah benar."
        confirmButtonLabel="Simpan"
        cancelButtonLabel="Batal"
      />
    </>
  );
};

export default EditPage;
