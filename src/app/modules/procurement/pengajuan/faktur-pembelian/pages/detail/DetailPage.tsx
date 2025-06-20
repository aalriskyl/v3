import React, { FC, useEffect, useState } from "react";
import { PageLink, PageTitle } from "@metronic/layout/core";
import { useParams, useNavigate } from "react-router-dom";
import { DeleteConfirmationModal } from "@metronic/layout/components/form/organism/DeleteModal";
import SuccessModal from "@metronic/layout/components/form/organism/SuccessModal";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";
import * as Yup from "yup";
import MaterialDetailSectionLayout from "../../components/template/MaterialDetailSectionLayout";
import axiosInstance from "../../../../../../../service/axiosInstance";
import { SubmitConfirmationModal } from "@metronic/layout/components/form/organism/SubmitModal";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";
import { UserTwoStepsCell } from "../../components/organisms/table/columns/UserTwoStepsCell";
import { DetailView } from "../../core/_models";
import { formatDateToMonthYear } from "../../../../../../helper/formatDate";
import { getErrorMessage } from "../../../../../../helper/getErrorMessage";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

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
  const [data, setData] = useState<DetailView | undefined>();
  const [coaData, setCoaData] = useState<any>();
  const navigate = useNavigate();

  // Modal states
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isDeleteSuccessModalVisible, setIsDeleteSuccessModalVisible] =
    useState(false);
  const [isDeleteFailedModalVisible, setIsDeleteFailedModalVisible] =
    useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const [failedMessageChangeStatus, setFailedMessageChangeStatus] = useState<
    string | null
  >(null);
  const [failedMessage, setFailedMessage] = useState<string | null>(null);
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
  const [isFailedModalVisible, setIsFailedModalVisible] = useState(false);

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
      title: "Faktur Pembelian",
      path: "/procurement/pengajuan/faktur-pembelian",
      isSeparator: false,
      isActive: false,
    },
  ];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      tax: 0,
      income_tax: 0,
    },
  });

  const getFakturPembelian = async () => {
    if (!id) return;
    setIsLoadData(true);
    try {
      const response = await axiosInstance.get(
        `/procurement/submission/purchase-invoice/${id}?company_id=${localStorage.getItem(
          "company_id"
        )}`
      );
      setData(response.data.data);
    } catch (error) {
      return;
    } finally {
      setIsLoadData(false);
    }
  };

  const getCoaTax = async () => {
    if (!id) return;
    setIsLoadData(true);
    try {
      const response = await axiosInstance.get(
        `/accounting/management-accounting/company-coa`
      );
      setCoaData(response.data.data);
    } catch (error) {
      return;
    } finally {
      setIsLoadData(false);
    }
  };

  useEffect(() => {
    getFakturPembelian();
    getCoaTax();
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleDeleteAction = async () => {
    setIsDeleteLoading(true);
    try {
      await axiosInstance.delete(
        `/procurement/submission/purchase-invoice/${id}?company_id=${localStorage.getItem(
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
        `/procurement/submission/purchase-invoice/status/${id}?company_id=${localStorage.getItem(
          "company_id"
        )}`,
        { status: changeStatus }
      );
      await getFakturPembelian();
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
    navigate(`/procurement/pengajuan/faktur-pembelian/edit/${id}`);
  };

  const formatDate = (date: string) => {
    if (!date || isNaN(new Date(date).getTime())) return "-";
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("id-ID", options).format(new Date(date));
  };

  const formatDecimal = (value?: number) => {
    if (value === undefined || value === null) return "-";
    return value.toLocaleString("id-ID", {
      style: "decimal",
    });
  };

  if (isChangeStatusLoading || isDeleteLoading || isLoadData) {
    return <OverlayLoader />;
  }

  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Detail Faktur Pembelian</PageTitle>

      <div className="font-secondary">
        <div className="card p-5 w-100 mb-8">
          <h3 className="mb-6">Faktur Pembelian</h3>
          <div className="row">
            <div className="col-md-6">
              <div>
                <label className="form-label fw-bold">
                  Nomor Faktur Pembelian
                </label>
                <p className="text-lg font-medium">
                  {data?.no_purchase_invoice || "-"}
                </p>
              </div>
              <div>
                <label className="form-label fw-bold">
                  Nomor Faktur Penjualan
                </label>
                <p className="text-lg font-medium">
                  {data?.sales_invoice?.no_sales_invoice || "-"}
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
                <label className="form-label fw-bold">
                  Nomor Purchase Order
                </label>
                <p className="text-lg font-medium">
                  {data?.purchase_order.no_purchase_order || "-"}
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
              <span>{data?.purchase_payment_terms?.name}</span>
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
            returPresent={data?.retur_purchase?.id}
            status={data?.status}
            purchase_order_id={data?.purchase_order.id}
          />
        </div>

        <div className="card p-5 w-100 mt-8">
          <h4 className="mb-4">Pajak</h4>
          <div className="row align-items-center">
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
                <h6>Rp.{formatDecimal(data?.sub_total)}</h6>
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
                  onClick={() => setIsDeleteModalVisible(true)}
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

        {/* Modals */}
        {isFailedModalVisible && (
          <FailedModal
            title="Gagal"
            message={failedMessage || "Terjadi kesalahan saat menyimpan data"}
            closeModal={() => setIsFailedModalVisible(false)}
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
            onConfirmApproved={handleChangeStatusAction}
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
