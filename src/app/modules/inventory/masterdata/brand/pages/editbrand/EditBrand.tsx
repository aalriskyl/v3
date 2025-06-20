import { FC, useState, useEffect } from "react";
import { PageLink, PageTitle } from "@metronic/layout/core";
import BrandForm from "../../components/template/BrandForm";
import { useNavigate, useParams } from "react-router-dom";
import { Brand } from "../../components/molecules/core/_models";
import axiosInstance from "../../../../../../../service/axiosInstance";

const EditBrandPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [existingBrand, setExistingBrand] = useState<Brand | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      if (id) {
        try {
          const response = await axiosInstance.get(
            `/inventory/master-data/brand/${id}`
          );
          setExistingBrand(response.data.data);
          setIsLoading(false);
        } catch (error) {
          console.error("Failed to fetch customer data:", error);
          setError("Failed to fetch customer data. Please try again.");
          setIsLoading(false);
        }
      } else {
        setError("Customer ID is missing.");
        setIsLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  if (!id) {
    return <div>No customer data found.</div>;
  }

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
      isActive: true,
    },
    {
      title: "Master Data",
      path: "/inventory/masterdata",
      isSeparator: false,
      isActive: true,
    },
    {
      title: "Brand",
      path: "/inventory/masterdata/brand",
      isSeparator: false,
      isActive: false,
    },
  ];
  return (
    <>
      {/* Breadcrumb Header */}
      <PageTitle breadcrumbs={breadcrumbs}>Ubah Brand</PageTitle>
      {/* Add Supplier Form */}
      <BrandForm
        mode="edit"
        // formTitle='Ubah Brand'
        // submitButtonLabel='Ubah'
        successMessage="Brand berhasil di ubah"
        headTitle="Ubah Brand"
        buttonTitle="Ubah"
        message="Pastikan bahwa semua informasi sudah benar."
      />
    </>
  );
};

export default EditBrandPage;
