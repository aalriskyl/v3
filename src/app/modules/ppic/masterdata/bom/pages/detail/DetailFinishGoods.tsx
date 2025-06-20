/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState, useEffect } from 'react';
import { PageTitle } from '@metronic/layout/core';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { DeleteConfirmationModal, DeleteSuccessModal } from '@metronic/layout/components/form/organism/DeleteModal';
import { FailedModal } from '@metronic/layout/components/form/organism/FailedModal';
import ImageHolder from '../../components/molecules/field/ImageHolder';
import { VariantSectionWithoutAdd } from '../../components/template/section/VariantSectionWithoutAdd';
import ConfirmModal from '@metronic/layout/components/form/organism/ConfirmModal';
import SuccessModal from '@metronic/layout/components/form/organism/SuccessModal';
import axiosInstance from '../../../../../../../service/axiosInstance';
import { GoodsSection } from '../../components/template/section/VariantFinishGoods';



const API_BASE_URL = import.meta.env.VITE_APP_API_URL

const DetailFinishGoods: FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
    const [isFailedModalVisible, setFailedModalVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [data, setData] = useState<any>({})
    const [loading, setLoading] = useState(true)
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const [newVariant, setNewVariant] = useState("")
    const [variantFinishGoodsData, setVariantFinishGoodsData] = useState([])

    useEffect(() => {
        setNewVariant(params.get("new") || "")
        axiosInstance.get(`/ppic/master-data/finish-goods/${id}`).then((res: any) => {
            setData(res.data.data)
            setVariantFinishGoodsData(res.data.data.variant_finish_goods)
            setLoading(false)
        })
    }, []);

    const handleSave = () => {
        setIsModalVisible(true);
    };

    const handleConfirm = () => {
        setIsModalVisible(false);
        try {
            console.log('Data berhasil diubah');
            setSuccessModalVisible(true);
        } catch (error) {
            console.error('Gagal mengubah data', error);
            setFailedModalVisible(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const handleCloseSuccessModal = () => {
        setSuccessModalVisible(false);
        navigate('../');
    };

    const handleCloseFailedModal = () => {
        setFailedModalVisible(false);
    };

    const handleDelete = () => {
        const isSuccess = Math.random() > 0.5;
        setTimeout(() => {
            setDeleteModalVisible(false);
            if (isSuccess) {
                setSuccessModalVisible(true);
            } else {
                setFailedModalVisible(true);
            }
        }, 1000);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <PageTitle breadcrumbs={[]}>Detail Finish Goods</PageTitle>

            <div className="container card p-5 font-secondary mb-8">
                <h4 className="mb-8">Finish Goods</h4>
                <div className="row">
                    <div className="col-md-6">
                        {/* Brand Image */}
                        <div className="mb-4">
                            <label className="form-label fw-bold">Foto Finish Goods</label>
                            <ImageHolder
                                imageUrl={`${API_BASE_URL}/${data.picture}`}
                                altText={`Logo ${data.name}`}
                                className=""
                                placeholder="No image available"
                            />
                        </div>
                        <label className="form-label fw-bold mt-3">Deskripsi</label>
                        <div className="fw-light text-gray-800">{data.description}</div>
                    </div>
                    {/* Brand Details */}
                    <div className="col-md-6">
                        <div className="col-md-12 mb-6">
                            <label className="form-label fw-bold">Nama Finish Goods</label>
                            <div className="fw-light text-gray-800">{data.name}</div>
                        </div>
                        <div className="col-md-12 mb-2">
                            <label className="form-label fw-bold">Kategori Produk</label>
                            <div className="fw-light text-gray-800">{data.category.name}</div>
                        </div>
                        <div className="col-md-12 mb-2">
                            <label className="form-label fw-bold">SetDefault</label>
                            <div className="fw-light text-gray-800">
                                {data.variant_default_purchase ? "Penjualan" : ""} *
                                {data.variant_default_sale ? "Pembelian" : ""}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <ServiceSectionWithoutAdd /> */}
            {/* <GoodsSection /> */}
            {
                newVariant   == "true" ?  (
                    <GoodsSection finish_goods_id={id}/>
                ): <VariantSectionWithoutAdd finish_goods_id={id} variantFinishGoodsData={variantFinishGoodsData}/>
            }

            <div className="row">
                <div className="col-12 text-end my-4">
                    <Link to="../" className="btn px-12 py-3 border border-gray-500 me-2">
                        Kembali
                    </Link>
                    <button
                        type="button"
                        className="btn px-12 py-3 border border-gray-500 me-2"
                        onClick={() => setDeleteModalVisible(true)}
                    >
                        Hapus
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary border border-primary px-16 py-3"
                        onClick={handleSave}
                    >
                        Ubah
                    </button>
                </div>
            </div>

            {/* Modal Konfirmasi Hapus */}
            {isDeleteModalVisible && (
                <DeleteConfirmationModal
                    cancelLabel='Kembali'
                    confirmLabel='Hapus'
                    onConfirmDelete={handleDelete}
                    closeModal={() => setDeleteModalVisible(false)}
                    title='Hapus Data'
                    message='Data akan terhapus dan tidak bisa dikembalikan.'
                />
            )}

            {/* Modal Sukses Hapus */}
            {isSuccessModalVisible && (
                <DeleteSuccessModal
                    closeModal={() => {
                        setSuccessModalVisible(false);
                        navigate('../');
                    }}
                    message='Data berhasil dihapus.'
                />
            )}

            {/* Modal Gagal Hapus */}
            {isFailedModalVisible && (
                <FailedModal
                    closeModal={() => setFailedModalVisible(false)}
                    title='Gagal'
                    message='Material gagal dihapus.'
                />
            )}

            {/* Modal Konfirmasi Ubah */}
            {isModalVisible && (
                <ConfirmModal
                    handleSubmit={handleConfirm}
                    closeModal={handleCloseModal}
                    headTitle="Ubah Finish Goods"
                    confirmButtonLabel="Simpan"
                    cancelButtonLabel="Batalkan"
                    message="Pastikan bahwa semua informasi sudah benar."
                />
            )}

            {/* Modal Sukses Ubah */}
            {isSuccessModalVisible && (
                <SuccessModal
                    closeModal={handleCloseSuccessModal}
                    message="Data berhasil diubah!"
                />
            )}

            {/* Modal Gagal Ubah */}
            {isFailedModalVisible && (
                <FailedModal
                    closeModal={handleCloseFailedModal}
                    title='Gagal'
                    message='Material gagal diubah.'
                />
            )}
        </>
    );
};

export default DetailFinishGoods;