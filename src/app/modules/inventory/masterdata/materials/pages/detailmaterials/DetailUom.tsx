import { FC, useState, useEffect } from "react";
import { PageTitle, PageLink } from "@metronic/layout/core";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  DeleteConfirmationModal,
  DeleteSuccessModal,
} from "@metronic/layout/components/form/organism/DeleteModal";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";
import ConfirmModal from "@metronic/layout/components/form/organism/ConfirmModal";
import SuccessModal from "@metronic/layout/components/form/organism/SuccessModal";
import SupplierDetailTableLayout from "../../components/template/SupplierDetailTableLayout";
import {
  getMaterialUomById,
  deleteUomFromMaterial,
} from "../../components/core/_request";
import SupplierTableLayout from "../../components/template/SupplierTableLayout";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";

const DetailUom: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [uomData, setUomData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  const [isFailedModalVisible, setFailedModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
      title: "Materials",
      path: "/inventory/masterdata/materials",
      isSeparator: false,
      isActive: false,
    },
  ];

  // Fetch UOM data based on id
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        if (!id) {
          throw new Error("UOM ID is undefined");
        }

        // Fetch UOM data from the API
        const data = await getMaterialUomById(id);
        // console.log(data);
        if (data) {
          setUomData(data);
        } else {
          throw new Error("Data not found");
        }
      } catch (err) {
        setError("Failed to fetch UOM data.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSave = () => {
    setIsModalVisible(true);
  };

  const handleConfirm = () => {
    setIsModalVisible(false);
    try {
      console.log("Data berhasil diubah");
      setSuccessModalVisible(true);
    } catch (error) {
      console.error("Gagal mengubah data", error);
      setFailedModalVisible(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleCloseSuccessModal = () => {
    setSuccessModalVisible(false);
    navigate("../"); // Navigate back
  };

  const handleCloseFailedModal = () => {
    setFailedModalVisible(false);
  };

  const handleDelete = async () => {
    try {
      if (!id) {
        throw new Error("UOM ID is undefined");
      }
      await deleteUomFromMaterial(id);
      setDeleteModalVisible(false);
      setSuccessModalVisible(true);
    } catch (error) {
      console.error("Failed to delete UOM", error);
      setDeleteModalVisible(false);
      setFailedModalVisible(true);
    }
  };

  if (isLoading) {
    return <OverlayLoader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!uomData) {
    return <OverlayLoader />;
  }

  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Detail Uom</PageTitle>

      <div className="container card p-5 font-secondary mb-8">
        <h4 className="mb-8">UOM</h4>
        <div className="row">
          <div className="col-md-6">
            <div className="col-md-12 mb-2">
              <label className="form-label fw-bold">Satuan Uom</label>
              <div className="fw-light text-gray-800">
                {uomData.uom_actual?.name}
              </div>
            </div>
            <div className="col-md-12 mb-2">
              <label className="form-label fw-bold">Konversi Uom</label>
              <div className="fw-light text-gray-800">{uomData.conversion}</div>
            </div>
            <div className="col-md-12 mb-2">
              <label className="form-label fw-bold">SKU</label>
              <div className="fw-light text-gray-800">{uomData.sku}</div>
            </div>
            <div className="col-md-12 mb-2">
              <label className="form-label fw-bold">Akses</label>
              <div className="fw-light text-gray-800">
                {uomData.uom_sellable ? "Bisa Dijual" : "Tidak Bisa Dijual"}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="col-md-12 mb-2">
              <label className="form-label fw-bold">Barcode</label>
              <div className="fw-light text-gray-800">{uomData.barcode}</div>
            </div>
            <div className="col-md-12 mb-2">
              <label className="form-label fw-bold">Set Default</label>
              <div className="fw-light text-gray-800">
                {uomData.uom_default ? "" : ""}
                {uomData.uom_default_sell ? "Penjualan " : ""}
                {uomData.uom_default_buy ? "Pembelian" : ""}
              </div>
            </div>
            <div className="col-md-12 mb-2">
              <label className="form-label fw-bold">Harga Jual</label>
              <div className="fw-light text-gray-800">{uomData.sell_price}</div>
            </div>
            <div className="col-md-12 mb-2">
              <label className="form-label fw-bold">Margin</label>
              <div className="fw-light text-gray-800">{uomData?.margin}</div>
            </div>
          </div>
        </div>
      </div>

      <SupplierTableLayout uomId={id || ""} />

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
          {/* <button
                        type="button"
                        className="btn btn-primary border border-primary px-16 py-3"
                        onClick={handleSave}
                    >
                        Ubah
                    </button> */}
        </div>
      </div>

      {isDeleteModalVisible && (
        <DeleteConfirmationModal
          cancelLabel="Kembali"
          confirmLabel="Hapus"
          onConfirmDelete={handleDelete}
          closeModal={() => setDeleteModalVisible(false)}
          title="Hapus Data?"
          message="Data akan terhapus dan tidak bisa dikembalikan."
        />
      )}

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

      {isFailedModalVisible && (
        <FailedModal
          closeModal={() => setFailedModalVisible(false)}
          title="Gagal"
          message="Uom gagal dihapus."
        />
      )}

      {isModalVisible && (
        <ConfirmModal
          handleSubmit={handleConfirm}
          closeModal={handleCloseModal}
          headTitle="Ubah Uom"
          confirmButtonLabel="Ubah"
          cancelButtonLabel="Batalkan"
          message="Pastikan bahwa semua informasi sudah benar."
        />
      )}

      {isSuccessModalVisible && (
        <SuccessModal
          closeModal={handleCloseSuccessModal}
          message="Data berhasil diubah!"
        />
      )}

      {isFailedModalVisible && (
        <FailedModal
          closeModal={handleCloseFailedModal}
          title="Gagal"
          message="Uom gagal diubah."
        />
      )}
    </>
  );
};

export default DetailUom;
