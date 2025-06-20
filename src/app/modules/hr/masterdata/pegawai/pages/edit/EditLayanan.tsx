import React, { FC, useState } from 'react';
import { PageLink, PageTitle } from '@metronic/layout/core'
import { useNavigate } from 'react-router-dom';
import PegawaiForm from '../../components/template/Form';

const EditPegawai: FC = () => {
    const breadcrumbs: Array<PageLink> = [
        {
            title: 'Dashboard',
            path: '/',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'HR',
            path: '/hr',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Master Data',
            path: '/hr/masterdata/',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Pegawai',
            path: '/hr/masterdata/pegawai',
            isSeparator: false,
            isActive: false,
        },
    ]
    return (
        <>
            <PageTitle breadcrumbs={breadcrumbs}>Ubah Pegawai</PageTitle>
            <PegawaiForm
                mode="edit"
                submitButtonLabel='Ubah'
                successMessage='Pegawai berhasil di ubah.'
                headTitle='Ubah Pegawai'
                buttonTitle='Ubah'
                cancelButtonLabel='Kembali'
                message='Pastikan bahwa semua informasi sudah benar.' />
        </>
    );
};

export default EditPegawai;