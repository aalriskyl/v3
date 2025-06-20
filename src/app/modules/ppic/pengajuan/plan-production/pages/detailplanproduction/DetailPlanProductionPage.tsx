import React, { FC, useEffect, useState } from 'react';
import { PageLink, PageTitle } from '@metronic/layout/core';
import { dummyUsers } from '../../components/organisms/table/dummyUsers';
import { useParams, useNavigate } from 'react-router-dom';
import { DeleteConfirmationModal } from '@metronic/layout/components/form/organism/DeleteModal';
import SuccessModal from '@metronic/layout/components/form/organism/SuccessModal';
import { FailedModal } from '@metronic/layout/components/form/organism/FailedModal';
import { ApprovedConfirmationModal, ApprovedSuccessModal } from '@metronic/layout/components/form/organism/ApprovedModal';
import { RejectedConfirmationModal, RejectedSuccessModal } from '@metronic/layout/components/form/organism/RejectedModal';
import MaterialTableLayoutDetail from '../../components/template/MaterialTableLayoutDetail';

const DetailPlanProductionPage: FC = () => {
    const { id } = useParams<{ id: string }>();
    const [userData, setUserData] = useState<any>(null);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [isFailedModalVisible, setIsFailedModalVisible] = useState(false);
    const [isApproveModalVisible, setIsApproveModalVisible] = useState(false);
    const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
    const [isApprovedSuccessModalVisible, setIsApprovedSuccessModalVisible] = useState(false);
    const [isRejectedSuccessModalVisible, setIsRejectedSuccessModalVisible] = useState(false);

    const navigate = useNavigate();

    const breadcrumbs: Array<PageLink> = [
        {
            title: 'Dashboard',
            path: '/',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'PPIC',
            path: '/ppic',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Pengajuan',
            path: '/ppic/pengajuan',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Plan Production',
            path: '/ppic/pengajuan/plan-production',
            isSeparator: false,
            isActive: false,
        },
    ];

    const formatDate = (date: string) => {
        if (!date) return '-';
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Intl.DateTimeFormat('id-ID', options).format(new Date(date));
    };

    useEffect(() => {
        if (id) {
            const user = dummyUsers.find(u => String(u.id) === id);
            setUserData(user || null);
        }
    }, [id]);

    const handleBack = () => {
        navigate(-1);
    };

    const handleDelete = () => {
        setIsDeleteModalVisible(true);
    };

    const handleDeleteAction = () => {
        const deletionSuccessful = true;

        if (deletionSuccessful) {
            setIsSuccessModalVisible(true);
        } else {
            setIsFailedModalVisible(true);
        }

        setIsDeleteModalVisible(false);
    };

    const handleEdit = () => {
        navigate(`/ppic/pengajuan/plan-production/edit/${id}`);
    };

    const handleApprove = () => {
        setIsApproveModalVisible(true);
    };

    const handleReject = () => {
        setIsRejectModalVisible(true);
    };

    const handleApproveConfirm = () => {
        setIsApproveModalVisible(false); // Tutup modal konfirmasi
        setIsApprovedSuccessModalVisible(true); // Buka modal keberhasilan
    };

    const handleRejectConfirm = () => {
        setIsRejectModalVisible(false); // Tutup modal konfirmasi
        setIsRejectedSuccessModalVisible(true); // Buka modal keberhasilan
    };

    return (
        <>
            <PageTitle breadcrumbs={breadcrumbs}>Detail Plan Production</PageTitle>

            <div className="font-secondary">
                <div className="card p-5 w-100 mb-8">
                    <div className="row">
                        {/* Tampilan untuk Rencana Produksi Mingguan */}
                        {userData?.rencana_produksi === 'Mingguan' && (
                            <>
                                <div className="col-md-6">
                                    <div>
                                        <label className="form-label fw-bold">Rencana Produksi</label>
                                        <p className="text-lg font-medium">
                                            {userData?.rencana_produksi || '-'}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="form-label fw-bold">Tanggal Mulai Produksi</label>
                                        <p className="text-lg font-medium">
                                            {formatDate(userData?.tanggal_mulai)}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="form-label fw-bold">Request By</label>
                                        <p className="text-lg font-medium">
                                            {userData?.request_by || '-'}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="form-label fw-bold">Approved By</label>
                                        <p className="text-lg font-medium">
                                            {userData?.approved_by || '-'}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div>
                                        <label className="form-label fw-bold">Tanggal Berakhir Produksi</label>
                                        <p className="text-lg font-medium">
                                            {formatDate(userData?.tanggal_berakhir)}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="form-label fw-bold">Tanggal Pengajuan</label>
                                        <p className="text-lg font-medium">
                                            {formatDate(userData?.tanggal_pengajuan)}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="form-label fw-bold">Tanggal Approve</label>
                                        <p className="text-lg font-medium">
                                            {formatDate(userData?.tanggal_approve)}
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Tampilan untuk Rencana Produksi Harian */}
                        {userData?.rencana_produksi === 'Harian' && (
                            <>
                                <div className="col-md-6">
                                    <div>
                                        <label className="form-label fw-bold">Rencana Produksi</label>
                                        <p className="text-lg font-medium">
                                            {userData?.rencana_produksi || '-'}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="form-label fw-bold">Tanggal Produksi</label>
                                        <p className="text-lg font-medium">
                                            {formatDate(userData?.tanggal_mulai)}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="form-label fw-bold">Tanggal Pengajuan</label>
                                        <p className="text-lg font-medium">
                                            {formatDate(userData?.tanggal_pengajuan)}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="form-label fw-bold">Tanggal Approve</label>
                                        <p className="text-lg font-medium">
                                            {formatDate(userData?.tanggal_approve)}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div>
                                        <label className="form-label fw-bold">Request By</label>
                                        <p className="text-lg font-medium">
                                            {userData?.request_by || '-'}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="form-label fw-bold">Approved By</label>
                                        <p className="text-lg font-medium">
                                            {userData?.approved_by || '-'}
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <MaterialTableLayoutDetail />

                <div className="d-flex justify-content-end row">
                    <div className="col-12 text-end my-4">
                        <button
                            type="button"
                            onClick={handleBack}
                            className="btn px-12 py-3 border border-gray-500 me-2"
                        >
                            Batal
                        </button>
                        {userData?.status === 'Submitted' ? (
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
                        ) : (
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
                                    onClick={handleEdit}
                                    className="btn btn-primary px-12 py-3 border border-primary"
                                >
                                    Ubah
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

                {isSuccessModalVisible && (
                    <SuccessModal
                        title="Berhasil"
                        successMessage="Data telah berhasil dihapus!"
                        closeModal={() => {
                            setIsSuccessModalVisible(false);
                            navigate('../');
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
                        message="Plan Production berhasil diaprrove"
                        closeModal={() => setIsApprovedSuccessModalVisible(false)}
                    />
                )}

                {isRejectedSuccessModalVisible && (
                    <RejectedSuccessModal
                        title="Berhasil"
                        message="Plan Production berhasil di reject"
                        closeModal={() => setIsRejectedSuccessModalVisible(false)}
                    />
                )}
            </div>
        </>
    );
};

export default DetailPlanProductionPage;