import { FC, useEffect, useState } from "react";
import { PageTitle, PageLink } from "@metronic/layout/core";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  DeleteConfirmationModal,
  DeleteSuccessModal,
} from "@metronic/layout/components/form/organism/DeleteModal";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";
import ConfirmModal from "@metronic/layout/components/form/organism/ConfirmModal";
import SuccessModal from "@metronic/layout/components/form/organism/SuccessModal";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";

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
// Dummy data for the service
// const dummyServiceData = {
//   id: id || "1", // Use the `id` from the URL or default to '1'
//   name: "Service Dummy",
//   description: "This is a dummy service description.",
//   brand: { name: "Brand Dummy" },
//   category: { name: "Category Dummy" },
//   sell_price: 100000,
//   default_purchase: false,
//   default_sale: false,
// };
const DetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  const [failedMessage, setFailedMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);


  return (
    <>
      {isLoading && <OverlayLoader />}
      <PageTitle breadcrumbs={breadcrumbs}>Detail Chart of Account</PageTitle>
      {/* Display Brand Data */}
      <div className="container card p-5 font-secondar mb-8">
        <h4 className="mb-8">Chart of Account</h4>
      </div>

      <div className="row">
        <div className="col-12 text-end my-4">
          <Link to="../" className="btn px-12 py-3 border border-gray-500 me-2">
            Kembali
          </Link>
          <button
            type="button"
            className="btn px-12 py-3 border border-gray-500 me-2"
            onClick={() => setDeleteModalVisible(true)}
          >
            Hapus
          </button>
          <Link
            to={`/accounting/masterdata/chart-of-account/edit/${id}`}
            className="btn btn-primary border border-primary px-16 py-3"
          >
            Ubah
          </Link>
        </div>
      </div>

      {/* {isDeleteModalVisible && (
        <DeleteConfirmationModal
          cancelLabel="Kembali"
          confirmLabel="Hapus"
          onConfirmDelete={handleDelete}
          closeModal={() => setDeleteModalVisible(false)}
          title="Hapus Data?"
          message="Data akan terhapus dan tidak bisa dikembalikan."
        />
      )} */}

      {isSuccessModalVisible && (
        <DeleteSuccessModal
          closeModal={() => {
            setSuccessModalVisible(false);
            navigate("../");
          }}
          title="Berhasil"
          message="Data berhasil dihapus."
        />
      )}

      {failedMessage && (
        <FailedModal
          closeModal={() => setFailedMessage(null)}
          title="Gagal"
          message={failedMessage}
        />
      )}

      {isSuccessModalVisible && (
        <SuccessModal
          closeModal={() => {
            navigate("../");
            setSuccessModalVisible(false);
          }}
          successMessage="Data berhasil terhapus"
        />
      )}
    </>
  );
};

export default DetailPage;
