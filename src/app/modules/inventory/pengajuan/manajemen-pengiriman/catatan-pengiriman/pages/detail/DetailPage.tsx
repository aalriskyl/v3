/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useState } from "react";
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
import MaterialTableLayoutDetail from "../../components/template/MaterialTableLayoutDetail";
import { MaterialManajemenPengeriman } from "../../components/template/RefactoredForm";
import { getSinglePengiriman } from "../../core/_request";
import { SubmitConfirmationModal } from "@metronic/layout/components/form/organism/SubmitModal";
import axiosInstance from "../../../../../../../../service/axiosInstance";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";
import { UserTwoStepsCell } from "../../components/organisms/table/columns/UserTwoStepsCell";
import { formatDateToMonthYear } from "../../../../../../../helper/formatDate";
import { getErrorMessage } from "../../../../../../../helper/getErrorMessage";

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
    title: "Pengajuan",
    path: "/inventory/pengajuan",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "Manajemen Pengiriman",
    path: "/inventory/pengajuan/manajemen-pengiriman",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "Catatan Pengiriman",
    path: "/inventory/pengajuan/manajemen-pengiriman/catatan-pengiriman",
    isSeparator: false,
    isActive: false,
  },
];

const DetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [userData, setUserData] = useState<any>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isDeleteSuccessModalVisible, setIsDeleteSuccessModalVisible] =
    useState(false);

  const [failedMessage, setFailedMessage] = useState<null | string>(null);

  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isFailedModalVisible, setIsFailedModalVisible] = useState(false);
  const [isApproveModalVisible, setIsApproveModalVisible] = useState(false);
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
  const [isApprovedSuccessModalVisible, setIsApprovedSuccessModalVisible] =
    useState(false);
  const [isRejectedSuccessModalVisible, setIsRejectedSuccessModalVisible] =
    useState(false);

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
  const [isChangeStatusFailedMessage, setIsChangeStatusFailedMessage] =
    useState<null | string>(null);

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState<boolean>(false); // State for modal visibility
  const [material, setMaterial] = useState<MaterialManajemenPengeriman[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const response = await getSinglePengiriman(id);
      setUserData(response.data);
    } finally {
      setIsLoading(false);
      setIsLoadData(false);
    }
  };
  useEffect(() => {
    // Show the modal if paymentTerms is empty
    if (userData?.warehouse === null) {
      setShowModal(true);
    } else {
      setShowModal(false); // Hide modal if payment terms are available
    }
  }, [userData]);

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (date: string) => {
    if (!date) return "-";
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("id-ID", options).format(new Date(date));
  };

  useEffect(() => {
    if (id) {
      const user = dummyUsers.find((u) => String(u.id) === id);
      setUserData(user || null);
    }
  }, [id]);

  const handleBack = () => {
    navigate("../");
  };

  const handleDeleteAction = async () => {
    setIsLoading(true);
    try {
      await axiosInstance.delete(
        `/inventory/submission/delivery-management/delivery-note/${id}`
      );
      setIsDeleteSuccessModalVisible(true);
    } catch (error) {
      setFailedMessage(getErrorMessage(error));
    } finally {
      setIsLoading(false);
      setIsDeleteModalVisible(false);
    }
  };

  const handleEdit = () => {
    navigate(
      `/inventory/pengajuan/manajemen-pengiriman/catatan-pengiriman/edit/${id}`
    );
  };

  const handleApproveConfirm = () => {
    setIsApproveModalVisible(false); // Tutup modal konfirmasi
    setIsApprovedSuccessModalVisible(true); // Buka modal keberhasilan
  };

  const handleRejectConfirm = () => {
    setIsRejectModalVisible(false); // Tutup modal konfirmasi
    setIsRejectedSuccessModalVisible(true); // Buka modal keberhasilan //
  };

  const handleChangeStatusAction = async () => {
    setIsChangeStatusLoading(true);
    try {
      await axiosInstance.put(
        `/inventory/submission/delivery-management/delivery-note/status/${id}`,
        {
          status: changeStatus,
        }
      );
      await fetchData();
      setIsChangeStatusModalVisible(false);
      setIsChangeStatusSuccessModalVisible(true);
    } catch (error) {
      setIsChangeStatusFailedModalVisible(true);
      console.log({ error });
      if ((error as any).response.data.field) {
        setIsChangeStatusFailedMessage((error as any).response.data.field);
      } else {
        setIsChangeStatusFailedMessage(null);
      }
      return;
    } finally {
      setIsChangeStatusLoading(false);
    }
  };

  return (
    <>
      {(isChangeStatusLoading || isLoading) && <OverlayLoader />}
      <PageTitle breadcrumbs={breadcrumbs}>Detail Catatan Pengiriman</PageTitle>
      {isLoading && <OverlayLoader />}
      <div className="font-secondary">
        <div className="card p-5 w-100 mb-8">
          <h3 className="mb-6">Catatan Pengiriman</h3>
          <div className="row">
            <div className="col-md-6">
              <div>
                <label className="form-label fw-bold">
                  Nomor Catatan Pengiriman
                </label>
                <p className="text-lg font-medium">
                  {userData?.no_delivery_note || "-"}
                </p>
              </div>
              <div>
                <label className="form-label fw-bold">
                  {userData?.type === "Outlet"
                    ? "Nomor Request Order"
                    : "Nomor Purchase Request"}
                </label>
                <p className="text-lg font-medium">
                  {userData?.type === "Outlet"
                    ? userData?.sales_order?.no_sales_order || "-"
                    : userData?.retur_purchase?.purchase_order
                        ?.no_purchase_order || "-"}
                </p>
              </div>
              <div>
                <label className="form-label fw-bold">Tipe</label>
                <p className="text-lg font-medium">{userData?.type || "-"}</p>
              </div>
              <div>
                <label className="form-label fw-bold">Gudang</label>
                <p className="text-lg font-medium">
                  {userData?.warehouse?.name || "-"}
                </p>
              </div>
              <div>
                <label className="form-label fw-bold">Tanggal Pengajuan</label>
                <p className="text-lg font-medium">
                  {formatDateToMonthYear(userData?.submitted_date)}
                </p>
              </div>
              <div>
                <label className="form-label fw-bold">Tanggal Submitted</label>
                <p className="text-lg font-medium">
                  {formatDateToMonthYear(userData?.submitted_date) || "-"}
                </p>
              </div>
              <div>
                <label className="form-label fw-bold">Tanggal Approve</label>
                <p className="text-lg font-medium">
                  {formatDateToMonthYear(userData?.approved_date)}
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div>
                <label className="form-label fw-bold">Jenis Pengiriman</label>
                <p className="text-lg font-medium">
                  {userData?.delivery_type || "-"}
                </p>
              </div>
              <div>
                <label className="form-label fw-bold">
                  {userData?.type === "Outlet" ? "Customer" : "Supplier"}
                </label>
                <p className="text-lg font-medium">
                  {userData?.type === "Outlet"
                    ? userData?.customer?.name || "-"
                    : userData?.supplier?.name || "-"}
                </p>
              </div>
              <div>
                <label className="form-label fw-bold">Requested By</label>
                <p className="text-lg font-medium">
                  {userData?.requested_by?.name || "-"}
                </p>
              </div>
              <div>
                <label className="form-label fw-bold">Submitted by</label>
                <p className="text-lg font-medium">
                  {userData?.submitted_by?.name || "-"}
                </p>
              </div>
              <div>
                <label className="form-label fw-bold">Approved By</label>
                <p className="text-lg font-medium">
                  {userData?.approved_by?.name || "-"}
                </p>
              </div>
              <div className="mb-2">
                <p className="form-label fw-bold">Status</p>
                <UserTwoStepsCell status={userData?.status} />
              </div>
              {/* <div>
                <label className="form-label fw-bold">Posting Date</label>
                <p className="text-lg font-medium">
                  {formatDate(userData?.approved_date)}
                </p>
              </div> */}
            </div>
          </div>
        </div>

        <MaterialTableLayoutDetail status={userData?.status || ""} />

        <div className="d-flex justify-content-end row">
          <div className="col-12 text-end my-4">
            <button
              type="button"
              onClick={handleBack}
              className="btn px-12 py-3 border border-gray-500 me-2"
            >
              Back
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
                  onClick={handleEdit}
                  className="btn btn-primary px-12 py-3 border border-primary me-8"
                >
                  Ubah
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

        {showModal && (
          <FailedModal
            title="Warning"
            message="Harap Tambahkan Warehouse Terlebih Dahulu"
            closeModal={() => {
              setShowModal(false);
              navigate(`../edit/${id}`);
            }}
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
            message="Catatan Pengiriman berhasil diaprrove"
            closeModal={() => setIsApprovedSuccessModalVisible(false)}
          />
        )}

        {isRejectedSuccessModalVisible && (
          <RejectedSuccessModal
            title="Berhasil"
            message="Catatan Pengiriman berhasil di reject"
            closeModal={() => setIsRejectedSuccessModalVisible(false)}
          />
        )}

        {/* ==== Change Status Modal ==== */}
        {isChangeStatusModalVisible && (
          <SubmitConfirmationModal
            title={`Yakin ${changeStatus}?`}
            confirmLabel={changeStatus}
            onConfirmApproved={() => {
              handleChangeStatusAction();
            }}
            closeModal={() => setIsChangeStatusModalVisible(false)}
          />
        )}
        {isChangeStatusFailedModalVisible && (
          <FailedModal
            title="Gagal"
            message={
              isChangeStatusFailedMessage ||
              "Terjadi kesalahan saat mengupdate status"
            }
            closeModal={() => {
              setIsChangeStatusModalVisible(false);
              setIsChangeStatusFailedModalVisible(false);
            }}
          />
        )}
      </div>
    </>
  );
};

export default DetailPage;
