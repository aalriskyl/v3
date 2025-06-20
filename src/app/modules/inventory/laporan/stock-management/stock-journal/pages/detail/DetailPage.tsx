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
import { getSinglePengiriman } from "../../../../../pengajuan/manajemen-pengiriman/catatan-pengiriman/core/_request";
import { UserTwoStepsCell } from "../../components/organisms/table/columns/UserTwoStepsCell";

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
    title: "Laporan",
    path: "/inventory/laporan",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "Manajemen Stock",
    path: "/inventory/laporan/manajemen-stok",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "Stock Ledger",
    path: "/inventory/laporan/manajemen-stok/stock-ledger",
    isSeparator: false,
    isActive: false,
  },
];
const DetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [userData, setUserData] = useState<any>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isFailedModalVisible, setIsFailedModalVisible] = useState(false);
  const [isApproveModalVisible, setIsApproveModalVisible] = useState(false);
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
  const [isApprovedSuccessModalVisible, setIsApprovedSuccessModalVisible] =
    useState(false);
  const [isRejectedSuccessModalVisible, setIsRejectedSuccessModalVisible] =
    useState(false);

  const [isLoadData, setIsLoadData] = useState(false);

  const navigate = useNavigate();

  const fetchData = async () => {
    if (!id) return;
    try {
      const data = await getSinglePengiriman(id);
      setUserData(data);
    } finally {
      setIsLoadData(false);
    }
  };

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
    navigate(-1);
  };

  const entryStockData = {
    remarks: "Sample remarks for the entry stock.",
    request_by: { name: "John Doe" },
    approved_by: { name: "Jane Smith" },
    approved_date: "2023-10-01",
    status: "Approved",
    warehouse: "Warehouse A",
    material: "Material 1",
    stock_start: 100,
    stock_end: 80,
    stock_quantity: 20,
    uom: "Lorem Ipsum",
    document_type: "Purchase Order",
    posting_date: "2023-10-01",
  };

  const handleDelete = () => {
    setIsDeleteModalVisible(true);
  };

  const handleDeleteAction = () => {
    const deletionSuccessful = true;

    if (deletionSuccessful) {
      setIsSuccessModalVisible(true);
    } else {
      setIsFailedModalVisible(true);
    }

    setIsDeleteModalVisible(false);
  };

  const handleEdit = () => {
    navigate(
      `/inventory/pengajuan/manajemen-pengiriman/catatan-pengiriman/edit/${id}`
    );
  };

  const handleApprove = () => {
    setIsApproveModalVisible(true);
  };

  const handleReject = () => {
    setIsRejectModalVisible(true);
  };

  const handleApproveConfirm = () => {
    setIsApproveModalVisible(false); // Tutup modal konfirmasi
    setIsApprovedSuccessModalVisible(true); // Buka modal keberhasilan
  };

  const handleRejectConfirm = () => {
    setIsRejectModalVisible(false); // Tutup modal konfirmasi
    setIsRejectedSuccessModalVisible(true); // Buka modal keberhasilan
  };

  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Detail Stock Ledger</PageTitle>

      <div className="font-secondary">
        <div className="container card p-5 font-secondary">
          <div className="row g-1">
            {/* Column 1 */}
            <div className="col-md-6 mb-2">
              <label className="form-label fw-bold">Gudang</label>
              <div className="fw-light text-gray-800">
                {entryStockData.warehouse}
              </div>
            </div>
            <div className="col-md-6 mb-2">
              <label className="form-label fw-bold">Material</label>
              <div className="fw-light text-gray-800">
                {entryStockData.material}
              </div>
            </div>
            <div className="col-md-6 mb-2">
              <label className="form-label fw-bold">Stock Awal</label>
              <div className="fw-light text-gray-800">
                {entryStockData.stock_start}
              </div>
            </div>
            <div className="col-md-6 mb-2">
              <label className="form-label fw-bold">Stock Quantity</label>
              <div className="fw-light text-gray-800">
                {entryStockData.stock_quantity}
              </div>
            </div>

            {/* Column 2 */}
            <div className="col-md-6 mb-2">
              <label className="form-label fw-bold">Stock Akhir</label>
              <div className="fw-light text-gray-800">
                {entryStockData.stock_end}
              </div>
            </div>
            <div className="col-md-6 mb-2">
              <label className="form-label fw-bold">Satuan UOM</label>
              <div className="fw-light text-gray-800">{entryStockData.uom}</div>
            </div>
            <div className="col-md-6 mb-2">
              <label className="form-label fw-bold">Tanggal Posting</label>
              <div className="fw-light text-gray-800">
                {formatDate(entryStockData.posting_date)}
              </div>
            </div>
            <div className="col-md-6 mb-2">
              <label className="form-label fw-bold">Tipe Dokumen</label>
              <div className="fw-light text-gray-800">
                {entryStockData.document_type}
              </div>
            </div>
          </div>
        </div>

        {/* <MaterialTableLayoutDetail /> */}

        <div className="d-flex justify-content-end row">
          <div className="col-12 text-end my-4">
            <button
              type="button"
              onClick={handleBack}
              className="btn btn-primary px-12 py-3 border border-primary"
            >
              Kembali
            </button>
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
      </div>
    </>
  );
};

export default DetailPage;
