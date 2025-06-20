import { ColumnDef } from '@tanstack/react-table'
import { LayananActionsCell } from './LayananActionsCell'
import { LayananModel } from '../../../molecules/core/_models'
import { LayananCustomHeader } from './LayananCustomHeader'

const layananColumns = (status: string, type: string, supplierId: string, isCompanyId: string, isQuotation: string): ColumnDef<LayananModel>[] => {
    const baseColumns: ColumnDef<LayananModel>[] = [
        {
            header: (props) => <LayananCustomHeader title="No" className="w-10px" />,
            id: 'no',
            cell: (info) => info.row.index + 1,
        },
        {
            header: (props) => <LayananCustomHeader title="Layanan" className="w-271px" />,
            id: 'service.name',
            accessorKey: 'service.name',
        },
        {
            header: (props) => <LayananCustomHeader title="Supplier" className="w-271px" />,
            id: 'service_supplier.supplier.name',
            accessorKey: 'service_supplier.supplier.name',
        },
        {
            header: (props) => <LayananCustomHeader title="Harga" className="w-271px" />,
            id: 'price',
            accessorKey: 'price',
        },
        {
            header: (props) => <LayananCustomHeader title="Jumlah" className="w-271px" />,
            id: 'amount',
            accessorKey: 'amount',
        },
        {
            header: (props) => <LayananCustomHeader title="Aksi" className="w-20px" />,
            id: 'actions',
            cell: (info) => <LayananActionsCell isQuotation={isQuotation} isCompanyId={isCompanyId} supplierId={supplierId} status={status} type={type} id={info.row.original.id} />,
        },
    ];

    // Add "Layanan Konversi" column only if the type is not "supplier"
    if (type !== "Supplier") {
        baseColumns.splice(3, 0, {
            header: (props) => <LayananCustomHeader title="Layanan Konversi" className="w-271px" />,
            id: 'conversion_service.name',
            accessorKey: 'conversion_service.name',
        });
    }

    return baseColumns;
};

export { layananColumns };