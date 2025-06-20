import React, { FC, useEffect, useState } from "react";
import { PageLink, PageTitle } from "@metronic/layout/core";
import { useParams, useNavigate } from "react-router-dom";
import { DeleteConfirmationModal } from "@metronic/layout/components/form/organism/DeleteModal";
import SuccessModal from "@metronic/layout/components/form/organism/SuccessModal";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";
import InputField from "@metronic/layout/components/form/molecules/InputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import MaterialDetailSectionLayout from "../../components/template/MaterialDetailSectionLayout";
import LayananDetailSectionLayout from "../../components/template/LayananDetailSectionLayout";
import axiosInstance from "../../../../../../../service/axiosInstance";
import { UserTwoStepsCell } from "../../components/organisms/table/columns/UserTwoStepsCell";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";
import { SubmitConfirmationModal } from "@metronic/layout/components/form/organism/SubmitModal";
import TermsOfPaymentLayout from "../../components/template/TermsOfPaymentLayout";
import InvoiceLayout from "../../components/template/InvoiceLayout";
import ExportModal from "@metronic/layout/components/modals/Export";
import { KTIcon } from "@metronic/helpers";
import ExcelJS from "exceljs";
import * as XLSX from "xlsx";
import { formatDateToMonthYear } from "../../../../../../helper/formatDate";

const breadcrumbs: Array<PageLink> = [
  {
    title: "Dashboard",
    path: "/",
    isSeparator: false,
    isActive: true,
  },
  {
    title: "Accounting",
    path: "/accounting",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "Manajemen Transaksi",
    path: "/accounting/manajemen-transaksi",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "Purchase Order",
    path: "/accounting/manajemen-transaksi/purchase-order",
    isSeparator: false,
    isActive: true,
  },
];

interface FormData {
  tax: any;
  income_tax: any;
}

const validationSchema = Yup.object().shape({
  tax: Yup.number()
    .typeError("Pajak PPN harus berupa angka")
    .required("Harap masukan pajak PPN")
    .min(0, "Pajak PPN tidak boleh kurang dari 0")
    .max(100, "Pajak PPN tidak boleh lebih dari 100"),
  income_tax: Yup.number()
    .typeError("Pajak PPH harus berupa angka")
    .required("Harap masukan pajak PPH")
    .min(0, "Pajak PPH tidak boleh kurang dari 0")
    .max(100, "Pajak PPH tidak boleh lebih dari 100"),
});

const DetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any>(null);
  const [coaData, setCoaData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isDeleteSuccessModalVisible, setIsDeleteSuccessModalVisible] =
    useState(false);
  const [isDeleteFailedModalVisible, setIsDeleteFailedModalVisible] =
    useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [changeStatus, setChangeStatus] = useState("");
  const [isStatusModalVisible, setIsStatusModalVisible] = useState(false);
  const [isChangeStatusLoading, setIsChangeStatusLoading] = useState(false);
  const [
    isChangeStatusSuccessModalVisible,
    setIsChangeStatusSuccessModalVisible,
  ] = useState(false);
  const [changeStatusFailedMessage, setChangeStatusFailedMessage] = useState<
    null | string
  >(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      tax: "0",
      income_tax: "0",
    },
  });

  const getDetailAccountPayable = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `/accounting/management-transaction/account-payable/${id}`
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching account payable:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCoaTax = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `/accounting/management-accounting/company-coa`
      );
      setCoaData(response.data.data);
    } catch (error) {
      console.error("Error fetching COA data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDetailAccountPayable();
    getCoaTax();
  }, []);

  useEffect(() => {
    if (coaData || data) {
      reset({
        tax: data?.percent_tax?.toString() || coaData?.tax?.toString() || "0",
        income_tax:
          data?.percent_income_tax?.toString() ||
          coaData?.income_tax?.toString() ||
          "0",
      });
    }
  }, [coaData, data, reset]);

  const taxPpnPercentage = watch("tax");
  const taxPphPercentage = watch("income_tax");
  const subTotal = data?.sub_total || 0;

  const nominalPphTax = taxPphPercentage
    ? (parseFloat(taxPphPercentage) / 100) * subTotal
    : 0;
  const nominalTax = taxPpnPercentage
    ? (parseFloat(taxPpnPercentage) / 100) * subTotal
    : 0;

  const handleUpdateTaxes = async (formData: FormData) => {
    setIsLoading(true);
    try {
      const payload = {
        purchase_order_id: data?.purchase_order?.id,
        percent_tax: Number(formData.tax),
        percent_income_tax: Number(formData.income_tax),
      };

      await axiosInstance.put(
        `/accounting/management-transaction/account-payable/${id}`,
        payload
      );

      await getDetailAccountPayable();
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000); // Hide after 3 seconds
    } catch (error) {
      console.error("Error updating taxes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate("../");
  };

  const handleDeleteAction = async () => {
    setIsDeleteLoading(true);
    try {
      await axiosInstance.delete(
        `/accounting/management-transaction/account-payable/${id}`
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
        `/accounting/management-transaction/account-payable/status/${id}`,
        {
          status: changeStatus,
        }
      );
      await getDetailAccountPayable();
      setIsStatusModalVisible(false);
      setIsChangeStatusSuccessModalVisible(true);
    } catch (error) {
      setIsStatusModalVisible(false);
      const field = (error as any)?.response?.data?.field;
      if (field) {
        let errorMessage = null;
        Object.keys(field).forEach((key) => {
          errorMessage = key.length > 3 ? `${key} : ${field[key]}` : null;
        });
        setChangeStatusFailedMessage(
          errorMessage !== null
            ? errorMessage
            : field || "Terjadi kesalahan saat mengubah status."
        );
      }
    } finally {
      setIsChangeStatusLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(`/accounting/manajemen-transaksi/purchase-order/edit/${id}`);
  };

  const formatDecimal = (value?: number) => {
    if (value === undefined || value === null) return "-";
    return value.toLocaleString("id-ID", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <>
      {(isChangeStatusLoading || isDeleteLoading || isLoading) && (
        <OverlayLoader />
      )}

      <div className="position-relative">
        <PageTitle breadcrumbs={breadcrumbs}>Detail Purchase Order</PageTitle>
        <div
          className="position-absolute"
          style={{ top: "-5rem", right: "1rem" }}
        >
          <ButtonExport data={data} />
        </div>
      </div>

      <div className="font-secondary">
        <div className="w-100">
          <div className="card p-5">
            <div className="row g-2">
              <h3 className="mb-6">Purchase Order</h3>
              <div className="col-md-6">
                <label className="form-label fw-bold">
                  Nomor Purchase Request
                </label>
                <p className="text-lg font-medium">
                  {data?.purchase_order?.no_purchase_order}
                </p>

                <label className="form-label fw-bold">Requested By</label>
                <p className="text-lg font-medium">
                  {data?.request_by?.name || "-"}
                </p>

                <label className="form-label fw-bold">Submitted By</label>
                <p className="text-lg font-medium">
                  {data?.submitted_by?.name || "-"}
                </p>

                <label className="form-label fw-bold">Approved By</label>
                <p className="text-lg font-medium">
                  {data?.approved_by?.name || "-"}
                </p>

                <div>
                  <label className="form-label fw-bold">Status</label>
                </div>
                <UserTwoStepsCell status={data?.status} />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold">Tanggal Pembuatan</label>
                <p className="text-lg font-medium">
                  {data?.created_at
                    ? formatDate(new Date(data?.created_at))
                    : "-"}
                </p>

                <label className="form-label fw-bold">Tanggal Submitted</label>
                <p className="text-lg font-medium">
                  {data?.submitted_date
                    ? formatDate(new Date(data?.submitted_date))
                    : "-"}
                </p>

                <label className="form-label fw-bold">Tanggal Approve</label>
                <p className="text-lg font-medium">
                  {data?.approved_date
                    ? formatDate(new Date(data?.approved_date))
                    : "-"}
                </p>
              </div>
            </div>
          </div>

          <div className="card p-5 w-100 mt-8">
            <h4 className="mb-8">Material</h4>
            <MaterialDetailSectionLayout
              status={data?.status}
              preOrderId={data?.purchase_order.id}
            />
          </div>

          <div className="card p-5 w-100 mt-8">
            <h4 className="mb-8">Layanan</h4>
            <LayananDetailSectionLayout
              status={data?.status}
              preOrderId={data?.purchase_order.id}
            />
          </div>

          <div className="card p-5 w-100 mt-8">
            <div className="row g-2">
              <h3 className="">Payment Terms</h3>
              <TermsOfPaymentLayout />
            </div>
          </div>

          <div className="card p-5 w-100 mt-8">
            <div className="row g-2">
              <h3 className="">Faktur Pembelian</h3>
              <InvoiceLayout purchase_order_id={data?.purchase_order?.id} />
            </div>
          </div>

          <div className="card p-5 w-100 mt-8">
            <div className="row g-4">
              <h3 className="mb-4">Pajak</h3>
              {saveSuccess && (
                <div className="alert alert-success d-flex align-items-center p-5 mb-10">
                  <i className="fas fa-check-circle fs-2hx text-success me-3"></i>
                  <div className="d-flex flex-column">
                    <h4 className="mb-1 text-success">Berhasil!</h4>
                    <span>Perubahan pajak berhasil disimpan.</span>
                  </div>
                </div>
              )}
              <form id="tax-form" onSubmit={handleSubmit(handleUpdateTaxes)}>
                <div className="row">
                  {/* First Row */}
                  <div className="col-md-6">
                    <InputField
                      name="tax"
                      label="Persentase PPN (%)"
                      placeholder="Masukkan persentase PPN"
                      type="number"
                      control={control}
                      errors={errors}
                      disabled={data?.status !== "Draft"}
                    />
                  </div>
                  <div className="col-md-6">
                    <InputField
                      name="income_tax"
                      label="Persentase PPH (%)"
                      placeholder="Masukkan persentase PPH"
                      type="number"
                      control={control}
                      errors={errors}
                      disabled={data?.status !== "Draft"}
                    />
                  </div>

                  {/* Second Row */}
                  {/* <div className="col-md-6 mt-3">
                    <label className="form-label fw-bold">Nominal PPN</label>
                    <p className="text-lg font-medium">
                      Rp{formatDecimal(nominalTax)}
                    </p>
                  </div>
                  <div className="col-md-6 mt-3">
                    <label className="form-label fw-bold">Nominal PPH</label>
                    <p className="text-lg font-medium">
                      Rp{formatDecimal(nominalPphTax)}
                    </p>
                  </div> */}
                </div>
                <div className="col-12 text-end mt-4"></div>
              </form>
            </div>
          </div>

          <div className="d-flex justify-content-end row">
            <div className="col-12 text-end my-4">
              <div className="d-flex align-items-center justify-content-end gap-2">
                <button
                  type="button"
                  onClick={handleBack}
                  className="btn px-8 py-3 border border-gray-500"
                >
                  Back
                </button>

                {data?.status === "Draft" && (
                  <>
                    <button
                      type="button"
                      onClick={() => setIsDeleteModalVisible(true)}
                      className="btn px-8 py-3 border border-gray-500"
                    >
                      Hapus
                    </button>
                    <button
                      type="button"
                      onClick={handleEdit}
                      className="btn btn-primary px-8 py-3 border border-primary"
                    >
                      Ubah
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary px-8 py-3"
                      form="tax-form"
                      disabled={!isValid || isLoading}
                    >
                      {isLoading ? "Menyimpan..." : "Simpan Draft"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsStatusModalVisible(true);
                        setChangeStatus("Submitted");
                      }}
                      className="btn px-8 py-3 border border-primary bg-primary text-white"
                    >
                      Submit
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
                      className="btn btn-danger px-8 py-3"
                    >
                      Rejected
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsStatusModalVisible(true);
                        setChangeStatus("Approved");
                      }}
                      className="btn btn-success px-8 py-3"
                    >
                      Approved
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
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
            closeModal={() => setIsDeleteSuccessModalVisible(false)}
          />
        )}

        {isDeleteFailedModalVisible && (
          <FailedModal
            title="Gagal"
            message="Terjadi kesalahan saat menghapus data."
            closeModal={() => setIsDeleteFailedModalVisible(false)}
          />
        )}

        {changeStatusFailedMessage && (
          <FailedModal
            title="Gagal"
            message={changeStatusFailedMessage}
            closeModal={() => setChangeStatusFailedMessage(null)}
          />
        )}

        {isStatusModalVisible && (
          <SubmitConfirmationModal
            title={`Yakin ${changeStatus}?`}
            confirmLabel={changeStatus}
            onConfirmApproved={handleChangeStatusAction}
            closeModal={() => setIsStatusModalVisible(false)}
          />
        )}

        {isChangeStatusSuccessModalVisible && (
          <SuccessModal
            title="Berhasil"
            successMessage={`Status berhasil di update ke ${changeStatus.toLocaleLowerCase()}`}
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

type PaymentTerms = {
  id: string;
  name: string;
  invoice_portion: number;
  due_date: string;
  credit: number;
  description: null | any;
  purchase_payment_terms_id: string;
  purchase_payment_terms: null | any;
  account_receivable_id: string;
  company_id: string;
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: null | any;
};

const ButtonExport = ({ data }: { data?: any }) => {
  const params = useParams();
  const [isExportModalVisible, setIsExportModalVisible] = useState(false);
  const [isExportSuccessVisible, setIsExportSuccessVisible] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getMaterial = async () => {
    try {
      const response = await axiosInstance.get(
        `/procurement/submission/purchase-order/purchase-order-material/purchase-order/${data?.purchase_order?.id}`
      );
      console.log({ material: response });
      // setMaterial(response.data.data.sales_order_materials);
      return response.data.data.purchase_order_materials;
    } catch (error) {}
  };

  const getService = async () => {
    try {
      const response = await axiosInstance.get(
        `/procurement/submission/purchase-order/purchase-order-service/purchase-order/${data?.purchase_order?.id}`
      );
      console.log({ service: response });
      return response.data.data.purchase_order_services;
    } catch (error) {}
  };

  const getPaymentTerms = async () => {
    try {
      const response = await axiosInstance.get(
        `/accounting/management-transaction/account-receivable/sales-payment-terms/account-receivable/${params?.id}`
      );
      console.log({ service: response });
      return response.data.data.sales_payment_terms;
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
      // const paymentTerms: PaymentTerms[] = await getPaymentTerms();

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
      const worksheet = workbook.addWorksheet("Purchase Order");

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
      const titleRow = worksheet.addRow(["PURCHASE ORDER REPORT"]);
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
          "Tanggal Pembuatan",
          formatDateToMonthYear(data?.created_at),
          "",
        ],
        [
          "Request By",
          data?.request_by?.name || "-",
          "",
          "",
          "Tanggal Submitted",
          formatDateToMonthYear(data?.submitted_date),
          "",
        ],
        [
          "Submitted by",
          data?.submitted_by?.name,
          "",
          "",
          "Tanggal Approve",
          formatDateToMonthYear(data?.approved_date),
          "",
        ],
        [
          "Approved By",
          data?.approved_by?.name || "-",
          "",
          "",
          "Status",
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

      // // Add Service section header
      // const paymentTermsHeaderRow = worksheet.addRow(["PAYMENT TERMS"]);
      // headerStyle(paymentTermsHeaderRow);
      // worksheet.mergeCells(
      //   `A${paymentTermsHeaderRow.number}:C${paymentTermsHeaderRow.number}`
      // );
      // paymentTermsHeaderRow.height = 25;
      // paymentTermsHeaderRow.getCell(1).alignment = { vertical: "middle" };

      // // Add Service column headers
      // const paymentTermsColumnHeaderRow = worksheet.addRow([
      //   "Nama",
      //   "Invoice Portion",
      //   "Due Date",
      // ]);
      // // Style the column headers
      // for (let i = 1; i <= 3; i++) {
      //   const cell = paymentTermsColumnHeaderRow.getCell(i);
      //   cell.fill = {
      //     type: "pattern",
      //     pattern: "solid",
      //     fgColor: { argb: "fabfba" },
      //   };
      //   cell.font = { bold: true, color: { argb: "000000" } };
      //   cell.border = {
      //     top: { style: "thin" },
      //     left: { style: "thin" },
      //     bottom: { style: "thin" },
      //     right: { style: "thin" },
      //   };
      //   cell.alignment = { horizontal: "center", vertical: "middle" };
      // }
      // paymentTermsColumnHeaderRow.height = 20;

      // // Add service items
      // paymentTerms.forEach((item) => {
      //   const row = worksheet.addRow([
      //     item?.name,
      //     item?.invoice_portion,
      //     formatDateToMonthYear(item?.due_date),
      //   ]);

      //   // Style all cells in the row
      //   for (let i = 1; i <= 3; i++) {
      //     const cell = row.getCell(i);
      //     cell.border = {
      //       top: { style: "thin" },
      //       left: { style: "thin" },
      //       bottom: { style: "thin" },
      //       right: { style: "thin" },
      //     };
      //   }

      //   // Format price cell
      //   // const priceCell = row.getCell(2);
      //   // priceCell.numFmt = '"Rp. "#,##0.00';
      // });

      // // Add empty rows
      // worksheet.addRow([]);
      // worksheet.addRow([]);

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
      const fileName = `Purchase_Order_${data?.purchase_order?.no_purchase_order}_${formattedDate}.xlsx`;

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

      const rows: any[][] = [];

      // Title
      rows.push(["PURCHASE ORDER REPORT"]);
      rows.push([]);

      // Header Information
      const headerRows = [
        [
          "Nomor Purchase Request",
          data?.purchase_order?.no_purchase_order || "-",
          "",
          "",
          "Tanggal Pembuatan",
          formatDateToMonthYear(data?.created_at),
        ],
        [
          "Request By",
          data?.request_by?.name || "-",
          "",
          "",
          "Tanggal Submitted",
          formatDateToMonthYear(data?.submitted_date),
        ],
        [
          "Submitted By",
          data?.submitted_by?.name || "-",
          "",
          "",
          "Tanggal Approve",
          formatDateToMonthYear(data?.approved_date),
        ],
        [
          "Approved By",
          data?.approved_by?.name || "-",
          "",
          "",
          "Status",
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
      XLSX.utils.book_append_sheet(workbook, worksheet, "Purchase Order");

      // Generate CSV buffer
      const csvOutput = XLSX.write(workbook, {
        bookType: "csv",
        type: "array",
      });

      // Create a custom file name with date
      const date = new Date();
      const formattedDate = `${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()}`;
      const fileName = `Purchase_Order_${data?.purchase_order?.no_purchase_order}_${formattedDate}.csv`;

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
    // const print = document.getElementById("download-sales-order-pdf");
    // if (print) {
    //   print.click();
    // }
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
