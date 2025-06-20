import { ColumnDef, HeaderContext } from '@tanstack/react-table';
import { MaterialActionsCell } from './MaterialActionsCell';
import { MaterialCustomHeader } from './MaterialCustomHeader';
import { MaterialModel } from '../../../molecules/core/_models';

const materialColumns = (
    onMaterialUpdated: () => void,
    type: string
): ColumnDef<MaterialModel>[] => [
        {
            header: (props: HeaderContext<MaterialModel, unknown>) => (
                <MaterialCustomHeader title="No" className="w-10px" />
            ),
            id: 'no',
            cell: (info) => info.row.index + 1,
        },
        {
            header: (props: HeaderContext<MaterialModel, unknown>) => (
                <MaterialCustomHeader title="Material" className="w-370px" />
            ),
            id: 'material.name',
            accessorKey: 'material.name',
        },
        // Kolom konversi material hanya muncul ketika tipe-nya Warehouse
        ...(type === 'Warehouse'
            ? [
                {
                    header: (props: HeaderContext<MaterialModel, unknown>) => (
                        <MaterialCustomHeader title="Konversi Material" className="w-370px" />
                    ),
                    id: 'conversion_material.name',
                    accessorKey: 'conversion_material.name',
                },
            ]
            : []),
        {
            header: (props: HeaderContext<MaterialModel, unknown>) => (
                <MaterialCustomHeader title="Jumlah" className="w-370px" />
            ),
            id: 'amount',
            accessorKey: 'amount',
        },
        {
            header: (props: HeaderContext<MaterialModel, unknown>) => (
                <MaterialCustomHeader title="Satuan UOM" className="w-370px" />
            ),
            id: 'material_uom.uom_actual.name',
            accessorKey: 'material_uom.uom_actual.name',
        },
        {
            header: (props: HeaderContext<MaterialModel, unknown>) => (
                <MaterialCustomHeader title="Catatan" className="w-370px" />
            ),
            id: 'remarks',
            accessorKey: 'remarks',
        },
        {
            header: (props: HeaderContext<MaterialModel, unknown>) => (
                <MaterialCustomHeader title="Aksi" className="w-20px" />
            ),
            id: 'actions',
            cell: (info) => (
                <MaterialActionsCell
                    onMaterialUpdated={onMaterialUpdated}
                    type={type}
                    materialData={info.row.original}
                    id={info.row.original.id}
                />
            ),
        },
    ];

export { materialColumns };