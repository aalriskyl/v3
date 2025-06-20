import { FC, useState } from 'react';
import { PageTitle } from '@metronic/layout/core';
import { useNavigate } from 'react-router-dom';
import { UserTwoStepsCell } from '../../../../../pengajuan/stock-management/entry-stock/components/organisms/table/columns/UserTwoStepsCell';

const DetailEntryStock: FC = () => {
    const navigate = useNavigate();

    // Dummy data
    const entryStockData = {
        remarks: "Sample remarks for the entry stock.",
        request_by: { name: "John Doe" },
        approved_by: { name: "Jane Smith" },
        approved_date: "2023-10-01",
        status: "Approved",
        warehouse: "Warehouse A",
        material: "Material 1",
        stock_start: 100,
        stock_end: 80,
        stock_quantity: 20,
        uom: "Lorem Ipsum",
        document_type: "Purchase Order",
        posting_date: "2023-10-01",
    };

    const handleBack = () => {
        navigate(-1);
    };

    const formatDate = (date: string) => {
        if (!date || isNaN(new Date(date).getTime())) return '-'; // Check for invalid date
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Intl.DateTimeFormat('id-ID', options).format(new Date(date));
    };

    return (
        <>
            <PageTitle breadcrumbs={[]}>Detail Entry Stock</PageTitle>

            <div className="container card p-5 font-secondary">
                <div className="row g-1">
                    {/* Column 1 */}
                    <div className="col-md-6 mb-2">
                        <label className="form-label fw-bold">Gudang</label>
                        <div className="fw-light text-gray-800">{entryStockData.warehouse}</div>
                    </div>
                    <div className="col-md-6 mb-2">
                        <label className="form-label fw-bold">Material</label>
                        <div className="fw-light text-gray-800">{entryStockData.material}</div>
                    </div>
                    <div className="col-md-6 mb-2">
                
                        <label className="form-label fw-bold">Stock Awal</label>
                        <div className="fw-light text-gray-800">{entryStockData.stock_start}</div>
                    </div>
                    <div className="col-md-6 mb-2">
                        <label className="form-label fw-bold">Stock Quantity</label>
                        <div className="fw-light text-gray-800">{entryStockData.stock_quantity}</div>
                       
                    </div>

                    {/* Column 2 */}
                    <div className="col-md-6 mb-2">
                        <label className="form-label fw-bold">Stock Akhir</label>
                        <div className="fw-light text-gray-800">{entryStockData.stock_end}</div>
                        
                    </div>
                    <div className="col-md-6 mb-2">
                        <label className="form-label fw-bold">Satuan UOM</label>
                        <div className="fw-light text-gray-800">{entryStockData.uom}</div>
                    </div>
                    <div className="col-md-6 mb-2">
                        <label className="form-label fw-bold">Tanggal Posting</label>
                        <div className="fw-light text-gray-800">
                            {formatDate(entryStockData.posting_date)}
                        </div>

                    </div>
                    <div className="col-md-6 mb-2">
                        <label className="form-label fw-bold">Tipe Dokumen</label>
                        <div className="fw-light text-gray-800">{entryStockData.document_type}</div>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-end row">
                <div className="col-12 text-end my-4">
                    <button
                        type="button"
                        onClick={handleBack}
                        className="btn btn-primary px-12 py-3 border border-primary ms-3"
                    >
                        Kembali
                    </button>
                </div>
            </div>
        </>
    );
};

export default DetailEntryStock;