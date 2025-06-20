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
import { formatDateToMonthYear } from "../../../../../../helper/formatDate";
import ReactQuill from "react-quill";
import ExcelJS from "exceljs";

type DataType = {
  term_of_condition: any;
  approved_by: {
    id: string;
    name: string;
  } | null;
  approved_date: string | null;
  customer: {
    id: string;
    is_company: {
      id: string;
      name: string;
    };
    name: string;
  };
  id: string;
  no_sales_order: string;
  purchase_order: {
    id: {
      id: string;
      no_purchase_order: string;
      type: string;
      term_of_condition: string;
      requested_by_id: string;
      supplier_id: string;
      material_request_id: any;
      supplier: {
        id: string;
        ID: number;
        CreatedAt: string;
        UpdatedAt: string;
        DeletedAt: any;
        name: string;
        phone: string;
        email: string;
        contact_person: string;
        address: string;
        city_id: string;
        industry: string;
        is_a_company: boolean;
        is_company_id: any;
        company_id: string;
        city: {
          id: string;
          province: string;
          name: string;
        };
        status: boolean;
        is_used: boolean;
      };
      requested_by: {
        id: string;
        no_employee: number;
        status: boolean;
        name: string;
        email: string;
        password: string;
        gender: string;
        birth_date: string;
        address_ktp: string;
        address_domicile: string;
        phone: string;
        marital_status: string;
        religion: string;
        last_education: string;
        bank: string;
        no_bank: string;
        contract_type: string;
        name_emergency_phone: string;
        relationship_emergency_phone: string;
        emergency_phone: string;
        photo: string;
        ID: number;
        CreatedAt: string;
        UpdatedAt: string;
        DeletedAt: any;
        company_employees: any;
      };
      approved_by: any;
      company_id: string;
      approved_by_id: string;
      approved_date: string;
      purchase_order_materials: any;
      purchase_order_services: any;
      status: string;
    };
    no_purchase_order: string;
  };
  quotation: any;
  rejected_by: any;
  rejected_date: any;
  requested_by: {
    id: string;
    name: string;
  };
  status: string;
  status_delivery: string;
  status_payment: string;
  submitted_by: {
    id: string;
    name: string;
  };
  submitted_date: string;
  type: string;
};

const DetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<undefined | DataType>();

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isDeleteSuccessModalVisible, setIsDeleteSuccessModalVisible] =
    useState(false);
  const [isDeleteFailedModalVisible, setIsDeleteFailedModalVisible] =
    useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

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
      title: "Request Order",
      path: "/sales/pengajuan/request-order",
      isSeparator: false,
      isActive: false,
    },
  ];

  const getDetailSalesOrder = async () => {
    setIsLoadData(true);
    try {
      const response = await axiosInstance.get(
        `/sales/submission/sales-order/${id}`
      );
      console.log({ getDetailSalesOrder: response.data.data });

      setData(response.data.data);
    } catch (error) {
      return;
    } finally {
      setIsLoadData(false);
    }
  };

  useEffect(() => {
    getDetailSalesOrder();
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleDeleteAction = async () => {
    setIsDeleteLoading(true);
    try {
      await axiosInstance.delete(
        `/sales/submission/sales-order/${id}?company_id=${localStorage.getItem(
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
      await axiosInstance.put(`/sales/submission/sales-order/status/${id}`, {
        status: changeStatus,
      });
      await getDetailSalesOrder();
      setIsStatusModalVisible(false);
      setIsChangeStatusSuccessModalVisible(true);
    } catch (error) {
      setIsChangeStatusFailedModalVisible(true);
      return;
    } finally {
      setIsChangeStatusLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(`/sales/pengajuan/request-order/edit/${id}`);
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
        <PageTitle breadcrumbs={breadcrumbs}>Detail Request Order</PageTitle>
        <div
          className="position-absolute"
          style={{ top: "-5rem", right: "1rem" }}
        >
          <ButtonExport data={data} />
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
          <h3 className="mb-6">Request Order</h3>
          <div className="row">
            <div className="col-md-6">
              <div>
                <label className="form-label fw-bold">
                  Nomor Purchase Request
                </label>
                <p className="text-lg font-medium">
                  {data?.purchase_order?.no_purchase_order || "-"}
                </p>
              </div>
              <div>
                <label className="form-label fw-bold">Tipe</label>
                <p className="text-lg font-medium">{data?.type || "-"}</p>
              </div>
              <div>
                <label className="form-label fw-bold">Submitted By</label>
                <p className="text-lg font-medium">
                  {data?.submitted_by?.name || "-"}
                </p>
              </div>
              <div>
                <label className="form-label fw-bold">Request By</label>
                <p className="text-lg font-medium">
                  {data?.approved_by?.name || "-"}
                </p>
              </div>
              <div>
                <label className="form-label fw-bold">Approved By</label>
                <p className="text-lg font-medium">
                  {data?.customer.name || "-"}
                </p>
              </div>
              {/* <div>
                <label className="form-label fw-bold">Tanggal Posting</label>
                <p className="text-lg font-medium">
                  {formatDate(data?.posting_date || "-")}
                </p>
              </div> */}
              <div className="mt-4">
                <p className="form-label fw-bold">Status Pengiriman</p>
                <UserTwoStepsCell status={data?.status_delivery} />
              </div>
              <div>
                <label className="form-label fw-bold mt-4">
                  Status Dokumen
                </label>
                <p className="text-lg font-medium">
                  <UserTwoStepsCell status={data?.status} />-
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div>
                <label className="form-label fw-bold">
                  Nomor Request Order
                </label>
                <p className="text-lg font-medium">
                  {data?.no_sales_order || "-"}
                </p>
              </div>
              {data?.customer && (
                <div>
                  <label className="form-label fw-bold">Outlet</label>
                  <p className="text-lg font-medium">
                    {data?.customer.name || "-"}
                  </p>
                </div>
              )}
              {data?.customer.is_company && (
                <div>
                  <label className="form-label fw-bold">Perusahaan</label>
                  <p className="text-lg font-medium">
                    {data?.customer.is_company.name || "-"}
                  </p>
                </div>
              )}
              <div>
                <label className="form-label fw-bold">Tanggal Pengajuan</label>
                <p className="text-lg font-medium">
                  {formatDateToMonthYear(data?.submitted_date)}
                </p>
              </div>
              <div>
                <label className="form-label fw-bold">Tanggal Approved</label>
                <p className="text-lg font-medium">
                  {formatDateToMonthYear(data?.approved_date)}
                </p>
              </div>
              <div>
                <label className="form-label fw-bold">Status Pembayaran</label>
                <p className="text-lg font-medium">
                  <UserTwoStepsCell status={data?.status_payment} />
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card p-5 w-100 mt-8">
          <h4 className="mb-8">Material</h4>
          <MaterialDetailSectionLayout
            status={data?.status}
            isPreOrder={data?.purchase_order ? true : false}
          />
        </div>

        <div className="card p-5 w-100 mt-8">
          <h4 className="mb-8">Layanan</h4>
          <LayananDetailSectionLayout
            status={data?.status}
            isPreOrder={data?.purchase_order ? true : false}
          />
        </div>

        {data?.purchase_order && (
          <div className="card p-5 w-100 mt-8">
            <h3 className="mb-6">Terms Of Condition</h3>
            <div className="mt-8">
              <ReactQuill
                value={data?.purchase_order.id?.term_of_condition}
                readOnly={true}
                theme="bubble"
                modules={{ toolbar: false }}
              />
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
              <button
                type="button"
                onClick={() => {
                  setIsStatusModalVisible(true);
                  setChangeStatus("Waiting");
                }}
                className="btn btn-primary px-12 py-3 border border-gray-500 me-2"
                style={{ marginLeft: "5px" }}
              >
                Approve to Finance
              </button>
            )}
            {/* {data?.status === "Waiting" && (
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
            )} */}
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

        {isChangeStatusFailedModalVisible && (
          <FailedModal
            title="Gagal"
            message="Terjadi kesalahan saat mengubah status."
            closeModal={() => setIsChangeStatusFailedModalVisible(false)}
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
            successMessage={`Berhasil update status ke ${changeStatus.toLocaleLowerCase()}`}
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

// const data: any[] = [
//   {
//     name: "PANGSIT GORENG MIE",
//     uom: "PCS",
//     jumlah: "640",
//     harga: 1250,
//     diskon: 0,
//     totalHarga: 800000,
//   },
//   {
//     name: "SIOMAY DIMSUM",
//     uom: "PACK",
//     jumlah: "45",
//     harga: 77000,
//     diskon: 0,
//     totalHarga: 3465000,
//   },
//   {
//     name: "CEKER - MATERIAL",
//     uom: "PACK",
//     jumlah: "8",
//     harga: 210000,
//     diskon: 0,
//     totalHarga: 1680000,
//   },
// ];

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

const ButtonExport = ({ data }: { data?: DataType }) => {
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
    try {
      console.log({ dataExcel: data });
      const material: MaterialType[] = await getMaterial();
      const service: ServiceType[] = await getService();

      const headerStyle = (item: ExcelJS.Row) => {
        item.getCell(1).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "EF4D3E" },
        };
        item.getCell(1).border = {
          top: { style: "thin" },
          right: { style: "thin" },
        };
        item.getCell(1).font = {
          bold: true,
          color: { argb: "FFFFFF" },
        };
      };

      // Create a new workbook
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Request Order");

      // Set column widths
      worksheet.columns = [
        { header: "", key: "col1", width: 30 },
        { header: "", key: "col2", width: 20 },
        { header: "", key: "col3", width: 15 },
        { header: "", key: "col4", width: 20 },
        { header: "", key: "col5", width: 20 },
        { header: "", key: "col6", width: 20 },
        { header: "", key: "col7", width: 10 },
      ];

      // Add title
      const titleRow = worksheet.addRow(["REQUEST ORDER REPORT"]);
      titleRow.font = { bold: true, size: 16 };
      titleRow.height = 30;
      worksheet.mergeCells("A2:F2");
      titleRow.getCell(1).border = {
        top: { style: "thin" },
        right: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
      };
      titleRow.getCell(1).alignment = {
        horizontal: "center",
        vertical: "middle",
      };
      titleRow.getCell(1).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "EF4D3E" },
      };
      titleRow.getCell(1).font = {
        bold: true,
        size: 16,
        color: { argb: "FFFFFF" },
      };

      // Add empty row
      worksheet.addRow([]);

      // Add header information with styling
      const headerRows = [
        [
          "Nomor Purchase Request",
          data?.purchase_order?.no_purchase_order || "-",
          "",
          "",
          "Nomor Request Order",
          data?.no_sales_order,
          "",
        ],
        [
          "Type",
          data?.type || "-",
          "",
          "",
          "Outlet",
          data?.customer?.name,
          "-",
        ],
        [
          "Submitted by",
          data?.submitted_by?.name,
          "",
          "",
          "Tanggal Pengajuan",
          formatDateToMonthYear(data?.submitted_date),
          "",
        ],
        [
          "Request By",
          data?.customer.name || "-",
          "",
          "",
          "Tanggal Approved",
          formatDateToMonthYear(data?.approved_date),
          "",
        ],
        [
          "Approved By",
          data?.approved_by?.name || "-",
          "",
          "",
          "Status Pembayaran",
          data?.status_payment || "-",
          "",
        ],
        [
          "Status Pengiriman",
          data?.status_delivery || "-",
          "",
          "",
          "Status Dokumen",
          data?.status || "-",
          "",
        ],
      ];

      headerRows.forEach((rowData) => {
        const row = worksheet.addRow(rowData);

        // Style label cells (columns A and E)
        ["A", "E"].forEach((col) => {
          const cell = row.getCell(col);
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "fabfba" },
          };
          cell.font = { bold: true, color: { argb: "000000" } };
          cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
        });

        // Style value cells (columns B and F)
        ["B", "F"].forEach((col) => {
          const cell = row.getCell(col);
          cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
        });
      });

      // Add empty rows
      worksheet.addRow([]);
      worksheet.addRow([]);

      // Add Material section header
      const materialHeaderRow = worksheet.addRow(["MATERIAL"]);
      headerStyle(materialHeaderRow);
      worksheet.mergeCells(
        `A${materialHeaderRow.number}:D${materialHeaderRow.number}`
      );
      materialHeaderRow.height = 25;
      materialHeaderRow.getCell(1).alignment = { vertical: "middle" };

      // Add Material column headers
      const materialColumnHeaderRow = worksheet.addRow([
        "Nama",
        "UOM",
        "Jumlah",
        "Harga",
      ]);
      // Style the column headers
      for (let i = 1; i <= 4; i++) {
        const cell = materialColumnHeaderRow.getCell(i);
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "fabfba" },
        };
        cell.font = { bold: true, color: { argb: "000000" } };
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        cell.alignment = { horizontal: "center", vertical: "middle" };
      }
      materialColumnHeaderRow.height = 20;

      // Add material items
      material.forEach((item) => {
        const row = worksheet.addRow([
          item.material.name,
          item.material_uom.uom_actual.name,
          item.amount,
          item.price,
        ]);

        // Style all cells in the row
        for (let i = 1; i <= 4; i++) {
          const cell = row.getCell(i);
          cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
        }

        // Format price cell
        const priceCell = row.getCell(4);
        priceCell.numFmt = '"Rp. "#,##0.00';
      });

      // Add empty rows
      worksheet.addRow([]);
      worksheet.addRow([]);

      // Add Service section header
      const serviceHeaderRow = worksheet.addRow(["LAYANAN"]);
      headerStyle(serviceHeaderRow);
      worksheet.mergeCells(
        `A${serviceHeaderRow.number}:B${serviceHeaderRow.number}`
      );
      serviceHeaderRow.height = 25;
      serviceHeaderRow.getCell(1).alignment = { vertical: "middle" };

      // Add Service column headers
      const serviceColumnHeaderRow = worksheet.addRow(["Nama", "Harga"]);
      // Style the column headers
      for (let i = 1; i <= 2; i++) {
        const cell = serviceColumnHeaderRow.getCell(i);
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "fabfba" },
        };
        cell.font = { bold: true, color: { argb: "000000" } };
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        cell.alignment = { horizontal: "center", vertical: "middle" };
      }
      serviceColumnHeaderRow.height = 20;

      // Add service items
      service.forEach((item) => {
        const row = worksheet.addRow([item.service.name, item.price]);

        // Style all cells in the row
        for (let i = 1; i <= 2; i++) {
          const cell = row.getCell(i);
          cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
        }

        // Format price cell
        const priceCell = row.getCell(2);
        priceCell.numFmt = '"Rp. "#,##0.00';
      });

      // Add empty rows
      worksheet.addRow([]);
      worksheet.addRow([]);

      // Calculate totals
      const totalPriceMaterial = material.reduce(
        (acc, item) => acc + item.price,
        0
      );
      const totalPriceService = service.reduce(
        (acc, item) => acc + item.price,
        0
      );
      const totalPrice = totalPriceMaterial + totalPriceService;
      const totalAmount = 1000; // Replace with actual calculation if needed

      const totalHeaderRow = worksheet.addRow(["SUMMARY"]);
      headerStyle(totalHeaderRow);
      worksheet.mergeCells(
        `A${totalHeaderRow.number}:B${totalHeaderRow.number}`
      );
      totalHeaderRow.height = 25;
      totalHeaderRow.getCell(1).alignment = { vertical: "middle" };
      // Add summary section with styling
      const totalRows = [
        ["Total Jumlah Keseluruhan", totalAmount],
        ["Total Biaya", totalPrice],
      ];

      totalRows.forEach((rowData) => {
        const row = worksheet.addRow(rowData);

        // Style label cell
        const labelCell = row.getCell(1);
        labelCell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "fabfba" },
        };
        labelCell.font = { bold: true };
        labelCell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };

        // Style value cell
        const valueCell = row.getCell(2);
        valueCell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "fabfba" },
        };
        valueCell.font = { bold: true };
        valueCell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        valueCell.numFmt = '"Rp. "#,##0.00';
      });

      // Create a custom file name with date
      const date = new Date();
      const formattedDate = `${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()}`;
      const fileName = `Request_Order_${data?.no_sales_order}_${formattedDate}.xlsx`;

      // Generate and download the Excel file
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting Excel:", error);
    }
  };

  const handleExportCsv = async () => {
    try {
      console.log({ dataCSV: data });
      const material: MaterialType[] = await getMaterial();
      const service: ServiceType[] = await getService();

      // Data array untuk di-export ke CSV
      const rows: (string | number)[][] = [];

      // Title
      rows.push(["REQUEST ORDER REPORT"]);
      rows.push([]);

      // Header Rows
      const headerRows = [
        [
          "Nomor Purchase Request",
          data?.purchase_order?.no_purchase_order || "-",
          "",
          "",
          "Nomor Request Order",
          data?.no_sales_order || "-",
        ],
        [
          "Type",
          data?.type || "-",
          "",
          "",
          "Outlet",
          data?.customer?.name || "-",
        ],
        [
          "Submitted by",
          data?.submitted_by?.name || "-",
          "",
          "",
          "Tanggal Pengajuan",
          formatDateToMonthYear(data?.submitted_date),
        ],
        [
          "Request By",
          data?.customer?.name || "-",
          "",
          "",
          "Tanggal Approved",
          formatDateToMonthYear(data?.approved_date),
        ],
        [
          "Approved By",
          data?.approved_by?.name || "-",
          "",
          "",
          "Status Pembayaran",
          data?.status_payment || "-",
        ],
        [
          "Status Pengiriman",
          data?.status_delivery || "-",
          "",
          "",
          "Status Dokumen",
          data?.status || "-",
        ],
      ];
      rows.push(...headerRows);
      rows.push([]);
      rows.push([]);

      // Material Section
      rows.push(["MATERIAL"]);
      rows.push(["Nama", "UOM", "Jumlah", "Harga"]);
      material.forEach((item) => {
        rows.push([
          item.material.name,
          item.material_uom.uom_actual.name,
          item.amount,
          item.price,
        ]);
      });

      rows.push([]);
      rows.push([]);

      // Service Section
      rows.push(["LAYANAN"]);
      rows.push(["Nama", "Harga"]);
      service.forEach((item) => {
        rows.push([item.service.name, item.price]);
      });

      rows.push([]);
      rows.push([]);

      // Summary Section
      const totalPriceMaterial = material.reduce(
        (acc, item) => acc + item.price,
        0
      );
      const totalPriceService = service.reduce(
        (acc, item) => acc + item.price,
        0
      );
      const totalPrice = totalPriceMaterial + totalPriceService;
      const totalAmount = 1000; // Ganti kalau ada kalkulasi totalAmount

      rows.push(["SUMMARY"]);
      rows.push(["Total Jumlah Keseluruhan", totalAmount]);
      rows.push(["Total Biaya", totalPrice]);

      // Create worksheet and workbook
      const worksheet = XLSX.utils.aoa_to_sheet(rows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Request Order");

      // Generate CSV
      const date = new Date();
      const formattedDate = `${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()}`;
      const fileName = `Request_Order_${data?.no_sales_order}_${formattedDate}.csv`;

      // Write CSV file and trigger download
      const excelBuffer = XLSX.write(workbook, {
        bookType: "csv",
        type: "array",
      });

      const blob = new Blob([excelBuffer], {
        type: "text/csv;charset=utf-8;",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting CSV:", error);
    }
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
          showExcelOption={true}
          showCsvOption={true}
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
