import { FC, useEffect, useState } from "react";
import { PageTitle, PageLink } from "@metronic/layout/core";
import { useNavigate, useParams } from "react-router-dom";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";
import DetailTableLayout from "../../components/template/DetailTableLayout";
import axiosInstance from "../../../../../../../service/axiosInstance";

const breadcrumbs: Array<PageLink> = [
  {
    title: "Dashboard",
    path: "/",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "Accounting",
    path: "/accounting",
    isSeparator: false,
    isActive: true,
  },
  {
    title: "Laporan",
    path: "/accounting/laporan",
    isSeparator: false,
    isActive: true,
  },
  {
    title: "Buku Besar",
    path: "/accounting/laporan/buku-besar",
    isSeparator: false,
    isActive: false,
  },
];

const DetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ledgerData, setLedgerData] = useState<any | null>(null);

  useEffect(() => {
    const getLedgerByCoa = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(
          `/accounting/master-data/coa-transaction/ledger/${id}`
        );
        setLedgerData(response.data.data);
      } catch (error) {
        console.error("Error fetching ledger data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      getLedgerByCoa();
    }
  }, [id]);

  const handleBack = () => {
    navigate("../");
  };

  const toIDR = (value: number | null | undefined) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value ?? 0);
  };
  return (
    <>
      {isLoading && <OverlayLoader />}
      <PageTitle breadcrumbs={breadcrumbs}>Detail Buku Besar</PageTitle>
      <div className="font-secondary mb-8">
        <div className="card d-flex col-md-12 p-5 mb-8">
          <div className="row">
            <div className="col-md-6">
              <label className="form-label fw-bold">Nama COA</label>
              <p className="text-lg font-medium">
                {ledgerData?.coa_name || "-"}
              </p>
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold">Total Saldo</label>
              <p className="text-lg font-medium">
                {toIDR(ledgerData?.total_saldo)}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label className="form-label fw-bold">Total Kredit</label>
              <p className="text-lg font-medium">
                {toIDR(ledgerData?.total_credit)}
              </p>
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold">Total Debit</label>
              <p className="text-lg font-medium">
                {toIDR(ledgerData?.total_debit)}
              </p>
            </div>
          </div>
        </div>
        <div className="card p-5">
          <h3 className="mt-2 mb-0 align-items-center">Detail Transaksi</h3>
          <DetailTableLayout />
        </div>
      </div>
      <div className="d-flex justify-content-end mb-8">
        <div>
          <button
            type="button"
            onClick={handleBack}
            className="btn px-12 py-3 border border-gray-500 me-2"
          >
            Kembali
          </button>
        </div>
      </div>
    </>
  );
};

export default DetailPage;
