/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import { PageLink, PageTitle } from "@metronic/layout/core";
import { useNavigate, useParams } from "react-router-dom";
import {
  DeleteConfirmationModal,
  DeleteSuccessModal,
} from "@metronic/layout/components/form/organism/DeleteModal";
import {
  createEntryStock,
  createMaterialEntryStock,
  getEntryStockById,
  updateStatusEntryStock,
} from "../../core/_request";
import {
  updateStatusEntryStockApprove,
  updateStatusEntryStockReject,
  updateStatusEntryStockSubmit,
} from "../../../../../laporan/stock-management/entry-stock/core/_request";
import StockSectionLayout from "../../components/template/StockSectionLayout";
import { ApprovedConfirmationModal } from "@metronic/layout/components/form/organism/ApprovedModal";
import { SubmitConfirmationModal } from "@metronic/layout/components/form/organism/SubmitModal";
import { RejectedConfirmationModal } from "@metronic/layout/components/form/organism/RejectedModal";
import axiosInstance from "../../../../../../../../service/axiosInstance";
import { UserTwoStepsCell } from "../../components/organisms/table/columns/UserTwoStepsCell";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";
import { formatDateToMonthYear } from "../../../../../../../helper/formatDate";

const DetailEntryStock: FC = () => {
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
      title: "Pengajuan",
      path: "/inventory/pengajuan/manajemen-stok/",
      isSeparator: false,
      isActive: true,
    },
    {
      title: "Entry Stock",
      path: "/inventory/pengajuan/manajemen-stok/entry-stock",
      isSeparator: false,
      isActive: false,
    },
  ];

  const { id } = useParams<{ id: string }>();
  const [entryStockData, setEntryStockData] = useState<any>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showApproveModal, setApproveModal] = useState(false);
  const [showRejectModal, setRejectModal] = useState(false);
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [loadingApprove, setLoadingApprove] = useState(false); // Loading state for Approve
  const [loadingReject, setLoadingReject] = useState(false); // Loading state for Reject
  const [loadingDelete, setLoadingDelete] = useState(false); // Loading state for Delete
  const [loadingSubmit, setLoadingSubmit] = useState(false); // Loading state for Submit
  const [materialData, setMaterialData] = useState([]);

  const navigate = useNavigate();

  const fetchEntryStock = async () => {
    if (id) {
      try {
        const data = await getEntryStockById(id);
        setEntryStockData(data);
        console.log({ getData: data });
      } catch (error) {
        console.error("Error fetching entry stock data:", error);
      }
    }
  };

  useEffect(() => {
    fetchEntryStock();
  }, [id]);

  const closeModal = () => {
    setShowSuccessModal(false);
    setApproveModal(false);
    setRejectModal(false);
    setDeleteModal(false);
  };

  const handleApproveClick = () => {
    setApproveModal(true);
  };

  const handleRejectClick = () => {
    setRejectModal(true);
  };

  const handleDeleteClick = () => {
    setDeleteModal(true);
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

  const onConfirmApprove = async () => {
    if (!id) {
      console.error("ID is missing");
      return;
    }
    setLoadingApprove(true); // Start loading
    try {
      await updateStatusEntryStockApprove(id);
      await fetchEntryStock();
      closeModal();
    } catch (error) {
      console.error("Error submitting entry stock:", error);
    } finally {
      setLoadingApprove(false); // Stop loading
    }
  };

  const onConfirmReject = async () => {
    if (!id) {
      console.error("ID is missing");
      return;
    }
    setLoadingReject(true); // Start loading
    try {
      await updateStatusEntryStockReject(id);
      closeModal();
      await fetchEntryStock();
    } catch (error) {
      console.error("Error rejecting entry stock:", error);
    } finally {
      setLoadingReject(false); // Stop loading
    }
  };

  const onConfirmDelete = async () => {
    if (!id) {
      console.error("ID is missing");
      return;
    }
    setLoadingDelete(true); // Start loading
    try {
      await axiosInstance.delete(
        `/inventory/submission/stock-management/stock-entry/${id}`
      );
      closeModal();
      navigate("../"); // Redirect to the entry stock list page
    } catch (error) {
      console.error("Error deleting entry stock:", error);
    } finally {
      setLoadingDelete(false); // Stop loading
    }
  };

  const onConfirmSubmit = async () => {
    if (!id) {
      console.error("ID is missing");
      return;
    }
    setLoadingSubmit(true); // Start loading
    try {
      // materialData.map( async (item: any) => {
      //   const payload = {
      //     material_id: item.material.id,
      //     amount: Number(item.amount),
      //     material_uom_id: item.material_uom.uom_actual.id,
      //   };

      //   await createMaterialEntryStock(id, payload)
      // })

      await updateStatusEntryStockSubmit(id);
      await fetchEntryStock();
      closeModal();
    } catch (error) {
      console.error("Error submitting entry stock:", error);
    } finally {
      setLoadingSubmit(false); // Stop loading
    }
  };
  const onConfirmApproved = async () => {
    if (!id) {
      console.error("ID is missing");
      return;
    }
    setLoadingSubmit(true); // Start loading
  };

  if (!entryStockData) {
    return <div>Loading...</div>;
  }

  const handleBack = () => {
    navigate("../");
  };

  const renderActionButton = () => {
    if (!entryStockData) return null;

    switch (entryStockData.status.toUpperCase()) {
      case "DRAFT":
        return (
          <div className="d-flex gap-3">
            <button
              type="button"
              onClick={handleDeleteClick}
              className="btn btn-danger px-12 py-3 border border-danger"
              disabled={loadingDelete} // Disable button while loading
            >
              {loadingDelete ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                "Hapus"
              )}
            </button>
            <button
              type="button"
              onClick={() => setShowSuccessModal(true)}
              className="btn btn-primary px-12 py-3 border border-primary"
              disabled={loadingSubmit} // Disable button while loading
            >
              {loadingSubmit ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        );
      case "SUBMITTED":
        return (
          <div className="d-flex gap-3">
            <button
              type="button"
              onClick={handleRejectClick}
              className="btn btn-danger px-12 py-3 border border-danger"
              disabled={loadingReject} // Disable button while loading
            >
              {loadingReject ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                "Reject"
              )}
            </button>
            <button
              type="button"
              onClick={handleApproveClick}
              className="btn btn-success px-12 py-3 border border-success"
              disabled={loadingApprove} // Disable button while loading
            >
              {loadingApprove ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                "Approve"
              )}
            </button>
          </div>
        );
      case "APPROVED":
        return null;
      default:
        return null;
    }
  };

  return (
    <>
      {(loadingApprove || loadingDelete || loadingReject || loadingSubmit) && (
        <OverlayLoader />
      )}
      <PageTitle breadcrumbs={breadcrumbs}>Detail Entry Stock</PageTitle>

      <div className="container card p-5 font-secondary">
        <div className="row g-1">
          {/* Remarks */}
          <div className="col-md-6 mb-2">
            <label className="form-label fw-bold">Tipe Entry Stock</label>
            <div className="fw-light text-gray-800">
              {entryStockData.type || "-"}
            </div>
          </div>
          <div className="col-md-6 mb-2">
            <label className="form-label fw-bold">Gudang</label>
            <div className="fw-light text-gray-800">
              {entryStockData?.warehouse?.name || "-"}
            </div>
          </div>

          <div className="col-md-6 mb-2">
            <label className="form-label fw-bold">Catatan</label>
            <div className="fw-light text-gray-800">
              {entryStockData.remarks || "-"}
            </div>
          </div>
          <div className="col-md-6 mb-2">
            <label className="form-label fw-bold">Tanggal Pembuatan</label>
            <div className="fw-light text-gray-800">
              {formatDate(entryStockData?.submitted_date || "-")}
            </div>
          </div>
          <div className="col-md-6 mb-2">
            <label className="form-label fw-bold">Requested By</label>
            <div className="fw-light text-gray-800">
              {entryStockData.request_by?.name || "-"}
            </div>
          </div>
          {/* Approved By */}
         {entryStockData.status !== "Draft" && (
           <div className="col-md-6 mb-2">
           <label className="form-label fw-bold">Tanggal Submitted</label>
           <div className="fw-light text-gray-800">
             {formatDate(entryStockData?.submitted_date || "-")}
           </div>
         </div>
         )}
        {entryStockData.status !== "Draft" && (
            <div className="col-md-6 mb-2">
            <label className="form-label fw-bold">Submitted by</label>
            <p className="text-lg font-medium">
              {entryStockData?.submitted_by?.name || "-"}
            </p>
          </div>
        )}
         {entryStockData.status === "Approved" && (
           <div className="col-md-6 mb-2">
           <label className="form-label fw-bold">Tanggal Approved</label>
           <p className="text-lg font-medium">
             {formatDateToMonthYear(entryStockData?.approved_date) || "-"}
           </p>
         </div>
         )}
         {entryStockData.status === "Rejected" && (
           <div className="col-md-6 mb-2">
           <label className="form-label fw-bold">Tanggal Rejected</label>
           <p className="text-lg font-medium">
             {formatDateToMonthYear(entryStockData?.rejected_date) || "-"}
           </p>
         </div>
         )}
         {entryStockData.status === "Approved" && (
           <div className="col-md-6 mb-2">
           <label className="form-label fw-bold">Approved By</label>
           <div className="fw-light text-gray-800">
             {entryStockData.approved_by?.name || "-"}
           </div>
         </div>
         )}
          {entryStockData.status === "Rejected" && (
           <div className="col-md-6 mb-2">
           <label className="form-label fw-bold">Rejected By</label>
           <div className="fw-light text-gray-800">
             {entryStockData.rejected_by?.name || "-"}
           </div>
         </div>
         )}
          <div className="col-md-6 mb-2">
            <label className="form-label fw-bold">Status</label>
            <div className="fw-light text-gray-800">
              <UserTwoStepsCell status={entryStockData.status} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <StockSectionLayout
          materialData={materialData}
          setMaterialData={setMaterialData}
          status={entryStockData?.status}
        />
      </div>

      {/* Buttons aligned to the right */}
      <div className="d-flex justify-content-end mt-4 mb-4">
        <div className="d-flex gap-3">
          <button
            type="button"
            onClick={handleBack}
            className="btn btn-gray-500 px-12 py-3 border border-gray-500"
          >
            Kembali
          </button>
          {renderActionButton()}
        </div>
      </div>

      {showSuccessModal && (
        <SubmitConfirmationModal
          onConfirmApproved={onConfirmSubmit}
          closeModal={closeModal}
        />
      )}

      {showApproveModal && (
        <ApprovedConfirmationModal
          onConfirmApproved={onConfirmApprove}
          closeModal={closeModal}
        />
      )}

      {showRejectModal && (
        <RejectedConfirmationModal
          onConfirmRejected={onConfirmReject}
          closeModal={closeModal}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmationModal
          onConfirmDelete={onConfirmDelete}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default DetailEntryStock;
