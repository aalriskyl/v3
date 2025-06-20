/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { KTIcon } from "@metronic/helpers";
import ExportModal from "@metronic/layout/components/modals/Export";
import ImportModal from "@metronic/layout/components/modals/Import";
import * as XLSX from "xlsx";
import axiosInstance from "../../../../../../../../service/axiosInstance";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";

type DataType = {
  created_at: string;
  id: string;
  no_sales_order: string;
  status: string;
  updated_at: string;
};


const ListToolbar = ({urlImport}: any) => {
  const [isExportModalVisible, setExportModalVisible] = useState(false);
  const [isImportModalVisible, setImportModalVisible] = useState(false);
  const [isImportSuccessVisible, setIsImportSuccessVisible] = useState("");
  const [isExportSuccessVisible, setIsExportSuccessVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const openExportModal = () => setExportModalVisible(true);
  const openImportModal = () => setImportModalVisible(true);

  const handleExportConfirm = (selectedFormat: string) => {
    console.log("Export confirmed");
    if (selectedFormat === "excel") {
      handleExportExcel();
    } else if (selectedFormat === "csv") {
      handleExportCsv();
    }
  };

  const handleImportConfirm = async (file: File) => {
    console.log("Import confirmed with file:", file.name);

    setIsLoading(true)
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await axiosInstance.post(urlImport, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log('File uploaded successfully:', response.data);
      setIsImportSuccessVisible("success");
    }catch (error: any) {
      console.error('Error uploading file:', error.response.data.field);
      // Handle error
      setIsImportSuccessVisible("failed")
      return error.response.data.field;
    }finally{
      setIsLoading(false)
    }
  };

  const handleCloseExport = () => {
    setExportModalVisible(false);
    setIsExportSuccessVisible(false);
  };

  const handleCloseImport = () => {
    setImportModalVisible(false);
    setIsImportSuccessVisible("");
    window.location.reload()
  };

  const handleExportExcel = async () => {
    const wb = XLSX.utils.book_new();

    const res = await axiosInstance.get("/sales/submission/sales-order");
    const data: DataType[] = res.data.data.sales_orders;
    const wsData = [["No", "Nomor Sales Order", "Status"]];

    data.forEach((item, index) => {
      wsData.push([(index + 1).toString(), item.no_sales_order, item.status]);
    });

    const ws = XLSX.utils.aoa_to_sheet(wsData);

    const colWidths = [15, 30, 15, 20, 20, 20, 10];
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
    const wb = XLSX.utils.book_new();

    const res = await axiosInstance.get("/sales/submission/sales-order");
    const data: DataType[] = res.data.data.sales_orders;
    console.log(data);
    const wsData = [["No", "Nomor Sales Order", "Status"]];

    data.forEach((item, index) => {
      wsData.push([(index + 1).toString(), item.no_sales_order, item.status]);
    });

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

  return (
    <div className="d-flex justify-content-end">
      
      {isLoading && <OverlayLoader/> }
      
      {/* Export Button */}
      <button
        type="button"
        className="btn btn-light me-3 border border-2"
        onClick={openExportModal}
      >
        <KTIcon iconName="exit-down" className="fs-2 text-center mt-1" />
        Export
      </button>

      {/* Export Modal */}
      {isExportModalVisible && (
        <ExportModal
          closeModal={handleCloseExport}
          onConfirm={handleExportConfirm}
          showSuccess={isExportSuccessVisible}
        />
      )}

      {/* Import Modal */}
      {isImportModalVisible && (
        <ImportModal
          closeModal={handleCloseImport}
          onConfirm={handleImportConfirm}
          showSuccess={isImportSuccessVisible}
        />
      )}
    </div>
  );
};


ListToolbar.defaultProps = {
  urlImport: ''
};

export { ListToolbar };
