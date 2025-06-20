/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { KTIcon } from "../../../../../helpers";
import ExportModal from "../../../modals/Export";
import ImportModal from "../../../modals/Import";
import * as XLSX from "xlsx";
import axiosInstance from "../../../../../../service/axiosInstance";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";
import { exportToPDF } from "../../../../../../app/helper/usePDFExport";
import { useListView } from "../core/ListViewProvider";

type DataType = {
  created_at: string;
  id: string;
  no_sales_order: string;
  status: string;
  updated_at: string;
};

type ListToolbarProps = {
  urlImport?: string;
  exportPdf?: {
    url: string;
    layout?: string;
    fileName?: string;
    template?: React.ComponentType<any>;
  };
  exportExcel?: {
    url: string;
    header: string[][];
    content: (item: any, index: number) => any[];
    colWidths: number[];
    fileName: string;
  };
  exportCsv?: {
    url: string;
    header: string[][];
    content: (item: any, index: number) => any[];
    colWidths: number[];
    fileName: string;
  };
  showExportButton?: boolean;
  templatePath?: string;
};

const ListToolbar = ({
  urlImport,
  exportPdf,
  exportExcel,
  exportCsv,
  showExportButton = true,
  templatePath,
}: ListToolbarProps) => {
  const [isExportModalVisible, setExportModalVisible] = useState(false);
  const [isImportModalVisible, setImportModalVisible] = useState(false);
  const [isImportSuccessVisible, setIsImportSuccessVisible] = useState("");
  const [isExportSuccessVisible, setIsExportSuccessVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openExportModal = () => setExportModalVisible(true);
  const openImportModal = () => setImportModalVisible(true);

  const handleExportConfirm = (selectedFormat: string) => {
    console.log("Export confirmed");
    if (selectedFormat === "excel" && exportExcel) {
      handleExportExcel();
    } else if (selectedFormat === "csv") {
      handleExportCsv();
    } else if (selectedFormat === "pdf" && exportPdf) {
      handleExportPDF();
    }
  };

  const handleImportConfirm = async (file: File) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axiosInstance.post(urlImport || "", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.data?.imported === null) {
        setIsImportSuccessVisible("failed");
        return {
          message:
            response.data.message ||
            "Import completed but no data was processed",
          fieldErrors: Array.isArray(response.data.field)
            ? response.data.field
            : [],
        };
      }

      setIsImportSuccessVisible("success");
      return null;
    } catch (error: any) {
      setIsImportSuccessVisible("failed");
      return {
        message:
          error.response?.data?.message || "An unexpected error occurred",
        fieldErrors: Array.isArray(error.response?.data?.field)
          ? error.response?.data?.field
          : [],
      };
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseExport = () => {
    setExportModalVisible(false);
    setIsExportSuccessVisible(false);
  };

  const handleCloseImport = () => {
    setImportModalVisible(false);
    setIsImportSuccessVisible("");

    // Refresh only if closing from success state
    if (isImportSuccessVisible === "success") {
      window.location.reload();
    }
  };

  const handleDownloadTemplate = () => {
    // If templatePath is provided, use that, otherwise generate from window location
    const path = templatePath || generateTemplatePathFromUrl();

    // Create a temporary link and trigger download
    const link = document.createElement("a");
    link.href = `/imports/${path}`;
    link.download = path.split("/").pop() || "template.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper function to generate template path from URL
  const generateTemplatePathFromUrl = () => {
    const path = window.location.pathname;
    // Example: "/inventory/masterdata/materials" -> "materials.xlsx"
    const segments = path.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1];
    return `${lastSegment}.xlsx`;
  };

  const handleExportExcel = async () => {
    if (!exportExcel) return;
    const wb = XLSX.utils.book_new();

    const res = await axiosInstance.get(exportExcel.url);
    const data: any[] = res.data.data;
    console.log({ data });
    const wsData = exportExcel.header;
    data.forEach((item, index) => {
      wsData.push(exportExcel.content(item, index));
    });

    const ws = XLSX.utils.aoa_to_sheet(wsData);

    const colWidths = exportExcel.colWidths;
    ws["!cols"] = colWidths.map((width) => ({ width }));

    XLSX.utils.book_append_sheet(wb, ws, exportExcel.fileName);

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${exportExcel.fileName}.xlsx`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExportCsv = async () => {
    if (!exportCsv) return;
    const wb = XLSX.utils.book_new();

    const res = await axiosInstance.get(exportCsv.url);
    const data: DataType[] = res.data.data;

    const wsData = exportCsv.header;

    data.forEach((item, index) => {
      wsData.push(exportCsv.content(item, index));
    });

    const ws = XLSX.utils.aoa_to_sheet(wsData);

    const colWidths = exportCsv.colWidths;
    ws["!cols"] = colWidths.map((width) => ({ width }));

    XLSX.utils.book_append_sheet(wb, ws, exportCsv.fileName);

    const excelBuffer = XLSX.write(wb, { bookType: "csv", type: "array" });

    const blob = new Blob([excelBuffer], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${exportCsv.fileName}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExportPDF = async () => {
    try {
      setIsLoading(true);

      // if (!exportPdf?.url) {
      //   throw new Error("No PDF export URL configured");
      // }

      // await exportToPDF(null, {
      //   endpoint: exportPdf.url,
      //   templateComponent: exportPdf.template || "",
      //   fileName: exportPdf.fileName || "exported_data",
      //   size: "A4",
      //   orientation: "portrait",
      //   scale: 1,
      // });

      setIsExportSuccessVisible(true);
    } catch (error) {
      console.error("Error exporting PDF:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-end">
      {isLoading && <OverlayLoader />}

      {/* Export Button */}
      {showExportButton && (
        <button
          type="button"
          className="btn btn-light me-3 border border-2"
          onClick={openExportModal}
        >
          <KTIcon iconName="exit-down" className="fs-2 text-center mt-1" />
          Export
        </button>
      )}

      {/* Import Button */}
      <button
        type="button"
        className="btn btn-light me-3 border border-2"
        onClick={openImportModal}
      >
        <KTIcon iconName="exit-up" className="fs-2 mb-1" />
        Import
      </button>

      {/* Export Modal */}
      {isExportModalVisible && (
        <ExportModal
          closeModal={handleCloseExport}
          onConfirm={handleExportConfirm}
          showSuccess={isExportSuccessVisible}
          showPdfOption={!!exportPdf}
          showExcelOption={!!exportExcel}
          showCsvOption={!!exportCsv}
        />
      )}

      {/* Import Modal */}
      {isImportModalVisible && (
        <ImportModal
          closeModal={handleCloseImport}
          onConfirm={handleImportConfirm}
          showSuccess={isImportSuccessVisible}
          onDownloadTemplate={handleDownloadTemplate} // Pass the handler
        />
      )}
    </div>
  );
};

ListToolbar.defaultProps = {
  urlImport: "",
  exportPdfUrl: "",
  exportPdfLayout: "default",
};

export { ListToolbar };
