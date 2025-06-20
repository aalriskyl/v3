import { FC, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { PageTitle } from "@metronic/layout/core";
import { KTCard } from "@metronic/helpers";
import { DetailView } from "./core/_models";
import axiosInstance from "../../../../../service/axiosInstance";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";

const TermPaymentPage: FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<null | DetailView>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getDetailPembukuan = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `/accounting/management-accounting/company-coa/`
      );
      console.log({ getDetailPembukuan: response.data.data });

      setData(response.data.data);
    } catch (error) {
      return;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDetailPembukuan();
  }, []);

  return (
    <main>
      {isLoading && <OverlayLoader />}
      <div className="d-flex flex-row w-100 position-relative">
        <PageTitle>Pembukuan Perusahaan</PageTitle>
      </div>
      <div>
        <Outlet />
        <KTCard className="p-6 my-4">
          <div className="row p-2">
            <h3 className="mb-8">Pembukuan Transaksi</h3>
            <div className="col-md-6 mb-8">
              <div className="d-flex flex-column gap-4">
                <h5>Pembukuan Material</h5>
                <span className="mb-1">{data?.coa_material?.name || "-"}</span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex flex-column gap-4">
                <h5>Pembukuan Layanan</h5>
                <span className="mb-1">{data?.coa_service?.name || "-"}</span>
              </div>
            </div>
            <div className="col-md-6 mb-8">
              <div className="d-flex flex-column gap-4">
                <h5>Pembukuan Hutang</h5>
                <span className="mb-1">{data?.coa_debt?.name || "-"}</span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex flex-column gap-4">
                <h5>Pembukuan Piutang</h5>
                <span className="mb-1">
                  {data?.coa_receivable?.name || "-"}
                </span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex flex-column gap-4">
                <h5>Pembukuan Pembulatan</h5>
                <span className="mb-1">{data?.coa_ceil?.name || "-"}</span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex flex-column gap-4">
                <h5>Pembukuan COA Induk Metode Bayar</h5>
                <span className="mb-1">
                  {data?.coa_payment_method?.name || "-"}
                </span>
              </div>
            </div>
          </div>
        </KTCard>

        <KTCard className="p-6 my-4">
          <div className="row p-2">
            <h3 className="mb-8">Pembukuan Pajak</h3>
            <div className="col-md-6 mb-8">
              <div className="d-flex flex-column gap-4">
                <h5>Pembukuan PPN Masukan</h5>
                <span>{data?.coa_buy_tax?.name || "-"}</span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex flex-column gap-4">
                <h5>Pembukuan PPN Keluaran</h5>
                <span>{data?.coa_sell_tax?.name || "-"}</span>
              </div>
            </div>
            <div className="col-md-6 mb-8">
              <div className="d-flex flex-column gap-4">
                <h5>Pembukuan PPH Masukan</h5>
                <span>{data?.coa_buy_income_tax?.name || "-"}</span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex flex-column gap-4">
                <h5>Pembukuan PPH Keluaran</h5>
                <span>{data?.coa_sell_income_tax?.name || "-"}</span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex flex-column gap-4">
                <h5>Persentase PPN Jual Beli</h5>
                <span>{data?.tax || "-"}%</span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex flex-column gap-4">
                <h5>Persentase PPH</h5>
                <span>{data?.income_tax || "-"}%</span>
              </div>
            </div>
          </div>
        </KTCard>

        <KTCard className="p-6 my-4">
          <div className="row p-2">
            <h3 className="mb-8">Pembukuan Retur</h3>
            <div className="col-md-6 mb-8">
              <div className="d-flex flex-column gap-4">
                <h5>Pembukuan Retur Penjualan</h5>
                <span>{data?.coa_retur_sales?.name || "-"}</span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex flex-column gap-4">
                <h5>Pembukuan Retur Pembelian</h5>
                <span>{data?.coa_retur_purchase?.name || "-"}</span>
              </div>
            </div>
          </div>
        </KTCard>

        <div className="d-flex justify-content-end mb-8 mt-4">
          <button
            type="submit"
            className="btn btn-primary px-4 py-4 my-4"
            onClick={() => navigate("edit")}
          >
            Ubah Pembukuan Perusahaan
          </button>
        </div>
      </div>
    </main>
  );
};

export default TermPaymentPage;
