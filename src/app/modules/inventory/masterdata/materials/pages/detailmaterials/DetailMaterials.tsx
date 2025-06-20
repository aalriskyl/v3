import { FC, useState, useEffect } from "react";
import { PageTitle, PageLink } from "@metronic/layout/core";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  DeleteConfirmationModal,
  DeleteSuccessModal,
} from "@metronic/layout/components/form/organism/DeleteModal";
// import { dummyDataMaterial } from '../../components/organism/table/dummyData';
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";
import ImageHolder from "../../components/molecules/field/ImageHolder";
import ConfirmModal from "@metronic/layout/components/form/organism/ConfirmModal";
import SuccessModal from "@metronic/layout/components/form/organism/SuccessModal";
import UomDetailTableLayout from "../../components/template/UomDetailTableLayout";
import {
  deleteMaterials,
  getMaterialsById,
  MaterialById,
} from "../../components/core/_request";
import UomTableLayout from "../../components/template/UomTableLayout";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";
const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

const DetailMaterials: FC = () => {
  const { materialId } = useParams();
  const navigate = useNavigate(); // Tambahkan useNavigate untuk navigasi
  const [materialData, setMaterialData] = useState<MaterialById | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Tambahkan state untuk loading
  const [error, setError] = useState<string | null>(null); // Tambahkan state untuk error
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  const [isFailedModalVisible, setFailedModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const baseUrl = API_BASE_URL;

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

  // Fetch materials data based on materialId
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getMaterialsById(materialId!); // Add '!' if materialId is guaranteed to be a string
        if (data) {
          console.log(data);
          setMaterialData(data);
        } else {
          setError("Material not found");
        }
      } catch (err) {
        setError("Failed to fetch materials data.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [materialId]);

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
    navigate("../"); // Navigasi ke halaman sebelumnya
  };

  const handleCloseFailedModal = () => {
    setFailedModalVisible(false);
  };

  const handleDelete = () => {
    // const isSuccess = Math.random() > 0.5;
    // setTimeout(() => {
    //     setDeleteModalVisible(false);
    //     if (isSuccess) {
    //         setSuccessModalVisible(true);
    //     } else {
    //         setFailedModalVisible(true);
    //     }
    // }, 1000);
    setIsLoading(true);
    deleteMaterials(materialId || " ")
      .then(() => {
        setSuccessModalVisible(true);
      })
      .catch(() => {
        setFailedModalVisible(true);
      })
      .finally(() => {
        setDeleteModalVisible(false);
        setIsLoading(false);
      });
  };

  if (error) {
    return <div>{error}</div>;
  }

  // if (!materialData) {
  //     return <div>Data tidak ditemukan</div>;
  // }

  if (isLoading) {
    return <OverlayLoader />;
  }

  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Detail Material</PageTitle>
      {isLoading && <OverlayLoader />}
      <div className="container card p-5 font-secondary mb-8">
        <h4 className="mb-8">Material</h4>
        {materialData && (
          <div className="row">
            <div className="col-md-6">
              {/* Brand Image */}
              <div className="mb-4">
                <label className="form-label fw-bold">Foto Material</label>
                <div
                  className="square-container position-relative bg-light border"
                  style={{ width: "180px", height: "180px" }}
                >
                  <ImageHolder
                    imageUrl={`${baseUrl}/${materialData?.picture}`}
                    altText={`Logo ${materialData?.name}`}
                    className="square-image"
                    placeholder="No image available"
                  />
                </div>
                <label className="form-label fw-bold mt-3">Deskripsi</label>
                <div className="fw-light text-gray-800">
                  {materialData?.description}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="col-md-12 mb-2">
                <label className="form-label fw-bold">Nama Material</label>
                <div className="fw-light text-gray-800">
                  {materialData?.name}
                </div>
              </div>
              <div className="col-md-12 mb-2">
                <label className="form-label fw-bold">Kategori Material</label>
                <div className="fw-light text-gray-800">
                  {materialData?.category?.name}
                </div>
              </div>
              <div className="col-md-12 mb-2">
                <label className="form-label fw-bold">Brand</label>
                <div className="fw-light text-gray-800">
                  {materialData?.brand?.name}
                </div>
              </div>
              <div className="col-md-12 mb-2">
                <label className="form-label fw-bold">Satuan Uom</label>
                <div className="fw-light text-gray-800">
                  {materialData?.uom_default.name}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <UomTableLayout />

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
            to={`/inventory/masterdata/materials/editmaterial/${materialId}`}
            className="btn btn-primary border border-primary px-16 py-3"
          >
            Ubah
          </Link>
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
          message="Material gagal dihapus."
        />
      )}

      {isModalVisible && (
        <ConfirmModal
          handleSubmit={handleConfirm}
          closeModal={handleCloseModal}
          headTitle="Ubah Material"
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
          message="Material gagal diubah."
        />
      )}
    </>
  );
};

export default DetailMaterials;
