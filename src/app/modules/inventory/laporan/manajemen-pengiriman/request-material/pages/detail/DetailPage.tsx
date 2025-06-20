import React, { FC, useEffect, useState } from 'react';
import { PageLink, PageTitle } from '@metronic/layout/core';
import { useParams, useNavigate } from 'react-router-dom';
import { DeleteConfirmationModal } from '@metronic/layout/components/form/organism/DeleteModal';
import SuccessModal from '@metronic/layout/components/form/organism/SuccessModal';
import { FailedModal } from '@metronic/layout/components/form/organism/FailedModal';
import { ApprovedConfirmationModal, ApprovedSuccessModal } from '@metronic/layout/components/form/organism/ApprovedModal';
import { RejectedConfirmationModal, RejectedSuccessModal } from '@metronic/layout/components/form/organism/RejectedModal';
import MaterialDetailSectionLayout from '../../components/template/MaterialDetailSectionLayout';
import axiosInstance from '../../../../../../../../service/axiosInstance';
import OverlayLoader from '@metronic/layout/components/OverlayLoader';
import { UserTwoStepsCell } from '../../components/organisms/table/columns/UserTwoStepsCell';

const DetailPage: FC = () => {
    const { id } = useParams<{ id: string }>();
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [isFailedModalVisible, setIsFailedModalVisible] = useState(false);
    const [isApproveModalVisible, setIsApproveModalVisible] = useState(false);
    const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
    const [isApprovedSuccessModalVisible, setIsApprovedSuccessModalVisible] = useState(false);
    const [isRejectedSuccessModalVisible, setIsRejectedSuccessModalVisible] = useState(false);
    const [materialRequestData, setMaterialRequestData] = useState({}) as any;
    const [materialData, setMaterialData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const breadcrumbs: Array<PageLink> = [
        {
            title: 'Dashboard',
            path: '/',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Inventory',
            path: '/inventory',
            isSeparator: false,
            isActive: true,
        },
        {
            title: 'Laporan',
            path: '/inventory/laporan',
            isSeparator: false,
            isActive: true,
        },
        {
            title: 'Manajemen Pengiriman',
            path: '/inventory/laporan/manajemen-pengiriman',
            isSeparator: false,
            isActive: true,
        },
        {
            title: 'Material Request',
            path: '/inventory/laporan/manajemen-pengiriman/material-request',
            isSeparator: false,
            isActive: false,
        },
    ];

    const getDataRequestMaterial = () => {
        axiosInstance.get(`/inventory/submission/delivery-management/material-request/${id}`).then((res) => {
            setMaterialRequestData(res.data.data);
            axiosInstance.get(`/inventory/submission/delivery-management/material-request/material-request-material/material-request/${id}`).then((res: any) => {
                setMaterialData(res.data.data.material_requests.map((item: any) => ({
                    id: item.id,
                    amount: item.amount,
                    material: item.material?.name || '-',
                    uom: item.material_uom?.uom_actual?.name || '-'
                })));
            });
        }).finally(() => {
            setIsLoading(false);
        });
    };

    useEffect(() => {
        getDataRequestMaterial();
    }, []);

    const handleBack = () => {
        navigate('../');
    };

    const handleDelete = () => {
        setIsDeleteModalVisible(true);
    };

    const handleDeleteAction = async () => {
        setIsLoading(true);
        try {
            await axiosInstance.delete(
                `/inventory/submission/delivery-management/material-request/${id}`
            );
            setIsSuccessModalVisible(true);
            navigate("../"); // Navigate back to the previous page
        } catch (error) {
            console.error("Failed to delete material request:", error);
            setIsFailedModalVisible(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = () => {
        navigate(`/inventory/laporan/manajemen-pengiriman/material-request/edit/${id}`);
    };

    const handleApprove = () => {
        setIsApproveModalVisible(true);
    };

    const handleReject = () => {
        setIsRejectModalVisible(true);
    };

    const handleApproveConfirm = () => {
        setIsLoading(true);
        axiosInstance.put(`/inventory/submission/delivery-management/material-request/status/${id}`, {
            status: "Approved"
        }).then(() => {
            setIsApproveModalVisible(false);
            setIsApprovedSuccessModalVisible(true);
            getDataRequestMaterial();
        }).finally(() => {
            setIsLoading(false);
        });
    };

    const handleRejectConfirm = () => {
        setIsLoading(true);
        axiosInstance.put(`/inventory/submission/delivery-management/material-request/status/${id}`, {
            status: "Rejected"
        }).then(() => {
            setIsRejectModalVisible(false);
            setIsRejectedSuccessModalVisible(true);
            getDataRequestMaterial();
        }).finally(() => {
            setIsLoading(false);
        });
    };

    const handleSubmit = () => {
        setIsLoading(true);
        axiosInstance.put(`/inventory/submission/delivery-management/material-request/status/${id}`, {
            status: "Submitted"
        }).then(() => {
            getDataRequestMaterial();
            setIsLoading(false);
        });
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
            <PageTitle breadcrumbs={breadcrumbs}>Detail Material Request</PageTitle>

            {isLoading ? <OverlayLoader /> : (
                <div className="font-secondary">
                     <div className="card p-5 w-100 mb-8">
                        <div className="row">
                            <div className="col-md-6">
                                <div>
                                    <label className="form-label fw-bold">Nomor Material Request</label>
                                    <p className="text-lg font-medium">
                                        {materialRequestData?.no_material_request || '-'}
                                    </p>
                                </div>
                                <div>
                                    <label className="form-label fw-bold">Supplier</label>
                                    <p className="text-lg font-medium">
                                        {materialRequestData?.supplier?.name || '-'}
                                    </p>
                                </div>
                                <div>
                                    <label className="form-label fw-bold">Requested By</label>
                                    <p className="text-lg font-medium">
                                        {materialRequestData?.requested_by?.name || '-'}
                                    </p>
                                </div>
                                {materialRequestData?.status !== 'Draft' && (
                                    <div>
                                    <label className="form-label fw-bold">Submitted By</label>
                                    <p className="text-lg font-medium">
                                        {materialRequestData?.submitted_by?.name || '-'}
                                    </p>
                                </div>
                                )}
                                {materialRequestData?.status === 'Approved' && (
                                    <div>
                                    <label className="form-label fw-bold">Approved By</label>
                                    <p className="text-lg font-medium">
                                        {materialRequestData?.approved_by?.name || '-'}
                                    </p>
                                </div>
                                )}
                                
                               {materialRequestData?.status === 'Rejected' && (
                                 <div>
                                 <label     className="form-label fw-bold">Rejected By</label>
                                 <p className="text-lg font-medium">
                                     {materialRequestData?.rejected_by?.name || '-'}
                                 </p>
                             </div>
                               )}
                            </div>
                            <div className="col-md-6">
                                <div>
                                    <label className="form-label fw-bold">Plan Production</label>
                                    <p className="text-lg font-medium">
                                        {materialRequestData?.plan_production || '-'}
                                    </p>
                                </div>
                                <div>
                                    <label className="form-label fw-bold">Tanggal Pembuatan</label>
                                    <p className="text-lg font-medium">
                                        {formatDate(materialRequestData?.created_at || "-")}
                                    </p>
                                </div>
                               {materialRequestData?.status !== 'Draft' && (
                                 <div>
                                 <label className="form-label fw-bold">Tanggal Pengajuan</label>
                                 <p className="text-lg font-medium">
                                     {formatDate(materialRequestData?.submitted_date || "-")}
                                 </p>
                             </div>
                               )}
                               {materialRequestData?.status === 'Approved' && (
                                 <div>
                                 <label className="form-label fw-bold">Approved Date</label>
                                 <p className="text-lg font-medium">
                                     {formatDate(materialRequestData?.approved_date || "-")}
                                 </p>
                             </div>
                               )}
                               {materialRequestData?.status === 'Rejected' && (
                                 <div>
                                 <label className="form-label fw-bold">Rejected Date</label>
                                 <p className="text-lg font-medium">
                                     {formatDate(materialRequestData?.rejected_date || "-")}
                                 </p>
                             </div>
                               )}
                                <div>
                                    <label className="form-label fw-bold">Status</label>
                                    <p className="text-lg font-medium">
                                        <UserTwoStepsCell status={materialRequestData?.status || '-'} />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card p-5 w-100 mt-8">
                        <h4 className="mb-8">Material</h4>
                        <MaterialDetailSectionLayout />
                    </div>

                    <div className="d-flex justify-content-end row">
                        <div className="col-12 text-end my-4">
                            <button
                                type="button"
                                onClick={handleBack}
                                className="btn px-12 py-3 border border-gray-500 me-2"
                            >
                                Batal
                            </button>
                            {/* {materialRequestData?.status === 'Submitted' ? (
                                <>
                                    <button
                                        type="button"
                                        onClick={handleReject}
                                        className="btn px-12 py-3 border border-gray-500 me-2"
                                    >
                                        Reject
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleApprove}
                                        className="btn btn-primary px-12 py-3 border border-primary"
                                    >
                                        Approve
                                    </button>
                                </>
                            ) : materialRequestData?.status == "Draft" ? (
                                <>
                                    <button
                                        type="button"
                                        onClick={handleDelete}
                                        className="btn px-12 py-3 border border-gray-500 me-2"
                                    >
                                        Hapus
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        className="btn btn-primary px-12 py-3 border border-primary"
                                    >
                                        Submit
                                    </button>
                                </>
                            ) : (<></>)} */}
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

                    {isSuccessModalVisible && (
                        <SuccessModal
                            title="Berhasil"
                            successMessage="Data telah berhasil dihapus!"
                            closeModal={() => {
                                setIsSuccessModalVisible(false);
                                navigate("../");
                            }}
                        />
                    )}

                    {isFailedModalVisible && (
                        <FailedModal
                            title="Gagal"
                            message="Terjadi kesalahan saat menghapus data."
                            closeModal={() => setIsFailedModalVisible(false)}
                        />
                    )}

                    {isApproveModalVisible && (
                        <ApprovedConfirmationModal
                            onConfirmApproved={handleApproveConfirm}
                            closeModal={() => setIsApproveModalVisible(false)}
                        />
                    )}

                    {isRejectModalVisible && (
                        <RejectedConfirmationModal
                            onConfirmRejected={handleRejectConfirm}
                            closeModal={() => setIsRejectModalVisible(false)}
                        />
                    )}

                    {isApprovedSuccessModalVisible && (
                        <ApprovedSuccessModal
                            title="Berhasil"
                            message="Material Request berhasil diaprrove"
                            closeModal={() => {
                                setIsApprovedSuccessModalVisible(false);
                                window.location.reload();
                            }}
                        />
                    )}

                    {isRejectedSuccessModalVisible && (
                        <RejectedSuccessModal
                            title="Berhasil"
                            message="Material Request berhasil di reject"
                            closeModal={() => setIsRejectedSuccessModalVisible(false)}
                        />
                    )}
                </div>
            )}
        </>
    );
};

export default DetailPage;