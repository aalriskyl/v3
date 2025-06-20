import React, { FC, useState } from 'react';
import { PageLink, PageTitle } from '@metronic/layout/core';
import Form from '../../components/template/RefactoredForm';

const EditPlanProductionPage: FC = () => {
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
    return (
        <>
            {/* Breadcrumb Header */}
            <PageTitle breadcrumbs={breadcrumbs}>Ubah Plan Production</PageTitle>
            <Form
                mode='edit'
                successMessage='Plan Production berhasil di Ubah'
                headTitle='Ubah Plan Production'
                buttonTitle='Ubah'
                confirmButtonLabel='Ubah'
                cancelButtonLabel='Batalkan'
                message='Pastikan informasi sudah lengkap.'
            />
        </>
    );
};

export default EditPlanProductionPage;
