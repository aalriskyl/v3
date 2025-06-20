import { FC, useState, useEffect } from "react";
import { PageLink, PageTitle } from "@metronic/layout/core";
import { useNavigate, useParams } from "react-router-dom";
import Form from "../../components/template/RefactoredForm";
import { Model } from "../../components/molecules/core/_models";
import axiosInstance from "../../../../../../../../service/axiosInstance";

const EditSupplierPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [existingSupplier, setExistingSupplier] = useState<Model | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSupplier = async () => {
      if (id) {
        try {
          const response = await axiosInstance.get(
            `/inventory/submission/stock-management/stock-entry/${id}`
          );
          setExistingSupplier(response.data.data);
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

    fetchSupplier();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  if (!existingSupplier) {
    return <div>No customer data found.</div>;
  }

  // Map the fetched data to the FormData structure
  const defaultValues = {
    type: existingSupplier.status === "Draft" ? "Debit" : "Kredit", // Adjust based on your logic
    warehouse_id: existingSupplier.warehouse.id,
    remarks: existingSupplier.remarks,
  };

  const breadcrumbs: Array<PageLink> = [
    {
      title: 'Dashboard',
      path: '/',
      isSeparator: false,
      isActive: false,
  },
  {
      title: 'Inventory',
      path: '/inventory',
      isSeparator: false,
      isActive: true,
  },
  {
      title: 'Pengajuan',
      path: '/inventory/pengajuan/manajemen-stok/',
      isSeparator: false,
      isActive: true,
  },
  {
      title: 'Entry Stock',
      path: '/inventory/pengajuan/manajemen-stok/entry-stock',
      isSeparator: false,
      isActive: false,
  },
  ];

  return (
    <>
      {/* Breadcrumb Header */}
      <PageTitle breadcrumbs={breadcrumbs}>Ubah Stock Entry</PageTitle>
      {/* Add Supplier Form */}
      <Form
        mode="edit"
        defaultValues={defaultValues} // Pass defaultValues here
        submitButtonLabel="Ubah"
        successMessage="Stock Entry berhasil di ubah"
        headTitle="Ubah Stock Entry?"
        buttonTitle="Ubah"
        message="Pastikan bahwa semua informasi sudah benar."
      />
    </>
  );
};

export default EditSupplierPage;
