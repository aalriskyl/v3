import { FC, useEffect, useState } from "react";
import { PageTitle, PageLink } from "@metronic/layout/core";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteSuccessModal } from "@metronic/layout/components/form/organism/DeleteModal";
import {
  getEntryStockById,
  updateStatusEntryStock,
  updateStatusEntryStockApprove,
} from "../../core/_request";
import StockSectionLayout from "../../components/template/StockSectionLayout";
import { ApprovedConfirmationModal } from "@metronic/layout/components/form/organism/ApprovedModal";
import { SubmitConfirmationModal } from "@metronic/layout/components/form/organism/SubmitModal";
import { UserTwoStepsCell } from "../../../../../pengajuan/stock-management/entry-stock/components/organisms/table/columns/UserTwoStepsCell";
import { formatDateToMonthYear } from "../../../../../../../helper/formatDate";
//
const DetailEntryStock: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [entryStockData, setEntryStockData] = useState<any>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showApproveModal, setApproveModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntryStock = async () => {
      if (id) {
        try {
          const data = await getEntryStockById(id);
          console.log("Fetched Data:", data);
          setEntryStockData(data);
        } catch (error) {
          console.error("Error fetching entry stock data:", error);
        }
      }
    };
    fetchEntryStock();
  }, [id]);

  const closeModal = () => {
    setShowSuccessModal(false);
    setApproveModal(false);
  };

  // Changed this to just open the approval modal
  const handleApproveClick = () => {
    setApproveModal(true);
  };

  // This should be the actual approval logic
  const onConfirmApprove = async () => {
    if (!id) {
      console.error("ID is undefined");
      return;
    }
    try {
      await updateStatusEntryStockApprove(id);
      console.log("Entry stock approved:", id);
      closeModal();
      navigate(0);
    } catch (error) {
      console.error("Error approving entry stock:", error);
    }
  };

  if (!entryStockData) {
    return <div>Loading...</div>;
  }

  const handleBack = () => {
    navigate(-1);
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

  // Fixed button rendering logic
  const renderActionButton = () => {
    if (!entryStockData) return null;

    console.log("Current Status:", entryStockData.status);

    switch (
      entryStockData.status.toUpperCase() // Case-insensitive comparison
    ) {
      case "DRAFT":
        return (
          <button
            type="button"
            onClick={() => setShowSuccessModal(true)}
            className="btn btn-primary px-12 py-3 border border-primary"
          >
            Submit
          </button>
        );
      case "SUBMITTED":
        return (
          <button
            type="button"
            onClick={handleApproveClick}
            className="btn btn-success px-12 py-3 border border-success"
          >
            Approve
          </button>
        );
      case "APPROVED":
        return null;
      default:
        return null;
    }
  };

  return (
    <>
      <PageTitle breadcrumbs={[]}>Detail Entry Stock</PageTitle>

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
            <label className="form-label fw-bold">Requested Date</label>
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
          <div className="col-md-6 mb-2">
            <label className="form-label fw-bold">Approved Date</label>
            <div className="fw-light text-gray-800">
              {formatDate(entryStockData?.approved_date || "-")}
            </div>
          </div>
          <div className="col-md-6 mb-2">
            <label className="form-label fw-bold">Submitted by</label>
            <p className="text-lg font-medium">
              {entryStockData?.submitted_by?.name || "-"}
            </p>
          </div>
          <div className="col-md-6 mb-2">
            <label className="form-label fw-bold">Tanggal Submitted</label>
            <p className="text-lg font-medium">
              {formatDateToMonthYear(entryStockData?.submitted_date) || "-"}
            </p>
          </div>
          <div className="col-md-6 mb-2">
            <label className="form-label fw-bold">Approved By</label>
            <div className="fw-light text-gray-800">
              {entryStockData.approved_by?.name || "-"}
            </div>
          </div>
          <div className="col-md-6 mb-2">
            <label className="form-label fw-bold">Status</label>
            <div className="fw-light text-gray-800">
              <UserTwoStepsCell status={entryStockData.status} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <StockSectionLayout />
      </div>

      <div className="d-flex justify-content-end row">
        <div className="col-12 text-end my-4">
          {/* {renderActionButton()} */}
          <button
            type="button"
            onClick={handleBack}
            className="btn btn-primary px-12 py-3 border border-primary ms-3"
          >
            Kembali
          </button>
        </div>
      </div>

      {showSuccessModal && (
        <SubmitConfirmationModal
          onConfirmApproved={() => {
            console.log("Entry stock submitted");
            setShowSuccessModal(false);
          }}
          closeModal={closeModal}
        />
      )}

      {showApproveModal && (
        <ApprovedConfirmationModal
          onConfirmApproved={onConfirmApprove}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default DetailEntryStock;
