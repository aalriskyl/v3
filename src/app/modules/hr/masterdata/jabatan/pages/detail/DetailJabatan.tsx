import { FC, useState, useEffect } from "react";
import { PageTitle, PageLink } from "@metronic/layout/core";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  DeleteConfirmationModal,
  DeleteSuccessModal,
} from "@metronic/layout/components/form/organism/DeleteModal";
import Dropdown from "/media/logos/Dropdown.svg?url";
import { dummyData } from "../../components/organism/table/dummyData";
import axiosInstancePar from "../../../../../../../service/axiosInstanceNoCompany";
import { DetailView } from "../../core/_models";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";
import SuccessModal from "@metronic/layout/components/form/organism/SuccessModal";
import { getErrorMessage } from "../../../../../../helper/getErrorMessage";
import axiosInstance from "../../../../../../../service/axiosInstance";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";
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

const DetailJabatan: FC = () => {
  const navigate = useNavigate();

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isDeleteSuccessModalVisible, setIsDeleteSuccessModalVisible] =
    useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [failedMessage, setFailedMessage] = useState<string | null>(null);

  const [data, setData] = useState<DetailView | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  const getData = async (id?: string) => {
    if (!id) return;
    try {
      setIsLoading(true);
      const res = await axiosInstance.get(`/hr/master-data/position/${id}`);
      const data = res.data.data;
      console.log({ getData: data });
      setData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData(id);
  }, [id]);

  const [isAksesClose, setIsAksesClose] = useState(false);
  const [isSalesOpen, setIsSalesOpen] = useState<number>(-1);
  const [isPengajuanOpen, setIsPengajuanOpen] = useState<number>(-1);
  const [isLaporanOpen, setIsLaporanOpen] = useState(false);

  const handleDeleteAction = async () => {
    setIsLoading(true);
    try {
      await axiosInstance.delete(`/hr/master-data/position/${id}`);
      setIsDeleteSuccessModalVisible(true);
    } catch (error) {
      setFailedMessage(getErrorMessage(error));
    } finally {
      setIsLoading(false);
      setIsDeleteModalVisible(false);
    }
  };

  return (
    <>
      {isLoading && <OverlayLoader />}
      <PageTitle breadcrumbs={breadcrumbs}>Detail Jabatan</PageTitle>

      <div className="container card p-5 font-secondar mb-8">
        <h4 className="mb-6">Jabatan</h4>
        <div className="row">
          {/* Kolom Kiri */}
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label fw-bold">Nama Jabatan</label>
              <div className="fw-light text-gray-800">{data?.name || "-"}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Akses */}
      <div className="card p-5 w-100">
        {/* Bagian Akses (Selalu Terbuka) */}
        <div className="d-flex align-items-center justify-content-between w-100 border-0 bg-transparent p-2">
          <button
            className="d-flex align-items-center justify-content-between w-100 border-0 bg-transparent p-2"
            onClick={() => setIsAksesClose(!isAksesClose)}
          >
            <div className="d-flex align-items-center">
              <h5>Akses</h5>
            </div>
            <img
              src={Dropdown}
              alt="Dropdown"
              className="h-5px me-2"
              style={{
                transform: isAksesClose ? "rotate(0deg)" : "rotate(180deg)",
                transition: "transform 0.2s ease",
              }}
            />
          </button>
        </div>

        {!isAksesClose && (
          <div className="card p-5 w-100">
            {/* Konten Akses (Selalu Ditampilkan) */}
            {data?.permissions.map((module, index) => (
              <div key={index} className="ml-4">
                <button
                  className="d-flex align-items-center justify-content-between w-100 border-0 bg-transparent p-2"
                  onClick={() => {
                    setIsSalesOpen((prev) => (prev === index ? -1 : index));
                    setIsPengajuanOpen(-1);
                  }}
                >
                  <div className="d-flex align-items-center">
                    <h5>{module.name}</h5>
                  </div>
                  <img
                    src={Dropdown}
                    alt="Dropdown"
                    className="h-5px me-2"
                    style={{
                      transform:
                        isSalesOpen === index
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      transition: "transform 0.2s ease",
                    }}
                  />
                </button>

                {isSalesOpen === index && (
                  <div>
                    {module.submodules.map((subMod, sIndex) => (
                      <div key={sIndex} className="card p-5 w-100 mb-4">
                        <button
                          type="button"
                          className="d-flex align-items-center justify-content-between w-100 border-0 bg-transparent p-2"
                          onClick={() =>
                            setIsPengajuanOpen((prev) =>
                              prev === sIndex ? -1 : sIndex
                            )
                          }
                        >
                          <div className="d-flex align-items-center">
                            <h5>{subMod?.name || "-"}</h5>
                          </div>
                          <img
                            src={Dropdown}
                            alt="Dropdown"
                            className="h-5px me-2"
                            style={{
                              transform:
                                isPengajuanOpen === sIndex
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",
                              transition: "transform 0.2s ease",
                            }}
                          />
                        </button>

                        {isPengajuanOpen === sIndex && (
                          <div className="col-md-12">
                            {subMod.submodules.map((subSubMod, ssIndex) => (
                              <div key={ssIndex} className="row">
                                <div className="col-md-2">
                                  <div className="text-left px-2 py-3">
                                    {subSubMod?.name || "-"}
                                  </div>
                                </div>
                                {[
                                  { label: "View", value: "view" },
                                  { label: "Create", value: "create" },
                                  { label: "Edit", value: "update" },
                                  { label: "Delete", value: "delete" },
                                  { label: "Approved", value: "approve" },
                                ].map((perm, pIndex) => (
                                  <div key={pIndex} className="col-md-2">
                                    <div className="form-check form-check-inline py-2">
                                      <label className="form-label">
                                        {perm.label}
                                      </label>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={
                                          subSubMod.permission[
                                            perm.value as
                                              | "view"
                                              | "create"
                                              | "update"
                                              | "delete"
                                              | "approve"
                                          ]
                                        }
                                        // onChange={(e) =>
                                        //   handleChange(
                                        //     subSubMod.id,
                                        //     perm.value as any,
                                        //     e.target.checked
                                        //   )
                                        // }
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
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
            onClick={() => setIsDeleteModalVisible(true)}
          >
            Hapus
          </button>
          <Link
            to={`../edit/${1}`}
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
          message="Data akan terhapus dan tidak bisa dikembalikan"
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
          title="Gagal"
          message={failedMessage}
          closeModal={() => setFailedMessage(null)}
        />
      )}
    </>
  );
};

export default DetailJabatan;
