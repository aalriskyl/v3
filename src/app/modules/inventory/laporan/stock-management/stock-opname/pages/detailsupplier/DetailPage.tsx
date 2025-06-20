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
import {
  getAllMaterialByOpnameId,
  getSingleOpname,
} from "../../../../../pengajuan/stock-management/stock-opname/core/_request";
import {
  getAllMaterialByOpnameIdType,
  getSingleOpnameType,
} from "../../../../../pengajuan/stock-management/stock-opname/core/_models";
import { UserTwoStepsCell } from "../../components/organisms/table/columns/UserTwoStepsCell";
import clsx from "clsx";
import { ListPagination } from "@metronic/layout/components/form/components/pagination/ListPagination";
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
    title: "Laporan",
    path: "/inventory/laporan/manajemen-stok",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "Stock Opname",
    path: "/inventory/laporan/manajemen-stok/stock-opname",
    isSeparator: false,
    isActive: false,
  },
];

const StockOpnameDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [userData, setUserData] = useState<getSingleOpnameType | null>(null);
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

  /*     const handleDelete = () => {
        setIsDeleteModalVisible(true);
    };
 */
  const handleDeleteAction = () => {
    const deletionSuccessful = true;

    if (deletionSuccessful) {
      setIsSuccessModalVisible(true);
    } else {
      setIsFailedModalVisible(true);
    }

    setIsDeleteModalVisible(false);
  };

  /*     const handleEdit = () => {
        navigate(`/inventory/pengajuan/manajemen-stok/stock-opname/edit/${id}`);
    };

    const handleApprove = () => {
        setIsApproveModalVisible(true);
    };

    const handleReject = () => {
        setIsRejectModalVisible(true);
    }; */

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

        <ListMaterialOpname
          opnameId={id || ""}
          status={userData?.status || ""}
        />

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
      </div>
    </>
  );
};

export default StockOpnameDetail;

const ListMaterialOpname = ({
  opnameId,
  status,
}: {
  opnameId: string;
  status: string;
}) => {
  const [materialData, setMaterialData] =
    useState<getAllMaterialByOpnameIdType>([]);
  const [pagination, setPagination] = useState<number>(1);
  const pageSize = 10;
  const [search, setSearch] = useState<string>("");

  const fetchMaterialData = async () => {
    if (!opnameId) return;
    getAllMaterialByOpnameId(opnameId).then((data) => {
      if (!data) return;
      setMaterialData(data);
    });
  };

  useEffect(() => {
    fetchMaterialData();
  }, []);

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

  return (
    <div className="card p-5 w-100">
      <div className="row g-2">
        <h3 className="mb-6">Material</h3>
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

              <div className="col-md-10">
                {material.stock_opname_uoms.map((uomData, uIndex) => (
                  <div key={uIndex} className="row">
                    <div className="col-md-2">
                      <label className="form-label">UOM</label>
                      <p>{uomData.material_uom.uom_actual.name}</p>
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Stock Aktual</label>
                      <input
                        type="number"
                        disabled
                        value={uomData.amount}
                        className={clsx("form-control py-4")}
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Stock Buku</label>
                      <input
                        type="number"
                        disabled
                        value={material.stock_book}
                        className={clsx("form-control py-4")}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Catatan</label>
                      <textarea
                        value={uomData.remarks}
                        disabled
                        className={clsx("form-control py-4")}
                      />
                    </div>
                  </div>
                ))}
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
    </div>
  );
};
