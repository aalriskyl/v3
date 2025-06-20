import { FC, useState, useEffect } from "react";
import axiosInstance from "../../../../../../../service/axiosInstance"; // Sesuaikan path
import { PageTitle, PageLink } from "@metronic/layout/core";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  DeleteConfirmationModal,
  DeleteSuccessModal,
} from "@metronic/layout/components/form/organism/DeleteModal";
import ImageHolder from "@metronic/layout/components/form/molecules/ImageHolder";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";
import { UserActionsCell } from "../../components/organism/table/columns/UserActionsCell";
import { UserTwoStepsCell } from "../../components/organism/table/columns/UserTwoStepsCell";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";
const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

const DetailKaryawan: FC = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [employee, setEmployee] = useState<any>(null); // State untuk menyimpan data karyawan
  const [isLoading, setIsLoading] = useState(true); // State untuk menangani loading
  const { id } = useParams<{ id: string }>(); // Ambil ID dari URL
  const baseUrl = API_BASE_URL;
  const [isFailed, setIsFailed] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const formatDate = (date: string) => {
    if (!date) return "-";
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("id-ID", options).format(new Date(date));
  };
  // Fetch data dari API
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axiosInstance.get(
          `/hr/master-data/employee/${id}`
        );
        setEmployee(response.data.data); // Simpan data ke state
        console.log("res", response.data.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      } finally {
        setIsLoading(false); // Set loading ke false setelah data selesai diambil
      }
    };

    fetchEmployeeData();
  }, [id]);

  // Breadcrumbs
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
      isActive: true,
    },
    {
      title: "Master Data",
      path: "/hr/masterdata/",
      isSeparator: false,
      isActive: true,
    },
    {
      title: "Pegawai",
      path: "/hr/masterdata/pegawai",
      isSeparator: false,
      isActive: false,
    },
  ];

  const handleDeleteClick = () => setShowConfirmModal(true);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await axiosInstance.delete(`/hr/master-data/employee/${id}`);
      setShowSuccessModal(true);
      setShowConfirmModal(false); // Close the confirmation modal
    } catch (error) {
      console.error("Error deleting employee:", error);
      setIsFailed(true);
      setShowConfirmModal(false); // Close the confirmation modal on error too
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setShowConfirmModal(false);
    setShowSuccessModal(false);
    setIsFailed(false);
  };
  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    navigate("../"); // Navigate after successful deletion
  };
  if (isLoading) {
    return <OverlayLoader />;
  }

  // Jika data tidak ditemukan, tampilkan pesan error
  if (!employee) {
    return <div>Data Pegawai tidak ditemukan.</div>;
  }

  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Detail Pegawai</PageTitle>
      <div className="container p-5 font-secondary">
        {/* Data Diri Section */}
        <div className="card p-5 w-100 mb-4">
          <h4>Data Diri</h4>
          <div className="row g-2 mt-4">
            <span>Foto Diri</span>
            <div className="mb-4 me-4 col-md-6">
              <ImageHolder
                imageUrl={`${baseUrl}/${employee?.photo}`}
                altText={`Logo ${employee.name}`}
                className=""
                placeholder="No image available"
              />
            </div>
            <div className="col-md-4">
              <div className="d-flex col-md-12 flex-column gap-4">
                {/* Single Column Layout */}
                <div>
                  <label className="form-label fw-bold">Nama Lengkap</label>
                  <p className="text-lg font-medium">{employee.name}</p>
                </div>

                <div>
                  <label className="form-label fw-bold">Jenis Kelamin</label>
                  <p className="text-lg font-medium">
                    {employee.gender === "male" ? "Laki-Laki" : "Perempuan"}
                  </p>
                </div>

                <div>
                  <label className="form-label fw-bold">Tanggal Lahir</label>
                  <p className="text-lg font-medium">
                    {formatDate(employee?.birth_date)}
                  </p>
                </div>

                <div>
                  <label className="form-label fw-bold">Email</label>
                  <p className="text-lg font-medium">{employee.email}</p>
                </div>

                <div>
                  <label className="form-label fw-bold">
                    Status Pernikahan
                  </label>
                  <p className="text-lg font-medium">
                    {employee.marital_status}
                  </p>
                </div>

                <div>
                  <label className="form-label fw-bold">Nomor Telepon</label>
                  <p className="text-lg font-medium">{employee.phone}</p>
                </div>

                <div>
                  <label className="form-label fw-bold">Alamat Domisili</label>
                  <p className="text-lg font-medium">
                    {employee.address_domicile}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information Below */}
          <div className="row g-6 mt-4">
            <div className="text-lg font-medium">
              <label className="form-label fw-bold">Agama</label>
              <p className="text-lg font-medium">{employee.religion}</p>
            </div>

            <div className="text-lg font-medium">
              <label className="form-label fw-bold">Pendidikan Terakhir</label>
              <p className="text-lg font-medium">{employee.last_education}</p>
            </div>

            <div className="col-md-12 mt-4">
              <label className="form-label fw-bold">Alamat KTP</label>
              <p className="text-lg font-medium">{employee.address_ktp}</p>
            </div>
          </div>
        </div>

        {/* Kepegawaian Section */}
        <div className="card p-5 w-100 mb-4">
          <h4>Kepegawaian</h4>
          <div className="row g-6 mt-2">
            <div className="col-md-6">
              <div>
                <label className="form-label fw-bold">Jenis Kontrak</label>
                <p className="text-lg font-medium">{employee.contract_type}</p>
              </div>
              <div>
                <label className="form-label fw-bold">Bank</label>
                <p className="text-lg font-medium">{employee.bank}</p>
              </div>
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold">Status Pegawai</label>
              <p className="text-lg font-medium">
                <UserTwoStepsCell status={employee?.status} />
              </p>
              <label className="form-label fw-bold">Nomor Rekening</label>
              <p className="fw-light">{employee.no_bank}</p>
            </div>
          </div>
        </div>

        {/* Riwayat Perusahaan Section */}
        <div className="card p-5 w-100 mb-4">
          <h4>Perusahaan</h4>
          {employee.company_employees.map((company: any, index: number) => (
            <div key={index} className="mt-4">
              <div className="row g-4 align-items-center">
                {/* Index Number Column */}
                <div
                  className="d-flex col"
                  style={{ width: "30px", maxWidth: "42px" }}
                >
                  <p className="text-lg font-medium">{index + 1}.</p>
                </div>

                {/* Company Details Columns */}
                <div className="col-md-4">
                  <label className="form-label fw-bold">Perusahaan</label>
                  <p className="text-lg font-medium">{company.company?.name}</p>
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-bold">Jabatan</label>
                  <p className="text-lg font-medium">
                    {company.position?.name}
                  </p>
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-bold">
                    Tanggal Bergabung
                  </label>
                  <p className="text-lg font-medium">
                    {formatDate(company?.date)}
                  </p>
                </div>
              </div>
              {index < employee.company_employees.length - 1 && (
                <hr className="my-4" />
              )}
            </div>
          ))}
        </div>

        {/* Kontak Darurat Section */}
        <div className="card p-5 w-100 mb-4">
          <h4>Kontak Darurat</h4>
          <div className="row g-6 mt-4">
            <div className="col-md-6">
              <label className="form-label fw-bold">Nama Kontak Darurat</label>
              <p className="text-lg font-medium">
                {employee.name_emergency_phone}
              </p>

              <label className="form-label fw-bold mt-4">
                Nomor Telepon Darurat
              </label>
              <p className="text-lg font-medium">{employee.emergency_phone}</p>
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold">Hubungan</label>
              <p className="text-lg font-medium">
                {employee.relationship_emergency_phone}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="row">
          <div className="col-12 text-end my-4">
            <Link
              to="../"
              className="btn px-12 py-3 border border-gray-500 me-2"
            >
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
      </div>
      {showConfirmModal && (
        <DeleteConfirmationModal
          closeModal={closeModal}
          onConfirmDelete={handleDelete}
        />
      )}

      {showSuccessModal && (
        <DeleteSuccessModal closeModal={handleSuccessModalClose} />
      )}

      {isFailed && (
        <FailedModal closeModal={closeModal} message={errorMessage} />
      )}
    </>
  );
};

export default DetailKaryawan;
