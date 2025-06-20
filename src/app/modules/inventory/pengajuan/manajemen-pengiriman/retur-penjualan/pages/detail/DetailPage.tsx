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
import { SubmitConfirmationModal } from "@metronic/layout/components/form/organism/SubmitModal";
import axiosInstance from "../../../../../../../../service/axiosInstance";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";
import { DetailView } from "../../core/_models";
import { getErrorMessage } from "../../../../../../../helper/getErrorMessage";
import { formatDateToMonthYear } from "../../../../../../../helper/formatDate";

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
    title: "Retur Penjualan",
    path: "/inventory/pengajuan/manajemen-pengiriman/retur-penjualan",
    isSeparator: false,
    isActive: false,
  },
];

const DetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<undefined | DetailView>();

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isDeleteSuccessModalVisible, setIsDeleteSuccessModalVisible] =
    useState(false);
  const [isDeleteFailedMessage, setIsDeleteFailedMessage] = useState<
    null | string
  >(null);

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

  const [isStatusModalVisible, setIsStatusModalVisible] = useState(false);
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

  const fetchData = async () => {
    if (!id) return;
    setIsLoadData(true);
    try {
      const response = await axiosInstance.get(
        `/inventory/submission/delivery-management/retur-sales/${id}`
      );
      console.log({ getDetail: response.data.data });

      setData(response.data.data);
    } catch (error) {
      return;
    } finally {
      setIsLoadData(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleDeleteAction = async () => {
    setIsDeleteLoading(true);
    try {
      await axiosInstance.delete(
        `/inventory/submission/delivery-management/retur-sales/${id}`
      );
      setIsDeleteModalVisible(false);
      setIsDeleteSuccessModalVisible(true);
    } catch (error) {
      setIsDeleteModalVisible(false);
      setIsDeleteFailedMessage(getErrorMessage(error));
    } finally {
      setIsDeleteLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(
      `/inventory/pengajuan/manajemen-pengiriman/retur-penjualan/edit/${id}`
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
        `/inventory/submission/delivery-management/retur-sales/status/${id}`,
        {
          status: changeStatus,
        }
      );
      await fetchData();
      setIsStatusModalVisible(false);
      setIsChangeStatusSuccessModalVisible(true);
    } catch (error) {
      setIsStatusModalVisible(false);
      setIsChangeStatusFailedMessage(getErrorMessage(error));
      return;
    } finally {
      setIsChangeStatusLoading(false);
    }
  };

  return (
    <>
      {(isChangeStatusLoading || isDeleteLoading || isLoadData) && (
        <OverlayLoader />
      )}
      <PageTitle breadcrumbs={breadcrumbs}>Detail Retur Penjualan</PageTitle>

      <div className="font-secondary">
        <div className="card p-5 w-100 mb-8">
          <h3 className="mb-6">Retur Penjualan</h3>
          <div className="row">
            <div className="col-md-6">
              <div>
                <label className="form-label fw-bold">
                  Nomor Retur Penjualan
                </label>
                <p className="text-lg font-medium">
                  {data?.no_retur_sales || "-"}
                </p>
              </div>
              <div>
                <label className="form-label fw-bold">Opsi Pengembalian</label>
                <p className="text-lg font-medium">
                  {data?.retur_option || "-"}
                </p>
              </div>
              <div>
                <label className="form-label fw-bold">Requested By</label>
                <p className="text-lg font-medium">
                  {data?.requested_by?.name || "-"}
                </p>
              </div>
              <div>
                <label className="form-label fw-bold">Submitted by</label>
                <p className="text-lg font-medium">
                  {data?.submitted_by?.name || "-"}
                </p>
              </div>
              <div>
                <label className="form-label fw-bold">Approved By</label>
                <p className="text-lg font-medium">
                  {data?.approved_by?.name || "-"}
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div>
                <label className="form-label fw-bold">
                  Nomor Retur Pembelian
                </label>
                <p className="text-lg font-medium">
                  {data?.retur_purchase?.no_retur_purchase || "-"}
                </p>
              </div>
              <div>
                <label className="form-label fw-bold">Tanggal Pengajuan</label>
                <p className="text-lg font-medium">
                  {formatDateToMonthYear(data?.created_at)}
                </p>
              </div>
              <div>
                <label className="form-label fw-bold">Tanggal Submitted</label>
                <p className="text-lg font-medium">
                  {formatDateToMonthYear(data?.submitted_date) || "-"}
                </p>
              </div>
              <div>
                <label className="form-label fw-bold">Tanggal Approved</label>
                <p className="text-lg font-medium">
                  {formatDateToMonthYear(data?.approved_date)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <MaterialTableLayoutDetail status={data?.status || ""} />

        {data?.retur_option === "Dana" && (
          <div className="card p-5 w-100 mt-8">
            <h4 className="mb-8">Harga Keseluruhan</h4>
            <div className="row">
              <div className="col-md-12 align-items-center">
                <div className="g-2 mb-5 d-flex justify-content-between align-items-center">
                  <div>
                    <h4>Total Harga Barang</h4>
                  </div>
                  <h4 className="fw-bolder">
                    Rp.{formatDecimal(data?.total_price)}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="d-flex justify-content-end row">
          <div className="col-12 text-end my-4">
            <button
              type="button"
              onClick={handleBack}
              className="btn px-12 py-3 border border-gray-500 me-2"
            >
              Back
            </button>
            {data?.status === "Draft" && (
              <>
                <button
                  type="button"
                  onClick={() => setIsDeleteModalVisible(true)}
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
                    setIsStatusModalVisible(true);
                    setChangeStatus("Submitted");
                  }}
                  className="btn px-12 py-3 border border-gray-500 me-2"
                >
                  Submitted
                </button>
              </>
            )}
            {data?.status === "Submitted" && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setIsStatusModalVisible(true);
                    setChangeStatus("Rejected");
                  }}
                  className="btn btn-danger px-12 py-3 border border-gray-500 me-2"
                >
                  Rejected
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsStatusModalVisible(true);
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

        {isDeleteFailedMessage && (
          <FailedModal
            title="Gagal"
            message={isDeleteFailedMessage}
            closeModal={() => setIsDeleteFailedMessage(null)}
          />
        )}

        {isDeleteSuccessModalVisible && (
          <SuccessModal
            title="Berhasil"
            successMessage="Data telah berhasil dihapus!"
            closeModal={() => {
              setIsDeleteModalVisible(false);
              navigate("../");
            }}
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
        {isStatusModalVisible && (
          <SubmitConfirmationModal
            title={`Yakin ${changeStatus}?`}
            confirmLabel={changeStatus}
            onConfirmApproved={() => {
              handleChangeStatusAction();
            }}
            closeModal={() => setIsStatusModalVisible(false)}
          />
        )}
        {isChangeStatusSuccessModalVisible && (
          <SuccessModal
            title="Berhasil"
            successMessage={`Status berhasil di rubah ke ${changeStatus}`}
            closeModal={() => {
              setIsChangeStatusSuccessModalVisible(false);
              setChangeStatus("");
            }}
          />
        )}
        {isChangeStatusFailedMessage && (
          <FailedModal
            title="Gagal"
            message={
              isChangeStatusFailedMessage ||
              "Terjadi kesalahan saat mengupdate status"
            }
            closeModal={() => {
              setIsStatusModalVisible(false);
              setIsChangeStatusFailedMessage(null);
            }}
          />
        )}
      </div>
    </>
  );
};

export default DetailPage;

const formatDecimal = (value?: number) => {
  if (value === undefined || value === null) return "-";
  return value.toLocaleString("id-ID", {
    style: "decimal",
  });
};
