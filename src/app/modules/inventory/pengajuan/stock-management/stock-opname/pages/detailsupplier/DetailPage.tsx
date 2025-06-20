import React, { FC, Fragment, useEffect, useState } from "react";
import { PageLink, PageTitle } from "@metronic/layout/core";
import { dummyUsers } from "../../components/organisms/table/dummyUsers";
import { useParams, useNavigate } from "react-router-dom";
import { DeleteConfirmationModal } from "@metronic/layout/components/form/organism/DeleteModal";
import SuccessModal from "@metronic/layout/components/form/organism/SuccessModal";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";
import {
  ApprovedConfirmationModal,
  ApprovedSuccessModal,
} from "@metronic/layout/components/form/organism/ApprovedModal";
import {
  RejectedConfirmationModal,
  RejectedSuccessModal,
} from "@metronic/layout/components/form/organism/RejectedModal";
import { getAllMaterialByOpnameId, getSingleOpname } from "../../core/_request";
import {
  getAllMaterialByOpnameIdType,
  getSingleOpnameType,
} from "../../core/_models";
import { MaterialTable } from "../../components/organisms/table/MaterialTable";
import MaterialTableLayout from "../../components/template/MaterialTableLayout";
import { UserTwoStepsCell } from "../../components/organisms/table/columns/UserTwoStepsCell";
import { SubmitConfirmationModal } from "@metronic/layout/components/form/organism/SubmitModal";
import axiosInstance from "../../../../../../../../service/axiosInstance";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";
import InputField from "@metronic/layout/components/form/molecules/InputField";
import clsx from "clsx";
import { ListPagination } from "@metronic/layout/components/form/components/pagination/ListPagination";
import { Button } from "react-bootstrap";
import { ModalBarcodeScan } from "../../components/molecules/modals/ModalBarcodeScan";
import { Item1 } from "@metronic/partials/content/activity/Item1";
import { getErrorMessage } from "../../../../../../../helper/getErrorMessage";
import { formatDateToMonthYear } from "../../../../../../../helper/formatDate";

const breadcrumbs: Array<PageLink> = [
  { title: "Dashboard", path: "/", isSeparator: false, isActive: false },
  {
    title: "Inventory",
    path: "/inventory",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "Pengajuan",
    path: "/inventory/pengajuan/manajemen-stok",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "Stock Opname",
    path: "/inventory/pengajuan/manajemen-stok/stock-opname",
    isSeparator: false,
    isActive: false,
  },
];

const StockOpnameDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [userData, setUserData] = useState<getSingleOpnameType | null>(null);
  const [material, setMaterial] = useState<getAllMaterialByOpnameIdType>([]);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isFailedModalVisible, setIsFailedModalVisible] = useState(false);
  const [isApproveModalVisible, setIsApproveModalVisible] = useState(false);
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
  const [isApprovedSuccessModalVisible, setIsApprovedSuccessModalVisible] =
    useState(false);
  const [isRejectedSuccessModalVisible, setIsRejectedSuccessModalVisible] =
    useState(false);

  const [failedMessage, setFailedMessage] = useState<string | null>(null);

  const [isSuccessSaveAsDraft, setIsSuccessSaveAsDraft] = useState(false);

  const [isLoadData, setIsLoadData] = useState(false);

  const [changeStatus, setChangeStatus] = useState("");
  const [isChangeStatusModalVisible, setIsChangeStatusModalVisible] =
    useState(false);
  const [isChangeStatusLoading, setIsChangeStatusLoading] = useState(false);
  const [
    isChangeStatusSuccessModalVisible,
    setIsChangeStatusSuccessModalVisible,
  ] = useState(false);
  const [
    isChangeStatusFailedModalVisible,
    setIsChangeStatusFailedModalVisible,
  ] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();

  const fetchData = async () => {
    if (!id) return;
    setIsLoadData(true);
    try {
      const data = await getSingleOpname(id);
      setUserData(data);
    } finally {
      setIsLoadData(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateMaterial = async () => {
    try {
      const payload = material;
      console.log({ payload });

      const res = await axiosInstance.put(
        `/inventory/submission/stock-management/stock-opname/stock-opname-material/${id}?company_id=${localStorage.getItem(
          "company_id"
        )}`,
        { stock_opname_materials: payload }
      );
      console.log({ res });
      setIsSuccessSaveAsDraft(true);
    } catch (error) {
      setFailedMessage(
        (error as any).response?.data?.field || "Internal Server Error"
      );
    }
  };

  const formatDate = (date: string) => {
    if (!date) return "-";
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("id-ID", options).format(new Date(date));
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleDeleteAction = async () => {
    setIsDeleting(true);
    try {
      // Call API to delete the note
      await axiosInstance.delete(
        `/inventory/submission/stock-management/stock-opname/${id}?company_id=${localStorage.getItem(
          "company_id"
        )}`
      );
      setIsSuccessModalVisible(true);
    } catch (error) {
      console.error("Failed to delete:", error);
      setIsFailedModalVisible(true);
    } finally {
      setIsDeleting(false);
      setIsDeleteModalVisible(false);
    }
  };

  const handleEdit = () => {
    navigate(`/inventory/pengajuan/manajemen-stok/stock-opname/edit/${id}`);
  };

  const handleApproveConfirm = () => {
    setIsApproveModalVisible(false); // Tutup modal konfirmasi
    setIsApprovedSuccessModalVisible(true); // Buka modal keberhasilan
  };

  const handleRejectConfirm = () => {
    setIsRejectModalVisible(false); // Tutup modal konfirmasi
    setIsRejectedSuccessModalVisible(true); // Buka modal keberhasilan
  };

  const handleChangeStatusAction = async () => {
    setIsChangeStatusLoading(true);
    try {
      await axiosInstance.put(
        `/inventory/submission/stock-management/stock-opname/status/${id}?company_id=${localStorage.getItem(
          "company_id"
        )}`,
        {
          status: changeStatus,
        }
      );
      await fetchData();
      setIsChangeStatusModalVisible(false);
      setIsChangeStatusSuccessModalVisible(true);
    } catch (error) {
      setIsChangeStatusModalVisible(false);
      setFailedMessage(getErrorMessage(error));
      return;
    } finally {
      setIsChangeStatusLoading(false);
    }
  };

  // console.log({ material });
  return (
    <>
      {(isChangeStatusLoading || isDeleting || isLoadData) && <OverlayLoader />}
      <PageTitle breadcrumbs={breadcrumbs}>Detail Stock Opname</PageTitle>

      <div className="font-secondary">
        <div className="card p-5 w-100 mb-8">
          <h3 className="text-lg font-semibold mb-8">Stock Opname</h3>
          <div className="row">
            <div className="col-md-6">
              <div>
                <label className="form-label">Warehouse</label>
                <p className="text-lg font-medium">
                  {userData?.warehouse.name || "-"}
                </p>
              </div>
              <div>
                <label className="form-label">Request By</label>
                <p className="text-lg font-medium">
                  {userData?.requested_by.name || "-"}
                </p>
              </div>
              <div>
                <label className="form-label fw-bold">Submitted by</label>
                <p className="text-lg font-medium">
                  {userData?.submitted_by?.name || "-"}
                </p>
              </div>
              <div>
                <label className="form-label">Approved By</label>
                <p className="text-lg font-medium">
                  {userData?.approved_by?.name || "-"}
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div>
                <label className="form-label">Doc Type</label>
                <p className="text-lg font-medium">
                  {userData?.doc_type || "-"}
                </p>
              </div>
              <div>
                <label className="form-label fw-bold">Tanggal Submitted</label>
                <p className="text-lg font-medium">
                  {formatDateToMonthYear(userData?.submitted_date) || "-"}
                </p>
              </div>
              <div>
                <label className="form-label">Tanggal Approved</label>
                <p className="text-lg font-medium">
                  {formatDate(userData?.approved_date || "")}
                </p>
              </div>
              {/* <div>
                <label className="form-label">Tanggal Posting</label>
                <p className="text-lg font-medium">
                  {formatDate(userData?.posting_date || "-")}
                </p>
              </div> */}
              <div>
                <p className="form-label">Status</p>
                <UserTwoStepsCell status={userData?.status} />
              </div>
            </div>
            <div className="col-md-12">
              <div>
                <label className="form-label">Catatan</label>
                <p className="text-lg font-medium">
                  {userData?.remarks || "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
        {id && (
          <ListMaterialOpname
            opnameId={id}
            status={userData?.status || ""}
            setMaterial={setMaterial}
          />
        )}
        <div className="d-flex justify-content-end row">
          <div className="col-12 text-end my-4">
            <button
              type="button"
              onClick={handleBack}
              className="btn px-12 py-3 border border-gray-500 me-2"
            >
              Batal
            </button>
            {userData?.status === "Draft" && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setIsDeleteModalVisible(true);
                  }}
                  className="btn px-12 py-3 border border-gray-500 me-2"
                >
                  Hapus
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    setIsLoadData(true);
                    await updateMaterial();
                    setIsLoadData(false);
                  }}
                  className="btn btn-primary px-12 py-3 border border-primary me-8"
                >
                  Save as Draft
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsChangeStatusModalVisible(true);
                    setChangeStatus("Submitted");
                  }}
                  className="btn px-12 py-3 border border-gray-500 me-2"
                >
                  Submitted
                </button>
              </>
            )}
            {userData?.status === "Submitted" && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setIsChangeStatusModalVisible(true);
                    setChangeStatus("Rejected");
                  }}
                  className="btn btn-danger px-12 py-3 border border-gray-500 me-2"
                >
                  Rejected
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsChangeStatusModalVisible(true);
                    setChangeStatus("Approved");
                  }}
                  className="btn btn-success px-12 py-3 border border-gray-500 me-2"
                >
                  Approved
                </button>
              </>
            )}
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
        {isSuccessModalVisible && (
          <SuccessModal
            title="Berhasil"
            successMessage="Data telah berhasil dihapus!"
            closeModal={() => {
              setIsSuccessModalVisible(false);
              navigate("../");
            }}
          />
        )}
        {isSuccessSaveAsDraft && (
          <SuccessModal
            title="Berhasil"
            successMessage="Data berhasil di simpan"
            closeModal={() => {
              setIsSuccessSaveAsDraft(false);
            }}
          />
        )}
        {isFailedModalVisible && (
          <FailedModal
            title="Gagal"
            message="Terjadi kesalahan saat menghapus data."
            closeModal={() => setIsFailedModalVisible(false)}
          />
        )}
        {isApproveModalVisible && (
          <ApprovedConfirmationModal
            onConfirmApproved={handleApproveConfirm}
            closeModal={() => setIsApproveModalVisible(false)}
          />
        )}
        {isRejectModalVisible && (
          <RejectedConfirmationModal
            onConfirmRejected={handleRejectConfirm}
            closeModal={() => setIsRejectModalVisible(false)}
          />
        )}
        {isApprovedSuccessModalVisible && (
          <ApprovedSuccessModal
            title="Berhasil"
            message="Stock Opname berhasil diaprrove"
            closeModal={() => setIsApprovedSuccessModalVisible(false)}
          />
        )}
        {isRejectedSuccessModalVisible && (
          <RejectedSuccessModal
            title="Berhasil"
            message="Stock Opname berhasil di reject"
            closeModal={() => setIsRejectedSuccessModalVisible(false)}
          />
        )}
        {/* ==== Change Status Modal ==== */}
        {isChangeStatusSuccessModalVisible && (
          <SuccessModal
            title="Berhasil"
            successMessage={`Stock Opname berhasil di${changeStatus.toLowerCase()}`}
            closeModal={() => setIsChangeStatusSuccessModalVisible(false)}
          />
        )}
        {isChangeStatusModalVisible && (
          <SubmitConfirmationModal
            title={`Yakin ${changeStatus}?`}
            confirmLabel={changeStatus}
            onConfirmApproved={async () => {
              try {
                setIsChangeStatusLoading(true);
                if (changeStatus === "Submitted") {
                  await updateMaterial();
                }
                handleChangeStatusAction();
              } catch (error) {}
            }}
            closeModal={() => setIsChangeStatusModalVisible(false)}
          />
        )}
        {failedMessage && (
          <FailedModal
            title="Gagal"
            message={
              failedMessage || "Terjadi kesalahan saat mengupdate status"
            }
            closeModal={() => {
              setIsChangeStatusModalVisible(false);
              setFailedMessage(null);
            }}
          />
        )}
      </div>
    </>
  );
};

export default StockOpnameDetail;

const ListMaterialOpname = ({
  opnameId,
  status,
  setMaterial,
}: {
  opnameId: string;
  status: string;
  setMaterial: React.Dispatch<
    React.SetStateAction<getAllMaterialByOpnameIdType>
  >;
}) => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isUpdatingError, setIsUpdatingError] = useState<string | null>(null);
  const [isUpdatingSuccess, setIsUpdatingSuccess] = useState<boolean>(false);
  const [pagination, setPagination] = useState<number>(1);
  const pageSize = 10;

  const [search, setSearch] = useState<string>("");

  const [materialData, setMaterialData] =
    useState<getAllMaterialByOpnameIdType>([]);

  const fetchMaterialData = async () => {
    if (!opnameId) return;
    getAllMaterialByOpnameId(opnameId).then((data) => {
      if (!data) return;
      setMaterialData(data);
    });
  };

  // const updateMaterial = async () => {
  //   setIsUpdating(true);
  //   try {
  //     const payload = materialData
  //       .map((item) =>
  //         item.data.map((item2) => ({
  //           id: item2.id,
  //           material_id: item2.material_id,
  //           material_uom_id: item2.material_uom.id,
  //           amount: parseInt(item2.amount.toString()),
  //           remarks: item2.remarks,
  //         }))
  //       )
  //       .flat();
  //     console.log({ payload });
  //     const res = await axiosInstance.put(
  //       `/inventory/submission/stock-management/stock-opname/stock-opname-material/${opnameId}?company_id=233b117c-1d96-4f4d-8289-6a6691088af6`,
  //       { stock_opname_materials: payload }
  //     );
  //     console.log({ res });
  //     setIsUpdatingSuccess(true);
  //   } catch (error) {
  //     setIsUpdatingError(
  //       (error as any).response?.data?.field || "Internal Server Error"
  //     );
  //   } finally {
  //     setIsUpdating(false);
  //   }
  // };

  useEffect(() => {
    fetchMaterialData();
  }, []);

  console.log({ pagination });

  const paginatedData = materialData
    .slice((pagination - 1) * pageSize, pagination * pageSize)
    .sort((a, b) => a.material.name.localeCompare(b.material.name));

  const searchData = materialData
    .filter((item) =>
      search.length > 0
        ? item.material.name.toLowerCase().includes(search.toLowerCase())
        : true
    )
    .slice((pagination - 1) * pageSize, pagination * pageSize)
    .sort((a, b) => a.material.name.localeCompare(b.material.name));

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    setMaterial(materialData);
  }, [materialData]);

  const isDraft = status === "Draft";

  return (
    <>
      {isUpdating && <OverlayLoader />}
      <div className="card p-5 w-100">
        <div className="row g-2">
          <h3 className="mb-6">Material</h3>
          <div>
            <Button variant="primary" onClick={toggleModal}>
              Tambah Jumlah Material
            </Button>
          </div>

          <ModalBarcodeScan
            show={showModal}
            handleClose={toggleModal}
            datamaterial={materialData}
            setMaterial={setMaterialData}
          />
          <div className="my-2">
            <input
              type="text"
              placeholder="Search Material"
              className={clsx("form-control py-4")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {(search.length > 0 ? searchData : paginatedData).map(
            (material, mIndex) => (
              <div className="row g-2" key={mIndex}>
                <div className="col-md-2 d-flex">
                  <div className="col-md-1 pe-10 pt-1">
                    <p style={{ whiteSpace: "nowrap" }}>
                      {pagination * 10 + (mIndex + 1) - 10}
                    </p>
                  </div>
                  <div>
                    <label className="form-label">Material</label>
                    <p>{material.material.name}</p>
                  </div>
                </div>

                <div className="col-md-10 d-flex flex-column align-items-center">
                  {material.stock_opname_uoms.length > 0 ? (
                    material.stock_opname_uoms.map((uomData, uIndex) => (
                      <div key={uIndex} className="row">
                        <div className={isDraft ? "col-md-2" : "col-md-2"}>
                          <label className="form-label">UOM</label>
                          <p>{uomData.material_uom.uom_actual.name}</p>
                        </div>
                        <div className={isDraft ? "col-md-3" : "col-md-3"}>
                          <label className="form-label">Stock Aktual</label>
                          <input
                            type="number"
                            disabled={status !== "Draft"}
                            value={uomData.amount}
                            onChange={(e) => {
                              setMaterialData((prev) =>
                                prev.map((item) => {
                                  if (item.id === material.id) {
                                    return {
                                      ...item,
                                      total_stock_actual:
                                        item.stock_opname_uoms.reduce(
                                          (acc, uItem) =>
                                            acc +
                                            uItem.material_uom.conversion *
                                              (uItem.id === uomData.id
                                                ? parseFloat(e.target.value)
                                                : uItem.amount),
                                          0
                                        ),
                                      stock_opname_uoms:
                                        item.stock_opname_uoms.map((item2) => {
                                          if (item2.id === uomData.id) {
                                            return {
                                              ...item2,
                                              amount: parseFloat(
                                                e.target.value
                                              ),
                                            };
                                          }
                                          return item2;
                                        }),
                                    };
                                  }
                                  return item;
                                })
                              );
                            }}
                            className={clsx("form-control py-4")}
                          />
                        </div>
                        <div className={isDraft ? "col-md-3" : "col-md-2"}>
                          <label className="form-label">
                            Total stok dalam uom terkecil
                          </label>
                          <input
                            type="number"
                            disabled
                            value={material.total_stock_actual}
                            className={clsx(
                              "form-control py-4 bg-",
                              material.total_stock_actual !== 0 &&
                                material.stock_book !== 0 &&
                                material.total_stock_actual -
                                  material.stock_book ===
                                  0 &&
                                "bg-success text-white"
                            )}
                          />
                        </div>
                        {status !== "Draft" && (
                          <div className={"col-md-2"}>
                            <label className="form-label">Stock Buku</label>
                            <input
                              type="number"
                              disabled
                              value={material.stock_book}
                              className={clsx(
                                "form-control py-4 bg-",
                                material.total_stock_actual !== 0 &&
                                  material.stock_book !== 0 &&
                                  material.total_stock_actual -
                                    material.stock_book ===
                                    0 &&
                                  "bg-success text-white"
                              )}
                            />
                          </div>
                        )}
                        <div className={isDraft ? "col-md-4" : "col-md-3"}>
                          <label className="form-label">Catatan</label>
                          <textarea
                            value={uomData.remarks}
                            disabled={status !== "Draft"}
                            onChange={(e) => {
                              setMaterialData((prev) =>
                                prev.map((item) => {
                                  if (item.id === material.id) {
                                    return {
                                      ...item,
                                      stock_opname_uoms:
                                        item.stock_opname_uoms.map((item2) => {
                                          if (item2.id === uomData.id) {
                                            return {
                                              ...item2,
                                              remarks: e.target.value,
                                            };
                                          }
                                          return item2;
                                        }),
                                    };
                                  }
                                  return item;
                                })
                              );
                            }}
                            className={clsx("form-control py-4")}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="d-flex items-center col-md-12 my-auto">
                      <p className="text-danger">
                        Harap tambahkan UOM material {material.material.name}{" "}
                        terlebih dahulu.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )
          )}
        </div>
        <ListPagination
          currentPage={pagination}
          total={search.length > 0 ? searchData.length : materialData.length}
          onPageChange={(page) => {
            setPagination(page);
          }}
          pageSize={pageSize}
        />
        {/* 
        {status === "Draft" && (
          <Button
            onClick={!isUpdating ? updateMaterial : () => {}}
            className="btn-primary mt-4"
          >
            Update
          </Button>
        )} */}
      </div>
      {isUpdatingError && (
        <FailedModal
          closeModal={() => setIsUpdatingError(null)}
          message={isUpdatingError || "Gagal Update Material"}
        />
      )}
      {isUpdatingSuccess && (
        <SuccessModal
          closeModal={() => setIsUpdatingSuccess(false)}
          successMessage={"Berhasil Update Material"}
        />
      )}
    </>
  );
};
