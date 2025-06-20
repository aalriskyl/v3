import { FC, useState, useEffect } from "react";
import { PageTitle, PageLink } from "@metronic/layout/core";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getGudangById, deleteUomById } from "../../components/core/_request";
import {
  DeleteConfirmationModal,
  DeleteSuccessModal,
} from "@metronic/layout/components/form/organism/DeleteModal";
import axiosInstance from "../../../../../../../service/axiosInstance";
import { getErrorMessage } from "../../../../../../helper/getErrorMessage";
import SuccessModal from "@metronic/layout/components/form/organism/SuccessModal";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";

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
    title: "Master Data",
    path: "/inventory/masterdata",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "Gudang",
    path: "/inventory/masterdata/gudang",
    isSeparator: false,
    isActive: false,
  },
];

const DetailGudang: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [uomData, setUomData] = useState<{
    id: string;
    name: string;
    address: string;
    company_id: string;
  }>({
    id: "",
    address: "",
    company_id: "",
    name: "",
  });

  const navigate = useNavigate();

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isDeleteSuccessModalVisible, setIsDeleteSuccessModalVisible] =
    useState(false);

  const [failedMessage, setFailedMessage] = useState<null | string>(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCustomerData = async () => {
      if (id) {
        try {
          const data = await getGudangById(id);
          console.log({ data });
          setUomData(data);
        } catch (error) {
          console.error("Error fetching customer data:", error);
        }
      }
    };
    fetchCustomerData();
  }, [id]);

  const handleDeleteAction = async () => {
    setIsLoading(true);
    try {
      await axiosInstance.delete(`/inventory/master-data/warehouse/${id}`);
      setIsDeleteSuccessModalVisible(true);
    } catch (error) {
      setFailedMessage(getErrorMessage(error));
    } finally {
      setIsLoading(false);
      setIsDeleteModalVisible(false);
    }
  };

  // Loading state if data is not yet available
  if (!uomData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isLoading && <OverlayLoader />}
      {/* Breadcrumb Header */}
      <PageTitle breadcrumbs={breadcrumbs}>Detail Gudang</PageTitle>

      {/* Display Brand Data */}
      <div className="container card p-5 font-secondary">
        <div className="col-md-12 d-flex">
          {/* Brand Details */}
          <div className="d-flex flex-column  col-md-6">
            <div className="col-md-3 col-lg-3 mb-6">
              <label className="form-label fw-bold">Nama Gudang</label>
              <div className="fw-base text-gray-800">{uomData.name}</div>
            </div>
            <div className="col-md-3 col-lg-3 mb-6">
              <label className="form-label fw-bold">Alamat</label>
              <div className="fw-base text-gray-800">{uomData.address}</div>
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
            onClick={() => {
              setIsDeleteModalVisible(true);
            }}
            className="btn px-12 py-3 border border-gray-500 me-2"
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

      {isDeleteModalVisible && (
        <DeleteConfirmationModal
          onConfirmDelete={handleDeleteAction}
          closeModal={() => setIsDeleteModalVisible(false)}
          title="Hapus Data?"
          confirmLabel="Hapus"
          cancelLabel="Batalkan"
          message="Apakah Anda yakin ingin menghapus data ini?"
        />
      )}
      {isDeleteSuccessModalVisible && (
        <SuccessModal
          title="Berhasil"
          successMessage="Data telah berhasil dihapus!"
          closeModal={() => {
            setIsDeleteSuccessModalVisible(false);
            navigate("../");
          }}
        />
      )}
      {failedMessage && (
        <FailedModal
          closeModal={() => setFailedMessage(null)}
          title="Gagal"
          message={failedMessage}
        />
      )}
    </>
  );
};

export default DetailGudang;
