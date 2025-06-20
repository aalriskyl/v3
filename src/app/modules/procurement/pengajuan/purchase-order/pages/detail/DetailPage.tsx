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
import LayananSectionLayout from "../../components/template/LayananSectionLayout";
import MaterialSectionLayout from "../../components/template/MaterialSectionLayoutWarehouse";
import { getSinglePurchaseOrder, updateStatusPo } from "../../core/_request";
import MaterialSectionLayoutSupplier from "../../components/template/MaterialSectionLayoutSupplier";
import MaterialSectionLayoutWarehouse from "../../components/template/MaterialSectionLayoutWarehouse";
import { SubmitConfirmationModal } from "@metronic/layout/components/form/organism/SubmitModal";
import LayananSectionLayoutSupplier from "../../components/template/LayananSectionLayoutSupplier";
import ReactQuill from "react-quill";
import PurchaseOrderPDF from "../../components/template/PurchaseRequestTable";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { UserTwoStepsCell } from "../../components/organisms/table/columns/UserTwoStepsCell";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";
import axiosInstance from "../../../../../../../service/axiosInstance";
import { getErrorMessage } from "../../../../../../helper/getErrorMessage";
import { PurchaseOrderProvider } from "../../components/molecules/core/PurchaseOrderContext";
import ReactDOM from "react-dom";
import PurchaseRequestTemplate from "../../components/template/PDFExportTemplate";
import { exportToPDF } from "../../../../../../helper/usePDFExport";
import ExcelJS from "exceljs";
import * as XLSX from "xlsx";
import ExportModal from "@metronic/layout/components/modals/Export";
import { KTIcon } from "@metronic/helpers";
import { formatDateToMonthYear } from "../../../../../../helper/formatDate";

const DetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [exportDataPdf, setExportDataPdf] = useState<any>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isRejectedModalVisible, setIsRejectedModalVisible] = useState(false);
  const [failedMessage, setFailedMessage] = useState<string | null>(null);
  const [isFailedModalVisible, setIsFailedModalVisible] = useState(false);
  const [isApproveModalVisible, setIsApproveModalVisible] = useState(false);
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
  const [isApprovedSuccessModalVisible, setIsApprovedSuccessModalVisible] =
    useState(false);
  const [isRejectedSuccessModalVisible, setIsRejectedSuccessModalVisible] =
    useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const breadcrumbs: Array<PageLink> = [
    {
      title: "Dashboard",
      path: "/",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "Procurement",
      path: "/procurement",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "Pengajuan",
      path: "/procurement/pengajuan",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "Purchase Request",
      path: "/procurement/pengajuan/purchase-request",
      isSeparator: false,
      isActive: false,
    },
  ];

  useEffect(() => {
    const fetchPurchaseOrder = async () => {
      if (id) {
        setIsLoading(true);
        try {
          const response = await getSinglePurchaseOrder(id);
          setUserData(response.data);
          // console.log("miaw", response.data);
        } catch (error) {
          console.error("Failed to fetch purchase order:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchPurchaseOrder();
  }, [id]);

  const handleBack = () => {
    navigate("/procurement/pengajuan/purchase-request");
  };

  const handleSubmit = async () => {
    if (!id) {
      console.error("ga ada id");
      return;
    }
    try {
      setIsLoading(true);
      await updateStatusPo(id, { status: "Submitted" });
      setSuccessMessage("Purchase Request berhasil di-submit!");
      setIsSuccessModalVisible(true);
      const response = await getSinglePurchaseOrder(id);
      setUserData(response.data);
    } catch (error: any) {
      setFailedMessage(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleWaiting = async () => {
    if (!id) {
      console.error("ga ada id");
      return;
    }
    try {
      await updateStatusPo(id, { status: "Waiting" });
      setIsApproveModalVisible(true);
      const response = await getSinglePurchaseOrder(id);
      setUserData(response.data);
      // setIsSuccessModalVisible(true);
    } catch (error: any) {
      setFailedMessage(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!id) {
      console.error("ga ada id");
      return;
    }
    try {
      await updateStatusPo(id, { status: "Approved" });
      setIsApprovedSuccessModalVisible(true);
      const response = await getSinglePurchaseOrder(id);
      setUserData(response.data);
    } catch (error) {
      setFailedMessage(getErrorMessage(error));
    }
  };

  const handleDeleteAction = async () => {
    if (!id) {
      console.error("ga ada id");
      return;
    }
    setIsLoading(true);
    try {
      await axiosInstance.delete(
        `/procurement/submission/purchase-order/${id}`
      );
      setIsDeleteModalVisible(false);
      setIsSuccessModalVisible(true); // Tampilkan modal sukses
      setSuccessMessage("Purchase Order berhasil dihapus!");
      navigate("/procurement/pengajuan/purchase-request"); // Redirect ke halaman list
    } catch (error: any) {
      setFailedMessage(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(`/purchasing/pengajuan/purchase-order/edit/${id}`);
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

  // In your component
  // const handleExportPDF = async () => {
  //   try {
  //     setIsLoading(true);

  //     // Use the export endpoint directly
  //     await exportToPDF(id!, {
  //       endpoint: `/procurement/submission/purchase-order/export/${id}`, // Make sure this is correct
  //       templateComponent: PurchaseRequestTemplate,
  //       fileName: `purchase_request_${id}`,
  //       size: "A4",
  //       orientation: "portrait",
  //       scale: 2,
  //     });
  //   } catch (error) {
  //     setFailedMessage(getErrorMessage(error));
  //     setIsFailedModalVisible(true);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  {
    isLoading && <OverlayLoader />;
  }

  return (
    <>
      <div className="position-relative">
        <PageTitle breadcrumbs={breadcrumbs}>Detail Purchase Request</PageTitle>
        <div
          className="position-absolute"
          style={{ top: "-5rem", right: "1rem" }}
        >
          <ButtonExport data={userData} />
        </div>
      </div>

      {isLoading && <OverlayLoader />}
      {!isLoading && (
        <div className="font-secondary">
          <div id="export" style={{ display: "none" }}>
            <PurchaseRequestTemplate exportData={userData} />
          </div>
          <div id="tes" className="card p-5 w-100 mb-8">
            <h3 className="mb-6">Purchase Request</h3>
            <div className="row">
              <div className="col-md-6">
                <div>
                  <label className="form-label fw-bold">Material Request</label>
                  <p className="text-lg font-medium">
                    {userData?.material_request?.no_material_request || "-"}
                  </p>
                </div>
                {userData?.supplier?.is_a_company === true && (
                  <div>
                    <label className="form-label fw-bold">Tipe</label>
                    <p className="text-lg font-medium">Warehouse</p>
                  </div>
                )}
                {userData?.supplier?.is_a_company === false && (
                  <div>
                    <label className="form-label fw-bold">Tipe</label>
                    <p className="text-lg font-medium">Supplier</p>
                  </div>
                )}
                <div>
                  <label className="form-label fw-bold">Requested By</label>
                  <p className="text-lg font-medium">
                    {userData?.requested_by?.name || "-"}
                  </p>
                </div>
                <div>
                  <label className="form-label fw-bold">Submitted By</label>
                  <p className="text-lg font-medium">
                    {userData?.submitted_by?.name || "-"}
                  </p>
                </div>
                <div>
                  <label className="form-label fw-bold">Approved By</label>
                  <p className="text-lg font-medium">
                    {userData?.approved_by?.name || "-"}
                  </p>
                </div>
                <div>
                  <label className="form-label fw-bold">
                    Status Pengiriman
                  </label>
                  <p className="text-lg font-medium">
                    <UserTwoStepsCell status={userData?.status_delivery} />
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <label className="form-label fw-bold">
                    Nomor Purchase Request
                  </label>
                  <p className="text-lg font-medium">
                    {userData?.no_purchase_order || "-"}
                  </p>
                </div>
                {userData?.supplier?.is_a_company === true && (
                  <div>
                    <label className="form-label fw-bold">Warehouse</label>
                    <p className="text-lg font-medium">
                      {userData?.supplier?.name || "-"}
                    </p>
                  </div>
                )}
                {userData?.supplier?.is_a_company === false && (
                  <div>
                    <label className="form-label fw-bold">Supplier</label>
                    <p className="text-lg font-medium">
                      {userData?.supplier?.name || "-"}
                    </p>
                  </div>
                )}
                <div>
                  <label className="form-label fw-bold">
                    Tanggal Pengajuan
                  </label>
                  <p className="text-lg font-medium">
                    {formatDate(userData?.created_at || "-")}
                  </p>
                </div>
                <div>
                  <label className="form-label fw-bold">
                    Tanggal Submitted
                  </label>
                  <p className="text-lg font-medium">
                    {formatDate(userData?.submitted_date || "-")}
                  </p>
                </div>
                <div>
                  <label className="form-label fw-bold">Tanggal Approved</label>
                  <p className="text-lg font-medium">
                    {formatDate(userData?.approved_date || "-")}
                  </p>
                </div>
                <div>
                  <label className="form-label fw-bold">
                    Status Pembayaran
                  </label>
                  <p className="text-lg font-medium">
                    <UserTwoStepsCell status={userData?.status_payment} />
                  </p>
                </div>
                <div>
                  <label className="form-label fw-bold">Status Dokumen</label>
                  <p className="text-lg font-medium">
                    <UserTwoStepsCell status={userData?.status} />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <PurchaseOrderProvider>
            {userData?.supplier?.is_a_company === false && (
              <div>
                <div className="card p-5 w-100 mt-8">
                  <h4 className="mb-8">Material</h4>
                  <MaterialSectionLayoutSupplier
                    status={userData?.status}
                    supplierId={userData?.supplier.id}
                  />
                </div>
                <div className="card p-5 w-100 mt-8">
                  <h4 className="mb-8">Layanan</h4>
                  <LayananSectionLayoutSupplier
                    status={userData?.status}
                    type={userData?.type}
                    supplierId={userData?.supplier.id}
                  />
                </div>
              </div>
            )}
            {userData?.supplier?.is_a_company === true && (
              <div>
                <div className="card p-5 w-100 mt-8">
                  <h4 className="mb-8">Material</h4>
                  <MaterialSectionLayoutWarehouse
                    isQuotation={userData.quotation?.id}
                    status={userData?.status}
                    supplierId={userData?.supplier.id}
                  />
                </div>
                <div className="card p-5 w-100 mt-8">
                  <h4 className="mb-8">Layanan</h4>
                  <LayananSectionLayout
                    isQuotation={userData.quotation?.id}
                    isCompanyId={userData.supplier?.is_company_id}
                    status={userData?.status}
                    type={userData?.type}
                    supplierId={userData?.supplier.id}
                  />
                </div>
              </div>
            )}
          </PurchaseOrderProvider>
          <div className="card p-5 w-100 mt-8">
            <h3 className="mb-6">Terms Of Condition</h3>
            <div className="mt-8">
              <ReactQuill
                value={userData?.term_of_condition}
                readOnly={true}
                theme="bubble"
                modules={{ toolbar: false }}
              />
            </div>
          </div>
          <div className="d-flex justify-content-end row">
            <div className="col-12 text-end my-4">
              <button
                type="button"
                onClick={handleBack}
                className="btn px-12 py-3 border border-gray-500 me-2"
              >
                Kembali
              </button>
              {userData?.status === "Draft" && (
                <button
                  type="button"
                  onClick={() => setIsDeleteModalVisible(true)} // Tampilkan modal konfirmasi delete
                  className="btn btn px-12 py-3 border border-gray-500 ms-2"
                >
                  Delete
                </button>
              )}
              {userData?.status === "Draft" && (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="btn btn-primary px-12 py-3 border border-primary ms-2"
                >
                  Submit
                </button>
              )}
              {userData?.status === "Submitted" && (
                <button
                  type="button"
                  onClick={handleWaiting}
                  className="btn btn-primary px-12 py-3 border border-primary ms-2"
                >
                  Approve to Finance
                </button>
              )}
            </div>
          </div>
          {failedMessage && (
            <FailedModal
              closeModal={() => setFailedMessage(null)}
              message={failedMessage}
            />
          )}
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
              successMessage={successMessage}
              closeModal={() => {
                setIsSuccessModalVisible(false);
                // navigate('/procurement/pengajuan/purchase-request');
              }}
            />
          )}

          {isApproveModalVisible && (
            <SuccessModal
              title="Berhasil"
              successMessage={successMessage}
              closeModal={() => {
                setIsApproveModalVisible(false);
                // navigate('/procurement/pengajuan/purchase-request');
              }}
            />
          )}

          {isFailedModalVisible && (
            <FailedModal
              closeModal={() => setFailedMessage(null)}
              message={failedMessage}
            />
          )}
        </div>
      )}
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

const ButtonExport = ({ data }: { data?: any }) => {
  const params = useParams();
  const [isExportModalVisible, setIsExportModalVisible] = useState(false);
  const [isExportSuccessVisible, setIsExportSuccessVisible] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [failedMessage, setFailedMessage] = useState<string | null>(null);
  const [isFailedModalVisible, setIsFailedModalVisible] = useState(false);

  const handleCloseModal = () => {
    setIsExportModalVisible(false);
    setIsExportSuccessVisible(false);
  };

  const getMaterial = async () => {
    try {
      const response = await axiosInstance.get(
        `/procurement/submission/purchase-order/purchase-order-material/purchase-order/${params.id}`
      );
      console.log({ material: response });
      // setMaterial(response.data.data.sales_order_materials);
      return response.data.data.purchase_order_materials;
    } catch (error) {}
  };

  const handleExportPDF = async () => {
    try {
      setIsLoading(true);
      await exportToPDF({
        endpoint: `/procurement/submission/purchase-order/export/${params.id}`,
        templateComponent: PurchaseRequestTemplate,
        fileName: `purchase_request_${params.id}`,
        size: "A4",
        orientation: "portrait",
        pagebreak: {
          mode: ["avoid-all", "css"],
          avoid: ".avoid-break",
        },
      });
    } catch (error) {
      console.error("Export failed:", error);
      setFailedMessage(
        error instanceof Error ? error.message : "Export failed"
      );
      setIsFailedModalVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  const getService = async () => {
    try {
      const response = await axiosInstance.get(
        `/procurement/submission/purchase-order/purchase-order-service/purchase-order/${params.id}`
      );
      console.log({ service: response });
      return response.data.data.purchase_order_services;
    } catch (error) {}
  };

  const handleExport = async (exportType: string) => {
    setIsLoading(true);
    try {
      if (exportType === "excel") {
        await handleExportExcel();
      } else if (exportType === "csv") {
        await handleExportCsv();
      } else if (exportType === "pdf") {
        await handleExportPDF();
      }
      setIsExportSuccessVisible(true); // Show success
    } catch (error) {
      setFailedMessage(getErrorMessage(error));
      setIsFailedModalVisible(true);
      handleCloseModal(); // Close on error
    } finally {
      setIsLoading(false);
    }
  };
  const handleOpenModal = () => {
    setIsExportSuccessVisible(false);
    setIsExportModalVisible(true);
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
      const titleRow = worksheet.addRow(["PURCHASE REQUEST REPORT"]);
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
          "Material Request",
          data?.material_request?.no_material_request || "-",
          "",
          "",
          "Nomor Purchase Request",
          data?.no_purchase_order,
          "",
        ],
        [
          "Tipe",
          data?.supplier?.is_a_company === true
            ? "Warehouse"
            : data?.supplier?.is_a_company === false
            ? " Supplier"
            : "-",
          "",
          "",
          data?.supplier?.is_a_company === true
            ? "Warehouse"
            : data?.supplier?.is_a_company === false
            ? " Supplier"
            : "-",
          data?.supplier?.name || "-",
          "",
        ],
        [
          "Requested By",
          data?.requested_by?.name || "-",
          "",
          "",
          "Tanggal Pengajuan",
          formatDateToMonthYear(data?.created_at),
          "",
        ],
        [
          "Submitted By",
          data?.submitted_by?.name || "-",
          "",
          "",
          "Tanggal Submitted",
          formatDateToMonthYear(data?.submitted_date),
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
      const fileName = `Purchase_Request_${data?.no_purchase_order}_${formattedDate}.xlsx`;

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
      console.log({ dataExcel: data });
      const material: MaterialType[] = await getMaterial();
      const service: ServiceType[] = await getService();

      // Prepare all the data to be written
      const rows: any[][] = [];

      // Add Title
      rows.push(["PURCHASE REQUEST REPORT"]);
      rows.push([]);

      // Add Header Information
      const headerRows = [
        [
          "Material Request",
          data?.material_request?.no_material_request || "-",
          "",
          "",
          "Nomor Purchase Request",
          data?.no_purchase_order || "-",
        ],
        [
          "Tipe",
          data?.supplier?.is_a_company === true
            ? "Warehouse"
            : data?.supplier?.is_a_company === false
            ? "Supplier"
            : "-",
          "",
          "",
          data?.supplier?.is_a_company === true
            ? "Warehouse"
            : data?.supplier?.is_a_company === false
            ? "Supplier"
            : "-",
          data?.supplier?.name || "-",
        ],
        [
          "Requested By",
          data?.requested_by?.name || "-",
          "",
          "",
          "Tanggal Pengajuan",
          formatDateToMonthYear(data?.created_at) || "-",
        ],
        [
          "Submitted By",
          data?.submitted_by?.name || "-",
          "",
          "",
          "Tanggal Submitted",
          formatDateToMonthYear(data?.submitted_date) || "-",
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

      headerRows.forEach((row) => rows.push(row));
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
      const totalAmount = 1000; // Replace with actual calculation if needed

      rows.push(["SUMMARY"]);
      rows.push(["Total Jumlah Keseluruhan", totalAmount]);
      rows.push(["Total Biaya", totalPrice]);

      // Create worksheet and workbook
      const worksheet = XLSX.utils.aoa_to_sheet(rows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Request Order");

      // Create a custom file name
      const date = new Date();
      const formattedDate = `${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()}`;
      const fileName = `Purchase_Request_${data?.no_purchase_order}_${formattedDate}.csv`;

      // Write the CSV
      const csvOutput = XLSX.write(workbook, {
        bookType: "csv",
        type: "array",
      });
      const blob = new Blob([csvOutput], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
          closeModal={handleCloseModal}
          onConfirm={handleExport}
          showExcelOption={true}
          showCsvOption={true}
          showPdfOption={true}
          showSuccess={isExportSuccessVisible}
        />
      )}
      {/* <div className="d-none">
        <PDFDownloadLink
          id="download-sales-order-pdf"
          document={<SalesOrderDetailPDF id={data?.id || ""} />}
          fileName={`Sales_Order_${data?.no_sales_order}.pdf`}
          className="btn btn-secondary px-12 py-3 border border-gray-500 me-2"
        >
          {({ loading }) => (loading ? "Generating PDF..." : "Download PDF")}
        </PDFDownloadLink>
      </div> */}
    </>
  );
};
