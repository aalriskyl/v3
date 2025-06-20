import React, { FC, useEffect, useState } from "react";
import { PageLink, PageTitle } from "@metronic/layout/core";
import { useParams, useNavigate } from "react-router-dom";
import { DeleteConfirmationModal } from "@metronic/layout/components/form/organism/DeleteModal";
import SuccessModal from "@metronic/layout/components/form/organism/SuccessModal";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";
import MaterialDetailSectionLayout from "../../components/template/MaterialDetailSectionLayout";
import axiosInstance from "../../../../../../../service/axiosInstance";
import { SubmitConfirmationModal } from "@metronic/layout/components/form/organism/SubmitModal";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";
import { KTIcon } from "@metronic/helpers";
import ExportModal from "@metronic/layout/components/modals/Export";
import * as XLSX from "xlsx";
import { PDFDownloadLink } from "@react-pdf/renderer";
import SalesOrderDetailPDF from "../../components/template/SalesOrderDetailPDF";
import { UserTwoStepsCell } from "../../components/organisms/table/columns/UserTwoStepsCell";
import { DetailView } from "../../core/_models";
import { formatDateToMonthYear } from "../../../../../../helper/formatDate";
import { getErrorMessage } from "../../../../../../helper/getErrorMessage";
import { useForm } from "react-hook-form";
import InputField from "@metronic/layout/components/form/molecules/InputField";
import SelectField from "@metronic/layout/components/form/molecules/SelectField";

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
    title: "Pembayaran Faktur Pembelian",
    path: "/procurement/pengajuan/pembayaran-faktur-pembelian",
    isSeparator: false,
    isActive: false,
  },
];

interface FormData {
  coa_payment_id: string | null;
  amount: string;
  purchase_invoice_id: string;
}

const DetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<undefined | DetailView>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [failedMessage, setFailedMessage] = useState<string | null>(null);

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

  const [coaChoice, setCoaChoice] = useState<CoaChoiceType[]>([]);

  const navigate = useNavigate();

  const {
    control,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<FormData>({
    mode: "onTouched",
    // resolver: yupResolver(validationSchema),
    defaultValues: {
      coa_payment_id: "",
      amount: "",
      purchase_invoice_id: "",
    },
  });

  const coa_payment_id = watch("coa_payment_id");
  const amount = watch("amount");
  const purchase_invoice_id = watch("purchase_invoice_id");

  const isSaveAsDraftValid =
    coa_payment_id && coa_payment_id?.length > 0 && amount.length > 0;

  const getDetail = async () => {
    setIsLoadData(true);
    try {
      const response = await axiosInstance.get(
        `/procurement/submission/payment-purchase-invoice/${id}?company_id=${localStorage.getItem(
          "company_id"
        )}`
      );
      const data = response.data.data;
      setData(data);
      console.log({ getDetail: data });

      const { purchase_invoice, coa_payment, amount }: DetailView = data;

      setValue("amount", amount.toString() || "0");
      setValue("coa_payment_id", coa_payment?.id || null);
      setValue("purchase_invoice_id", purchase_invoice.id);
    } catch (error) {
      return;
    } finally {
      setIsLoadData(false);
    }
  };

  const updatePayment = async () => {
    try {
      const payload = {
        purchase_invoice_id,
        coa_payment_id: coa_payment_id,
        amount: parseFloat(amount),
      };
      console.log({ payload });
      const response = await axiosInstance.put(
        `/procurement/submission/payment-purchase-invoice/${id}?company_id=${localStorage.getItem(
          "company_id"
        )}`,
        payload
      );
      console.log({ response });
      if (changeStatus === "") {
        await getDetail();
        setIsSuccessModalVisible(true);
      }
    } catch (error) {
      setFailedMessage(getErrorMessage(error));
    } finally {
      setIsLoadData(false);
      setIsModalVisible(false);
    }
  };

  useEffect(() => {
    axiosInstance
      .get(`/accounting/master-data/coa/select?payment=true`)
      .then((res) => {
        console.log({ getSelectCoa: res.data.data });
        const data = res.data.data;
        setCoaChoice(data);
      });
  }, []);

  useEffect(() => {
    getDetail();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleDeleteAction = async () => {
    setIsDeleteLoading(true);
    try {
      await axiosInstance.delete(
        `/procurement/submission/payment-purchase-invoice/${id}?company_id=${localStorage.getItem(
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
      if (changeStatus === "Submitted") {
        await updatePayment();
      }
      await axiosInstance.put(
        `/procurement/submission/payment-purchase-invoice/status/${id}?company_id=${localStorage.getItem(
          "company_id"
        )}`,
        {
          status: changeStatus,
        }
      );
      await getDetail();
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
    navigate(`/procurement/pengajuan/pembayaran-faktur-pembelian/edit/${id}`);
  };

  return (
    <>
      {(isChangeStatusLoading || isDeleteLoading || isLoadData) && (
        <OverlayLoader />
      )}

      <div className="position-relative">
        <PageTitle breadcrumbs={breadcrumbs}>
          Detail Pembayaran Faktur Pembelian
        </PageTitle>
        <div
          className="position-absolute"
          style={{ top: "-5rem", right: "1rem" }}
        >
          {/* <ButtonExport data={data} /> */}
        </div>
      </div>

      <div className="font-secondary">
        <div className="card p-5 w-100 mb-8">
          <h3 className="mb-6">Pembayaran Faktur Pembelian</h3>
          <div className="row">
            <div className="col-md-6">
              <div>
                <label className="form-label fw-bold">
                  Nomor Pembayaran Faktur Pembelian
                </label>
                <p className="text-lg font-medium">
                  {data?.no_payment_purchase_invoice || "-"}
                </p>
              </div>
              <div>
                <label className="form-label fw-bold">Request By</label>
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
                <label className="form-label fw-bold">Status</label>
                <p className="text-lg font-medium">
                  <UserTwoStepsCell status={data?.status} />
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div>
                <label className="form-label fw-bold">
                  Nomor Faktur Pembelian
                </label>
                <p className="text-lg font-medium">
                  {data?.purchase_invoice.no_purchase_invoice || "-"}
                </p>
              </div>
              <div>
                <label className="form-label fw-bold">Tanggal Pembuatan</label>
                <p className="text-lg font-medium">
                  {data?.created_at
                    ? formatDateToMonthYear(data?.created_at)
                    : "-"}
                </p>
              </div>
              <div>
                <label className="form-label fw-bold">Tanggal Submitted</label>
                <p className="text-lg font-medium">
                  {formatDateToMonthYear(data?.submitted_date) || "-"}
                </p>
              </div>
              <div>
                <label className="form-label fw-bold">Tanggal Approved</label>
                <p className="text-lg font-medium">
                  {formatDateToMonthYear(data?.approved_date)}
                </p>
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
              <span>{data?.purchase_payment_terms?.name || "-"}</span>
            </div>
            <div className="col-md-6">
              <div>
                <h6>Invoice Portion</h6>
              </div>
              <span>{data?.purchase_payment_terms?.invoice_portion}%</span>
            </div>
          </div>
          <div className="row mt-8">
            <div className="col-md-6">
              <div>
                <h6>Due Date</h6>
              </div>
              <span>
                {data?.purchase_payment_terms?.due_date
                  ? formatDateToMonthYear(
                      data?.purchase_payment_terms?.due_date
                    )
                  : "-"}
              </span>
            </div>
          </div>
        </div>
        <div className="card p-5 w-100 mt-8">
          <h4 className="mb-4">Pajak</h4>
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="mb-2">
                <div>
                  <h6>Presentase PPN</h6>
                </div>
                <span>{data?.purchase_invoice?.percent_tax || "-"}% </span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-2">
                <div>
                  <h6>Presentase PPH</h6>
                </div>
                <span>
                  {data?.purchase_invoice?.percent_income_tax || "-"}%
                </span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex flex-column h-100 justify-content-center">
                <label className="form-label fw-bold mb-2">Nominal PPN</label>
                <p className="text-lg font-medium m-0">
                  Rp.{formatDecimal(data?.purchase_invoice?.nominal_tax)}
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex flex-column h-100 justify-content-center">
                <label className="form-label fw-bold mb-2">Nominal PPH</label>
                <p className="text-lg font-medium m-0">
                  Rp.{formatDecimal(data?.purchase_invoice?.nominal_income_tax)}
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
                <h6>
                  Rp.
                  {formatDecimal(
                    data?.purchase_invoice.total_purchase_material
                  )}
                </h6>
              </div>
              <div className="g-2 mb-5 d-flex justify-content-between align-items-center">
                <div className="text-gray-500">
                  <span>Total Harga Layanan</span>
                </div>
                <h6>
                  Rp.
                  {formatDecimal(data?.purchase_invoice.total_purchase_service)}
                </h6>
              </div>
              <div className="g-2 mb-5 d-flex justify-content-between align-items-center">
                <div className="text-gray-500">
                  <span>Sub Total Harga Material</span>
                </div>
                <h6>
                  Rp.{formatDecimal(data?.purchase_invoice.sub_total_material)}
                </h6>
              </div>
              <div className="g-2 mb-5 d-flex justify-content-between align-items-center">
                <div className="text-gray-500">
                  <span>Sub Total Harga Layanan</span>
                </div>
                <h6>
                  Rp.{formatDecimal(data?.purchase_invoice.sub_total_service)}
                </h6>
              </div>

              <div className="g-2 mb-5 d-flex justify-content-between align-items-center">
                <div className="text-gray-500">
                  <span>Sub Total</span>
                </div>
                <h6>
                  Rp.
                  {formatDecimal(data?.purchase_invoice.sub_total)}
                </h6>
              </div>
              <div className="g-2 mb-5 d-flex justify-content-between align-items-center">
                <div className="text-gray-500">
                  <span>Sub Total Dengan Pajak</span>
                </div>
                <h6>
                  Rp.{formatDecimal(data?.purchase_invoice.sub_total_tax)}
                </h6>
              </div>
              <div className="g-2 mb-5 d-flex justify-content-between align-items-center">
                <div className="text-gray-500">
                  <span>Nominal Pembulatan</span>
                </div>
                <h6>Rp.{formatDecimal(data?.purchase_invoice.total_ceil)}</h6>
              </div>
              <hr className="my-6 border-top border-gray-500" />
              <div className="g-2 mb-5 d-flex justify-content-between align-items-center">
                <div>
                  <h4>Grand Total</h4>
                </div>
                <h4 className="fw-bolder">
                  Rp.{formatDecimal(data?.purchase_invoice.grand_total)}
                </h4>
              </div>
              <div className="g-2 mb-5 d-flex justify-content-between align-items-center">
                <div className="text-gray-500">
                  <span>Di bayar</span>
                </div>
                <h6>Rp.{formatDecimal(data?.amount)}</h6>
              </div>
              <div className="g-2 mb-5 d-flex justify-content-between align-items-center">
                <div className="text-gray-500">
                  <span>Total Sudah Di bayar</span>
                </div>
                <h6>Rp.{formatDecimal(data?.purchase_invoice.total_paid)}</h6>
              </div>
              <div className="row g-6">
                <div className="col-md-6">
                  <InputField
                    disabled={data?.status !== "Draft"}
                    name="amount"
                    label="Amount"
                    type="number"
                    control={control}
                    errors={errors}
                    placeholder="Masukkan amount"
                  />
                </div>
                <div className="col-md-6">
                  <SelectField
                    disabled={data?.status !== "Draft"}
                    name="coa_payment_id"
                    label="Metode pembayaran"
                    control={control}
                    errors={errors}
                    options={coaChoice.map((item) => ({
                      label: item.name,
                      value: item.id,
                    }))}
                    placeholder="Pilih metode pembayaran"
                  />
                </div>
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
                    (data?.purchase_invoice.grand_total || 0) -
                      (data?.purchase_invoice.total_paid || 0)
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
                  className="btn btn-primary px-12 py-3 border border-primary me-2"
                >
                  Ubah
                </button>
                <button
                  disabled={!isSaveAsDraftValid}
                  type="button"
                  onClick={updatePayment}
                  className="btn btn-primary px-12 py-3 border border-primary me-8"
                >
                  Save as draft
                </button>
                <button
                  disabled={!isSaveAsDraftValid}
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
            successMessage={`Status berhasil di ubah ke${changeStatus.toLocaleLowerCase()}`}
            closeModal={() => {
              setIsChangeStatusSuccessModalVisible(false);
              setChangeStatus("");
            }}
          />
        )}
        {failedMessage && (
          <FailedModal
            closeModal={() => setFailedMessage(null)}
            message={failedMessage}
            confirmLabel={"Tutup"}
          />
        )}
        {isSuccessModalVisible && (
          <SuccessModal
            closeModal={() => {
              setIsSuccessModalVisible(false);
            }}
            successMessage={"Data Berhasil disimpan"}
          />
        )}
      </div>
    </>
  );
};

export default DetailPage;

const formatDecimal = (value?: number) => {
  if (value === undefined || value === null) return "-";
  return value.toLocaleString("id-ID", {
    style: "decimal",
  });
};

type CoaChoiceType = {
  id: string;
  name: string;
  no_account: string;
  parent_account: null | any;
  status: boolean;
  type: string;
};
