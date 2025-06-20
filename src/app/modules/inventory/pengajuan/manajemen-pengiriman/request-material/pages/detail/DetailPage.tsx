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
import { getErrorMessage } from '../../../../../../../helper/getErrorMessage';

const DetailPage: FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    
    // Modal states
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [isFailedModalVisible, setIsFailedModalVisible] = useState(false);
    const [isApproveModalVisible, setIsApproveModalVisible] = useState(false);
    const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
    const [isApprovedSuccessModalVisible, setIsApprovedSuccessModalVisible] = useState(false);
    const [isRejectedSuccessModalVisible, setIsRejectedSuccessModalVisible] = useState(false);
    
    // Data states
    const [actionType, setActionType] = useState<'delete' | 'submit' | 'approve' | 'reject' | null>(null);
    const [materialRequestData, setMaterialRequestData] = useState<any>({});
    const [materialData, setMaterialData] = useState<any[]>([]);
    const [failedMessage, setFailedMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

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
            isActive: false,
        },
        {
            title: 'Pengajuan',
            path: '/inventory/pengajuan',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Manajemen Pengiriman',
            path: '/inventory/pengajuan/manajemen-pengiriman',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Material Request',
            path: '/inventory/pengajuan/manajemen-pengiriman/material-request',
            isSeparator: false,
            isActive: false,
        },
    ];

    const fetchMaterialRequestData = async () => {
        try {
            const response = await axiosInstance.get(
                `/inventory/submission/delivery-management/material-request/${id}`
            );
            setMaterialRequestData(response.data.data);
            
            const materialsResponse = await axiosInstance.get(
                `/inventory/submission/delivery-management/material-request/material-request-material/material-request/${id}`
            );
            
            setMaterialData(
                materialsResponse.data.data.material_requests.map((item: any) => ({
                    id: item.id,
                    amount: item.amount,
                    material: item.material?.name || '-',
                    uom: item.material_uom?.uom_actual?.name || '-'
                }))
            );
        } catch (error) {
            console.error('Error fetching material request data:', error);
            setFailedMessage(getErrorMessage(error));
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMaterialRequestData();
    }, [id]);

    const formatDate = (date: string) => {
        if (!date || isNaN(new Date(date).getTime())) return "-";
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return new Intl.DateTimeFormat("id-ID", options).format(new Date(date));
    };

    const handleBack = () => navigate('../');

    const handleEdit = () => navigate(`/inventory/pengajuan/manajemen-pengiriman/material-request/edit/${id}`);

    const handleDelete = () => setIsDeleteModalVisible(true);

    const handleDeleteAction = async () => {
        setIsLoading(true);
        setActionType('delete');
        try {
            await axiosInstance.delete(
                `/inventory/submission/delivery-management/material-request/${id}`
            );
            setIsSuccessModalVisible(true);
        } catch (error) {
            setFailedMessage(getErrorMessage(error));
        } finally {
            setIsLoading(false);
            setIsDeleteModalVisible(false);
        }
    };
    
    const handleStatusChange = async (status: "Submitted" | "Approved" | "Rejected") => {
        setIsLoading(true);
        // Set action type based on status
        if (status === "Submitted") setActionType('submit');
        if (status === "Approved") setActionType('approve');
        if (status === "Rejected") setActionType('reject');
        
        try {
            await axiosInstance.put(
                `/inventory/submission/delivery-management/material-request/status/${id}`,
                { status }
            );
            setIsSuccessModalVisible(true);
            await fetchMaterialRequestData();
        } catch (error) {
            setFailedMessage(getErrorMessage(error));
        } finally {
            setIsLoading(false);
            setIsApproveModalVisible(false);
            setIsRejectModalVisible(false);
        }
    };
    
    // Success messages mapping
    const successMessages = {
        delete: 'Data berhasil dihapus!',
        submit: 'Data berhasil disubmit!',
        approve: 'Material Request berhasil diapprove!',
        reject: 'Material Request berhasil direject!',
    };

    const renderActionButtons = () => {
        switch (materialRequestData?.status) {
            case 'Submitted':
                return (
                    <>
                        <button
                            type="button"
                            onClick={() => setIsRejectModalVisible(true)}
                            className="btn px-12 py-3 border border-gray-500 me-2"
                        >
                            Reject
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsApproveModalVisible(true)}
                            className="btn btn-primary px-12 py-3 border border-primary"
                        >
                            Approve
                        </button>
                    </>
                );
            case 'Draft':
                return (
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
                            onClick={() => handleStatusChange("Submitted")}
                            className="btn btn-primary px-12 py-3 border border-primary"
                        >
                            Submit
                        </button>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <PageTitle breadcrumbs={breadcrumbs}>Detail Material Request</PageTitle>

            {isLoading && <OverlayLoader />}

            <div className="font-secondary">
                {/* Request Information Card */}
                <div className="card p-5 w-100 mb-8">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-4">
                                <label className="form-label fw-bold">Nomor Material Request</label>
                                <p className="text-lg font-medium">
                                    {materialRequestData?.no_material_request || '-'}
                                </p>
                            </div>
                            <div className="mb-4">
                                <label className="form-label fw-bold">Supplier</label>
                                <p className="text-lg font-medium">
                                    {materialRequestData?.supplier?.name || '-'}
                                </p>
                            </div>
                            <div className="mb-4">
                                <label className="form-label fw-bold">Requested By</label>
                                <p className="text-lg font-medium">
                                    {materialRequestData?.requested_by?.name || '-'}
                                </p>
                            </div>
                            {materialRequestData?.status !== 'Draft' && (
                                <div className="mb-4">
                                    <label className="form-label fw-bold">Submitted By</label>
                                    <p className="text-lg font-medium">
                                        {materialRequestData?.submitted_by?.name || '-'}
                                    </p>
                                </div>
                            )}
                            {materialRequestData?.status === 'Approved' && (
                                <div className="mb-4">
                                    <label className="form-label fw-bold">Approved By</label>
                                    <p className="text-lg font-medium">
                                        {materialRequestData?.approved_by?.name || '-'}
                                    </p>
                                </div>
                            )}
                            {materialRequestData?.status === 'Rejected' && (
                                <div className="mb-4">
                                    <label className="form-label fw-bold">Rejected By</label>
                                    <p className="text-lg font-medium">
                                        {materialRequestData?.rejected_by?.name || '-'}
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="col-md-6">
                            <div className="mb-4">
                                <label className="form-label fw-bold">Plan Production</label>
                                <p className="text-lg font-medium">
                                    {materialRequestData?.plan_production || '-'}
                                </p>
                            </div>
                            <div className="mb-4">
                                <label className="form-label fw-bold">Tanggal Pembuatan</label>
                                <p className="text-lg font-medium">
                                    {formatDate(materialRequestData?.created_at)}
                                </p>
                            </div>
                            {materialRequestData?.status !== 'Draft' && (
                                <div className="mb-4">
                                    <label className="form-label fw-bold">Tanggal Pengajuan</label>
                                    <p className="text-lg font-medium">
                                        {formatDate(materialRequestData?.submitted_date)}
                                    </p>
                                </div>
                            )}
                            {materialRequestData?.status === 'Approved' && (
                                <div className="mb-4">
                                    <label className="form-label fw-bold">Approved Date</label>
                                    <p className="text-lg font-medium">
                                        {formatDate(materialRequestData?.approved_date)}
                                    </p>
                                </div>
                            )}
                            {materialRequestData?.status === 'Rejected' && (
                                <div className="mb-4">
                                    <label className="form-label fw-bold">Rejected Date</label>
                                    <p className="text-lg font-medium">
                                        {formatDate(materialRequestData?.rejected_date)}
                                    </p>
                                </div>
                            )}
                            <div className="mb-4">
                                <label className="form-label fw-bold">Status</label>
                                <p className="text-lg font-medium">
                                    <UserTwoStepsCell status={materialRequestData?.status || '-'} />
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Materials List Card */}
                <div className="card p-5 w-100 mt-8">
                    <h4 className="mb-8">Material</h4>
                    <MaterialDetailSectionLayout 
                        supplier_id={materialRequestData?.supplier?.id} 
                        materialData={materialData} 
                        status={materialRequestData?.status} 
                    />
                </div>

                {/* Action Buttons */}
                <div className="d-flex justify-content-end row">
                    <div className="col-12 text-end my-4">
                        <button
                            type="button"
                            onClick={handleBack}
                            className="btn px-12 py-3 border border-gray-500 me-2"
                        >
                            Batal
                        </button>
                        {renderActionButtons()}
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

{isSuccessModalVisible && (
    <SuccessModal
        title="Berhasil"
        successMessage={actionType ? successMessages[actionType] : 'Aksi berhasil!'}
        closeModal={() => {
            setIsSuccessModalVisible(false);
            setActionType(null);
            if (actionType === 'delete') {
                navigate('../');
            }
        }}
    />
)}

            {failedMessage && (
                <FailedModal
                    closeModal={() => setFailedMessage(null)}
                    message={failedMessage}
                />
            )}

            {isApproveModalVisible && (
                <ApprovedConfirmationModal
                    onConfirmApproved={() => handleStatusChange("Approved")}
                    closeModal={() => setIsApproveModalVisible(false)}
                />
            )}

            {isRejectModalVisible && (
                <RejectedConfirmationModal
                    onConfirmRejected={() => handleStatusChange("Rejected")}
                    closeModal={() => setIsRejectModalVisible(false)}
                />
            )}

            {isApprovedSuccessModalVisible && (
                <ApprovedSuccessModal
                    title="Berhasil"
                    message="Material Request berhasil diaprrove"
                    closeModal={() => setIsApprovedSuccessModalVisible(false)}
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
        </>
    );
};

export default DetailPage;