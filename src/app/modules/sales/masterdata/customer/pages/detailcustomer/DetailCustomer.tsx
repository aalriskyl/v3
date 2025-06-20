import { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PageTitle, PageLink } from "@metronic/layout/core";
import {
  DeleteConfirmationModal,
  DeleteSuccessModal,
} from "@metronic/layout/components/form/organism/DeleteModal";
import { Link } from "react-router-dom";
import {
  getCustomerById,
  deleteCustomer,
} from "../../components/core/_request";
import { getErrorMessage } from "../../../../../../helper/getErrorMessage";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";

const DetailCustomer: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [customerData, setCustomerData] = useState<any>(null); // State to store customer data
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [failedMessage, setFailedMessage] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Breadcrumbs setup
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
      title: "Master Data",
      path: "/sales/masterdata",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "Customer",
      path: "/sales/masterdata/customers",
      isSeparator: false,
      isActive: false,
    },
  ];

  // Fetch customer data by id
  useEffect(() => {
    const fetchCustomerData = async () => {
      if (id) {
        try {
          const data = await getCustomerById(id);
          setCustomerData(data);
        } catch (error) {
          console.error("Error fetching customer data:", error);
        }
      }
    };
    fetchCustomerData();
  }, [id]);

  // Handler for opening the confirmation modal
  const handleDeleteClick = () => {
    setShowConfirmModal(true);
  };

  // Handler for when delete is confirmed
  const handleConfirmDelete = async () => {
    try {
      await deleteCustomer(id!); // Make sure `id` is not null/undefined
      setShowConfirmModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      setIsModalVisible(false);
      setFailedMessage(getErrorMessage(error));
    }
  };

  // Handler for closing modals
  const closeModal = () => {
    setShowConfirmModal(false);
    setShowSuccessModal(false);
  };

  // Loading state if data is not yet available
  if (!customerData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* Breadcrumb Header */}
      <PageTitle breadcrumbs={breadcrumbs}>Detail Customer</PageTitle>

      {/* Display Customer Data */}
      <div className="container card p-5 font-secondary">
        <div className="row g-1">
          <div className="col-md-6 mb-2">
            <label className="form-label fw-bold">Nama Perusahaan</label>
            <div className="fw-light text-gray-800">{customerData.name}</div>
          </div>

          <div className="col-md-6 mb-2">
            <label className="form-label">Email</label>
            <div className="fw-light text-gray-800">{customerData.email}</div>
          </div>

          <div className="col-md-6 mb-2">
            <label className="form-label fw-bold">Nomor Handphone</label>
            <div className="fw-light text-gray-800">{customerData.phone}</div>
          </div>

          <div className="col-md-6 mb-2">
            <label className="form-label fw-bold">Kota</label>
            <div className="fw-light text-gray-800">
              {customerData.city.name}
            </div>
          </div>

          <div className="col-md-6 mb-2">
            <label className="form-label fw-bold">Industri</label>
            <div className="fw-light text-gray-800">
              {customerData.industry}
            </div>
          </div>

          <div className="col-md-6 mb-2">
            <label className="form-label fw-bold">Alamat</label>
            <div className="fw-light text-gray-800">{customerData.address}</div>
          </div>
          <div className="col-md-6 mb-2">
            <label className="form-label fw-bold">Company</label>
            <div className="fw-light text-gray-800">
              {customerData?.is_company?.name}
            </div>
          </div>
          <div className="col-md-6 mb-2">
            <label className="form-label fw-bold">Perusahaan</label>
            <div className="fw-light text-gray-800">
              {customerData.is_a_company ? "Yes" : "No"}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="row">
        <div className="col-12 text-end my-4">
          <Link to="../" className="btn px-12 py-3 border border-gray-500 me-2">
            Kembali
          </Link>
          <button
            type="button"
            className="btn px-12 py-3 border border-gray-500 me-2"
            onClick={handleDeleteClick}
          >
            Hapus
          </button>
          <Link
            to={`../edit/${id}`}
            className="btn btn-primary px-12 py-3 border me-2"
          >
            Ubah
          </Link>
        </div>
      </div>
      {failedMessage && (
        <FailedModal
          closeModal={() => setFailedMessage(null)}
          message={failedMessage}
          confirmLabel="Kembali"
        />
      )}
      {/* Delete Modals */}
      {showConfirmModal && (
        <DeleteConfirmationModal
          closeModal={closeModal}
          onConfirmDelete={handleConfirmDelete}
        />
      )}
      {showSuccessModal && <DeleteSuccessModal closeModal={closeModal} />}
    </>
  );
};

export default DetailCustomer;
