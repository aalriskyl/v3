import React, { FC, useEffect, useState } from "react";
import { PageLink, PageTitle } from "@metronic/layout/core";
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
import MaterialDetailSectionLayout from "../../components/template/MaterialDetailSectionLayout";
import axiosInstance from "../../../../../../../service/axiosInstance";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";
import { UserTwoStepsCell } from "../../components/organisms/table/columns/UserTwoStepsCell";
import { getErrorMessage } from "../../../../../../helper/getErrorMessage";

const DetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isSuccessDeleteModalVisible, setIsSuccessDeleteModalVisible] =
    useState(false);
  const [isApproveModalVisible, setIsApproveModalVisible] = useState(false);
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
  const [isApprovedSuccessModalVisible, setIsApprovedSuccessModalVisible] =
    useState(false);
  const [isRejectedSuccessModalVisible, setIsRejectedSuccessModalVisible] =
    useState(false);
  const [serviceQuotation, setServiceQuotation] = useState({}) as any;
  const [serviceData, setServiceData] = useState([]);
  const [failedMessage, setFailedMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const breadcrumbs: Array<PageLink> = [
    {
      title: "Dashboard",
      path: "/",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "CRM",
      path: "/crm",
      isSeparator: false,
      isActive: true,
    },
    {
      title: "Pengajuan",
      path: "/crm/pengajuan",
      isSeparator: false,
      isActive: true,
    },
    {
      title: "Penawaran",
      path: "/crm/pengajuan/penawaran",
      isSeparator: false,
      isActive: false,
    },
  ];

  const getData = () => {
    axiosInstance
      .get(`/crm/submission/quotation/${id}`)
      .then((res) => {
        setServiceQuotation(res.data.data);
        axiosInstance
          .get(`/crm/submission/quotation/quotation-service/quotation/${id}`)
          .then((res: any) => {
            setServiceData(
              res.data.data.quotation_services.map((item: any) => ({
                id: item.id,
                service: item.service?.name || "-",
              }))
            );
          });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleBack = () => {
    navigate("../");
  };

  const handleDelete = () => {
    setIsDeleteModalVisible(true);
  };

  const handleDeleteAction = async () => {
    setIsLoading(true);
    try {
      await axiosInstance.delete(`/crm/submission/quotation/${id}`);
      setIsDeleteModalVisible(false);
      setIsSuccessDeleteModalVisible(true);
    } catch (error: any) {
      setFailedMessage(getErrorMessage(error));
    } finally {
      getData();
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(
      `/inventory/pengajuan/manajemen-pengiriman/material-request/edit/${id}`
    );
  };

  // const handleApprove = () => {
  //     setIsApproveModalVisible(true);
  // };

  const handleReject = () => {
    setIsRejectModalVisible(true);
  };

  const handleApproveConfirm = async () => {
    setIsLoading(true);
    try {
      await axiosInstance.put(`/crm/submission/quotation/status/${id}`, {
        status: "Approved",
      });
      setIsSuccessModalVisible(true);
    } catch (error: any) {
      setFailedMessage(getErrorMessage(error));
    } finally {
      getData();
      setIsLoading(false);
    }
  };

  const handleRejectConfirm = async () => {
    setIsLoading(true);
    try {
      await axiosInstance.put(`/crm/submission/quotation/status/${id}`, {
        status: "Rejected",
      });
      setIsSuccessModalVisible(true);
    } catch (error: any) {
      setFailedMessage(getErrorMessage(error));
    } finally {
      getData();
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await axiosInstance.put(`/crm/submission/quotation/status/${id}`, {
        status: "Submitted",
      });
      setIsSuccessModalVisible(true);
    } catch (error: any) {
      setFailedMessage(getErrorMessage(error));
    } finally {
      getData();
      setIsLoading(false);
    }
  };

  const formatDate = (date: string) => {
    if (!date || isNaN(new Date(date).getTime())) return "-"; // Check for invalid date
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("id-ID", options).format(new Date(date));
  };

  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Detail Penawaran</PageTitle>

      {isLoading ? (
        <OverlayLoader />
      ) : (
        <div className="font-secondary">
          <div className="card p-5 w-100 mb-8">
            <div className="row g-2">
              <h4 className="mb-4">Penawaran</h4>
              <div className="col-md-6">
                <div>
                  <label className="form-label fw-bold">Nomor Penawaran</label>
                  <p className="text-lg font-medium">
                    {serviceQuotation?.no_quotation || "-"}
                  </p>
                </div>
                <div>
                  <label className="form-label fw-bold">Customer</label>
                  <p className="text-lg font-medium">
                    {serviceQuotation?.customer?.name || "-"}
                  </p>
                </div>
                <div>
                  <label className="form-label fw-bold">
                    Tanggal Pembuatan
                  </label>
                  <p className="text-lg font-medium">
                    {formatDate(serviceQuotation?.created_at || "-")}
                  </p>
                </div>
                {serviceQuotation?.status === "Submitted" && (
                  <div>
                    <label className="form-label fw-bold">
                      Tanggal Pengajuan
                    </label>
                    <p className="text-lg font-medium">
                      {formatDate(serviceQuotation?.submitted_date || "-")}
                    </p>
                  </div>
                )}
                {serviceQuotation?.status === "Approved" && (
                  <div>
                    <label className="form-label fw-bold">
                      Tanggal Approved
                    </label>
                    <p className="text-lg font-medium">
                      {formatDate(serviceQuotation?.approved_date || "-")}
                    </p>
                  </div>
                )}
                {serviceQuotation?.status === "Rejected" && "Submitted" && (
                  <div>
                    <label className="form-label fw-bold">
                      Tanggal Pengajuan
                    </label>
                    <p className="text-lg font-medium">
                      {formatDate(serviceQuotation?.submitted_date || "-")}
                    </p>
                    <label className="form-label fw-bold">
                      Tanggal Rejected
                    </label>
                    <p className="text-lg font-medium">
                      {formatDate(serviceQuotation?.rejected_date || "-")}
                    </p>
                  </div>
                )}
                <div>
                  <label className="form-label fw-bold">Status</label>
                  <p className="text-lg font-medium">
                    <UserTwoStepsCell
                      status={serviceQuotation?.status || "-"}
                    />
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <label className="form-label fw-bold">Tipe</label>
                  <p className="text-lg font-medium">
                    {serviceQuotation?.type || "-"}
                  </p>
                </div>
                <div>
                  <label className="form-label fw-bold">Requested By</label>
                  <p className="text-lg font-medium">
                    {serviceQuotation?.requested_by?.name || "-"}
                  </p>
                </div>
                {serviceQuotation?.status === "Submitted" && (
                  <div>
                    <label className="form-label fw-bold">Submitted By</label>
                    <p className="text-lg font-medium">
                      {serviceQuotation?.submitted_by?.name || "-"}
                    </p>
                  </div>
                )}
                {serviceQuotation?.status === "Approved" && (
                  <div>
                    <label className="form-label fw-bold">Approved By</label>
                    <p className="text-lg font-medium">
                      {serviceQuotation?.approved_by?.name || "-"}
                    </p>
                  </div>
                )}
                {serviceQuotation?.status === "Rejected" && (
                  <div>
                    <label className="form-label fw-bold">Rejected By</label>
                    <p className="text-lg font-medium">
                      {serviceQuotation?.rejected_by?.name || "-"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="card p-5 w-100 mt-8">
            <h4 className="mb-8">Layanan</h4>
            <MaterialDetailSectionLayout
              supplier_id={serviceQuotation?.customer?.id}
              materialData={serviceData}
              status={serviceQuotation?.status}
            />
          </div>

          <div className="d-flex justify-content-end row">
            <div className="col-12 text-end my-4">
              <button
                type="button"
                onClick={handleBack}
                className="btn px-12 py-3 border border-gray-500 me-2"
              >
                Batal
              </button>
              {serviceQuotation?.status === "Submitted" ? (
                <>
                  <button
                    type="button"
                    onClick={handleRejectConfirm}
                    className="btn px-12 py-3 border border-gray-500 me-2"
                  >
                    Reject
                  </button>
                  <button
                    type="button"
                    onClick={handleApproveConfirm}
                    className="btn btn-primary px-12 py-3 border border-primary"
                  >
                    Approve
                  </button>
                </>
              ) : serviceQuotation?.status == "Draft" ? (
                <>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="btn px-12 py-3 border border-gray-500 me-2"
                  >
                    Hapus
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="btn btn-primary px-12 py-3 border border-primary"
                  >
                    Submit
                  </button>
                </>
              ) : (
                <></>
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
              successMessage="Data telah berhasil disubmit!"
              closeModal={() => {
                setIsSuccessModalVisible(false);
              }}
            />
          )}

          {isSuccessDeleteModalVisible && (
            <SuccessModal
              title="Berhasil"
              successMessage="Data telah berhasil di hapus!"
              closeModal={() => {
                navigate("../");
                setIsSuccessDeleteModalVisible(false);
              }}
            />
          )}

          {failedMessage && (
            <FailedModal
              closeModal={() => setFailedMessage(null)}
              message={failedMessage}
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
              message="Material Request berhasil diaprrove"
              closeModal={() => {
                setIsApprovedSuccessModalVisible(false);
                window.location.reload();
              }}
            />
          )}

          {isRejectedSuccessModalVisible && (
            <RejectedSuccessModal
              title="Berhasil"
              message="Material Request berhasil di reject"
              closeModal={() => setIsRejectedSuccessModalVisible(false)}
            />
          )}
        </div>
      )}
    </>
  );
};

export default DetailPage;
