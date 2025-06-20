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
import LayananDetailSectionLayout from "../../components/template/LayananDetailSectionLayout";
import axiosInstance from "../../../../../../../service/axiosInstance";
import { UserCustomHeader } from "../../components/organisms/table/columns/UserCustomHeader";
import { SubmitConfirmationModal } from "@metronic/layout/components/form/organism/SubmitModal";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";
import { UserTwoStepsCell } from "../../components/organisms/table/columns/UserTwoStepsCell";
import { KTIcon } from "@metronic/helpers";
import ExportModal from "@metronic/layout/components/modals/Export";
import * as XLSX from "xlsx";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PurchaseOrderPDF from "../../components/template/SalesOrderDetailPDF";
import SalesOrderDetailPDF from "../../components/template/SalesOrderDetailPDF";
import { DetailView } from "../../core/_models";
import { formatDateToMonthYear } from "../../../../../../helper/formatDate";
import { getErrorMessage } from "../../../../../../helper/getErrorMessage";

const DetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<undefined | DetailView>();

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isDeleteSuccessModalVisible, setIsDeleteSuccessModalVisible] =
    useState(false);
  const [isDeleteFailedModalVisible, setIsDeleteFailedModalVisible] =
    useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const [failedMessageChangeStatus, setFailedMessageChangeStatus] = useState<
    null | string
  >(null);

  const [isExportModalVisible, setIsExportModalVisible] = useState(false);
  const [isExportSuccessVisible, setIsExportSuccessVisible] = useState(false);

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

  const navigate = useNavigate();

  const breadcrumbs: Array<PageLink> = [
    {
      title: "Dashboard",
      path: "/",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "Sales",
      path: "/sales",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "Pengajuan",
      path: "/sales/pengajuan",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "Faktur Penjualan",
      path: "/sales/pengajuan/faktur-penjualan",
      isSeparator: false,
      isActive: false,
    },
  ];

  const getFakturPenjualan = async () => {
    setIsLoadData(true);
    try {
      const response = await axiosInstance.get(
        `/sales/submission/sales-invoice/${id}?company_id=${localStorage.getItem(
          "company_id"
        )}`
      );
      console.log({ getFakturPenjualan: response.data.data });

      setData(response.data.data);
    } catch (error) {
      return;
    } finally {
      setIsLoadData(false);
    }
  };

  useEffect(() => {
    getFakturPenjualan();
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleDeleteAction = async () => {
    setIsDeleteLoading(true);
    try {
      await axiosInstance.delete(
        `/sales/submission/sales-invoice/${id}?company_id=${localStorage.getItem(
          "company_id"
        )}`
      );
      setIsDeleteSuccessModalVisible(true);
    } catch (error) {
      setIsDeleteFailedModalVisible(true);
    } finally {
      setIsDeleteLoading(false);
      setIsDeleteModalVisible(false);
    }
  };

  const handleChangeStatusAction = async () => {
    setIsChangeStatusLoading(true);
    try {
      await axiosInstance.put(
        `/sales/submission/sales-invoice/status/${id}?company_id=${localStorage.getItem(
          "company_id"
        )}`,
        {
          status: changeStatus,
        }
      );
      await getFakturPenjualan();
      setIsStatusModalVisible(false);
      setIsChangeStatusSuccessModalVisible(true);
    } catch (error) {
      setIsStatusModalVisible(false);
      setFailedMessageChangeStatus(getErrorMessage(error));
      return;
    } finally {
      setIsChangeStatusLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(`/sales/pengajuan/faktur-penjualan/edit/${id}`);
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
      {(isChangeStatusLoading || isDeleteLoading) && <OverlayLoader />}

      <div className="position-relative">
        <PageTitle breadcrumbs={breadcrumbs}>Detail Faktur Penjualan</PageTitle>
        <div
          className="position-absolute"
          style={{ top: "-5rem", right: "1rem" }}
        >
          {/* <ButtonExport data={data} /> */}
        </div>
      </div>

      {/* <button
        type="button"
        className="btn btn-light me-3 border border-2"
        onClick={() => setIsExportModalVisible(true)}
      >
        <KTIcon iconName="exit-down" className="fs-2 text-center mt-1" />
        Export
      </button>

      {isExportModalVisible && (
        <ExportModal
          closeModal={() => setIsExportModalVisible(false)}
          onConfirm={(selectedFormat) => {
            console.log({ selectedFormat });
          }}
          showSuccess={isExportSuccessVisible}
        />
      )} */}

      <div className="font-secondary">
        <div className="card p-5 w-100 mb-8">
          <h3 className="mb-6">Sales Order</h3>
          <div className="row">
            <div className="col-md-6">
              <div>
                <label className="form-label fw-bold">
                  Nomor Faktur Penjualan
                </label>
                <p className="text-lg font-medium">
                  {data?.no_sales_invoice || "-"}
                </p>
              </div>
              <div>
                <label className="form-label fw-bold">Tanggal Pembuatan</label>
                <p className="text-lg font-medium">
                  {formatDateToMonthYear(data?.created_at) || "-"}
                </p>
              </div>
              <div>
                <label className="form-label fw-bold">Tanggal Submitted</label>
                <p className="text-lg font-medium">
                  {formatDateToMonthYear(data?.submitted_date) || "-"}
                </p>
              </div>
              <div>
                <label className="form-label fw-bold">Tanggal Approve</label>
                <p className="text-lg font-medium">
                  {formatDateToMonthYear(data?.approved_date) || "-"}
                </p>
              </div>
              <div>
                <p className="form-label fw-bold">Status Dokumen</p>
                <UserTwoStepsCell status={data?.status} />
              </div>
            </div>
            <div className="col-md-6">
              <div>
                <label className="form-label fw-bold">Nomor Sales Order</label>
                <p className="text-lg font-medium">
                  {data?.sales_order?.no_sales_order || "-"}
                </p>
              </div>
              <div>
                <label className="form-label fw-bold">Request by</label>
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
              <div>
                <p className="form-label fw-bold">Status Pembayaran</p>
                <UserTwoStepsCell status={data?.status_payment} />
              </div>
            </div>
          </div>
        </div>

        <div className="card p-5 w-100 mt-8">
          <h4 className="mb-8">Payment Terms</h4>
          <div className="row">
            <div className="col-md-6">
              <div>
                <h6>Nama Payment Terms</h6>
              </div>
              <span>{data?.sales_payment_terms?.name || "-"}</span>
            </div>
            <div className="col-md-6">
              <div>
                <h6>Invoice Portion</h6>
              </div>
              <span>{data?.invoice_portion}%</span>
            </div>
          </div>
          <div className="row mt-8">
            <div className="col-md-6">
              <div>
                <h6>Due Date</h6>
              </div>
              <span>
                {data?.due_date ? formatDateToMonthYear(data?.due_date) : "-"}
              </span>
            </div>
          </div>
        </div>

        <div className="card p-5 w-100 mt-8">
          <h4 className="mb-8">Material</h4>
          <MaterialDetailSectionLayout
            returPresent={data?.retur_sales?.id}
            status={data?.status}
            sales_order_id={data?.sales_order.id}
          />
        </div>

        {/* <div className="card p-5 w-100 mt-8">
          <h4 className="mb-8">Layanan</h4>
          <LayananDetailSectionLayout
            status={data?.status}
            sales_order_id={data?.sales_order.id}
          />
        </div> */}

        <div className="card p-5 w-100 mt-8">
          <h4 className="mb-4">Pajak</h4>
          <div className="row align-items-center">
            {" "}
            {/* Added align-items-center */}
            <div className="col-md-6">
              <div className="mb-2">
                <div>
                  <h6>Presentase PPN</h6>
                </div>
                <span>{data?.percent_tax || "-"}% </span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-2">
                <div>
                  <h6>Presentase PPH</h6>
                </div>
                <span>{data?.percent_income_tax || "-"}%</span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex flex-column h-100 justify-content-center">
                <label className="form-label fw-bold mb-2">Nominal PPN</label>
                <p className="text-lg font-medium m-0">
                  Rp.{formatDecimal(data?.nominal_tax)}
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex flex-column h-100 justify-content-center">
                <label className="form-label fw-bold mb-2">Nominal PPH</label>
                <p className="text-lg font-medium m-0">
                  Rp.{formatDecimal(data?.nominal_income_tax)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card p-5 w-100 mt-8">
          <h4 className="mb-8">Harga Keseluruhan</h4>
          <div className="row">
            <div className="col-md-12 align-items-center">
              <div className="g-2 mb-5 d-flex justify-content-between align-items-center">
                <div className="text-gray-500">
                  <span>Total Harga Material</span>
                </div>
                <h6>Rp.{formatDecimal(data?.total_purchase_material)}</h6>
              </div>
              <div className="g-2 mb-5 d-flex justify-content-between align-items-center">
                <div className="text-gray-500">
                  <span>Total Harga Layanan</span>
                </div>
                <h6>Rp.{formatDecimal(data?.total_purchase_service)}</h6>
              </div>
              <div className="g-2 mb-5 d-flex justify-content-between align-items-center">
                <div className="text-gray-500">
                  <span>Sub Total Harga Material</span>
                </div>
                <h6>Rp.{formatDecimal(data?.sub_total_material)}</h6>
              </div>
              <div className="g-2 mb-5 d-flex justify-content-between align-items-center">
                <div className="text-gray-500">
                  <span>Sub Total Harga Layanan</span>
                </div>
                <h6>Rp.{formatDecimal(data?.sub_total_service)}</h6>
              </div>

              <div className="g-2 mb-5 d-flex justify-content-between align-items-center">
                <div className="text-gray-500">
                  <span>Sub Total</span>
                </div>
                <h6>
                  Rp.
                  {formatDecimal(data?.sub_total)}
                </h6>
              </div>
              <div className="g-2 mb-5 d-flex justify-content-between align-items-center">
                <div className="text-gray-500">
                  <span>Sub Total Dengan Pajak</span>
                </div>
                <h6>Rp.{formatDecimal(data?.sub_total_tax)}</h6>
              </div>
              <div className="g-2 mb-5 d-flex justify-content-between align-items-center">
                <div className="text-gray-500">
                  <span>Nominal Pembulatan</span>
                </div>
                <h6>Rp.{formatDecimal(data?.total_ceil)}</h6>
              </div>
              <hr className="my-6 border-top border-gray-500" />
              <div className="g-2 mb-5 d-flex justify-content-between align-items-center">
                <div>
                  <h4>Grand Total</h4>
                </div>
                <h4 className="fw-bolder">
                  Rp.{formatDecimal(data?.grand_total)}
                </h4>
              </div>
              <div className="g-2 mb-5 d-flex justify-content-between align-items-center">
                <div className="text-gray-500">
                  <span>Total Sudah Di bayar</span>
                </div>
                <h6>Rp.{formatDecimal(data?.total_paid)}</h6>
              </div>
              <div className="d-flex col-md-12">
                <div className="text-black"></div>
              </div>
              <div
                className="position-relative"
                style={{ bottom: "5px", fontSize: "10px" }}
              ></div>
              <hr className="mb-6 border-top border-gray-500" />
              <div className="g-2 mb-2 d-flex justify-content-between align-items-center">
                <div>
                  <h6>Sisa Pembayaran</h6>
                </div>
                <h5 className="fw-bolder">
                  Rp.
                  {formatDecimal(
                    (data?.grand_total || 0) - (data?.total_paid || 0)
                  )}
                </h5>
              </div>
            </div>
          </div>
        </div>

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

        {isDeleteFailedModalVisible && (
          <FailedModal
            title="Gagal"
            message="Terjadi kesalahan saat menghapus data."
            closeModal={() => setIsDeleteFailedModalVisible(false)}
          />
        )}

        {failedMessageChangeStatus && (
          <FailedModal
            title="Gagal"
            message={failedMessageChangeStatus}
            closeModal={() => setFailedMessageChangeStatus(null)}
          />
        )}

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
      </div>
    </>
  );
};

export default DetailPage;

type MaterialType = {
  amount: number;
  id: string;
  material: {
    id: string;
    name: string;
  };
  material_uom: {
    id: string;
    uom_actual: {
      id: string;
      name: string;
    };
  };
  price: number;
};

type ServiceType = {
  id: string;
  price: number;
  service: {
    id: string;
    name: string;
  };
};

const ButtonExport = ({ data }: { data?: DetailView | any }) => {
  const params = useParams();
  const [isExportModalVisible, setIsExportModalVisible] = useState(false);
  const [isExportSuccessVisible, setIsExportSuccessVisible] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getMaterial = async () => {
    try {
      const response = await axiosInstance.get(
        `/sales/submission/sales-order/sales-order-material/sales-order/${params.id}`
      );
      console.log({ material: response });
      // setMaterial(response.data.data.sales_order_materials);
      return response.data.data.sales_order_materials;
    } catch (error) {}
  };

  const getService = async () => {
    try {
      const response = await axiosInstance.get(
        `/sales/submission/sales-order/sales-order-service/sales-order/${params.id}`
      );
      console.log({ service: response });
      return response.data.data.sales_order_services;
    } catch (error) {}
  };

  const handleExport = async (handleExport: string) => {
    setIsLoading(true);
    try {
      if (handleExport === "excel") {
        handleExportExcel();
      } else if (handleExport === "csv") {
        handleExportCsv();
      } else if (handleExport === "pdf") {
        handleExportPdf();
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportExcel = async () => {
    if (!data) return;
    const wb = XLSX.utils.book_new();

    const material: MaterialType[] = await getMaterial();
    const service: ServiceType[] = await getService();

    const wsData = [
      [""],
      [
        `Nomor Purchase Order`,
        `${data.purchase_order?.no_purchase_order}`,
        "",
        "",
        `Nomor Sales Order`,
        `${data.no_sales_order}`,
        "",
      ],
      [
        `Perusahaan`,
        `${data.customer.is_company?.name}`,
        "",
        "",
        `Konsumen`,
        `${data.customer.name}`,
        "",
      ],
      [`Type`, `${data.type}`, "", "", `Status`, `${data.status}`, ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["Material", "", "", "", "", "", ""],
      ["Nama", "UOM", "Jumlah", "Harga", "", "", ""],
    ];

    material.forEach((item) => {
      wsData.push([
        item.material.name,
        item.material_uom.uom_actual.name,
        item.amount.toString(),
        `Rp. ${item.price.toLocaleString("id-ID")}.00`,
        "",
      ]);
    });

    wsData.push(
      ["", "", "", "", "", "", ""],
      ["Layanan", "", "", "", "", "", ""],
      ["Nama", "Harga", "", "", "", "", ""]
    );

    service.forEach((item) => {
      wsData.push([
        item.service.name,
        `Rp. ${item.price.toLocaleString("id-ID")}.00`,
        "",
      ]);
    });

    // Calculate totals
    // const totalAmount = material.reduce(
    //   (sum, item) => sum + item.totalHarga,
    //   0
    // );
    const totalPriceMaterial = material.reduce(
      (acc, item) => acc + item.price,
      0
    );
    const totalPriceService = service.reduce(
      (acc, item) => acc + item.price,
      0
    );
    const totalPrice = totalPriceMaterial + totalPriceService;
    const totalAmount = 1000;

    wsData.push(
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      [
        "Total Jumlah Keseluruhan",
        `Rp. ${totalAmount.toLocaleString("id-ID")}.00`,
        "",
        "",
        "",
        "",
        "",
      ],
      [
        "Total Biaya",
        `Rp. ${totalPrice.toLocaleString("id-ID")}.00`,
        "",
        "",
        "",
        "",
        "",
      ],
      ["", "", "", "", "", "", ""]
    );

    const ws = XLSX.utils.aoa_to_sheet(wsData);

    const colWidths = [30, 15, 15, 20, 20, 20, 10];
    ws["!cols"] = colWidths.map((width) => ({ width }));

    XLSX.utils.book_append_sheet(wb, ws, "Purchase Order");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "sales_order.xlsx";
    link.click();
    URL.revokeObjectURL(url);
  };
  const handleExportCsv = async () => {
    if (!data) return;
    const wb = XLSX.utils.book_new();

    const material: MaterialType[] = await getMaterial();
    const service: ServiceType[] = await getService();

    const wsData = [
      [""],
      [`Nomor Sales Order`, `${data.no_sales_order}`],
      [`Nomor Purchase Order`, `${data.purchase_order?.no_purchase_order}`],
      [`Perusahaan`, `${data.customer.is_company?.name}`],
      [`Type`, `${data.type}`],
      [`Status`, `${data.status}`],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["Material", "", "", "", "", "", ""],
      ["Nama", "UOM", "Jumlah", "Harga", "", "", ""],
    ];

    material.forEach((item) => {
      wsData.push([
        item.material.name,
        item.material_uom.uom_actual.name,
        item.amount.toString(),
        `Rp. ${item.price.toLocaleString("id-ID")}.00`,
        "",
      ]);
    });

    wsData.push(
      ["", "", "", "", "", "", ""],
      ["Layanan", "", "", "", "", "", ""],
      ["Nama", "Harga", "", "", "", "", ""]
    );

    service.forEach((item) => {
      wsData.push([
        item.service.name,
        `Rp. ${item.price.toLocaleString("id-ID")}.00`,
        "",
      ]);
    });

    const totalPriceMaterial = material.reduce(
      (acc, item) => acc + item.price,
      0
    );
    const totalPriceService = service.reduce(
      (acc, item) => acc + item.price,
      0
    );
    const totalPrice = totalPriceMaterial + totalPriceService;
    const totalAmount = 1000;

    wsData.push(
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      [
        "Total Jumlah Keseluruhan",
        `Rp. ${totalAmount.toLocaleString("id-ID")}.00`,
        "",
        "",
        "",
        "",
        "",
      ],
      [
        "Total Biaya",
        `Rp. ${totalPrice.toLocaleString("id-ID")}.00`,
        "",
        "",
        "",
        "",
        "",
      ],
      ["", "", "", "", "", "", ""]
    );

    const ws = XLSX.utils.aoa_to_sheet(wsData);

    const colWidths = [30, 15, 15, 20, 20, 20, 10];
    ws["!cols"] = colWidths.map((width) => ({ width }));

    XLSX.utils.book_append_sheet(wb, ws, "Purchase Order");

    const excelBuffer = XLSX.write(wb, { bookType: "csv", type: "array" });

    const blob = new Blob([excelBuffer], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "sales_order.csv";
    link.click();
    URL.revokeObjectURL(url);
  };
  const handleExportPdf = async () => {
    const print = document.getElementById("download-sales-order-pdf");
    if (print) {
      print.click();
    }
  };
  return (
    <>
      {" "}
      {isLoading && <OverlayLoader />}
      <button
        type="button"
        className="btn btn-light me-3 border border-2"
        onClick={() => setIsExportModalVisible(true)}
      >
        <KTIcon iconName="exit-down" className="fs-2 text-center mt-1" />
        Export
      </button>
      {isExportModalVisible && (
        <ExportModal
          closeModal={() => setIsExportModalVisible(false)}
          onConfirm={handleExport}
          showSuccess={isExportSuccessVisible}
        />
      )}
      <div className="d-none">
        <PDFDownloadLink
          id="download-sales-order-pdf"
          document={<SalesOrderDetailPDF id={data?.id || ""} />}
          fileName={`Sales_Order_${data?.no_sales_order}.pdf`}
          className="btn btn-secondary px-12 py-3 border border-gray-500 me-2"
        >
          {({ loading }) => (loading ? "Generating PDF..." : "Download PDF")}
        </PDFDownloadLink>
      </div>
    </>
  );
};

const formatDecimal = (value?: number) => {
  if (value === undefined || value === null) return "-";
  return value.toLocaleString("id-ID", {
    style: "decimal",
  });
};
