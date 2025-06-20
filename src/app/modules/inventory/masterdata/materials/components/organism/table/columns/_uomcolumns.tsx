import { ColumnDef } from '@tanstack/react-table';
import { UomActionsCell } from './UomActionsCell';
import { UomHeader } from './UomHeader';
import { Uom } from '../../../molecules/core/_models';

const uomColumns: ColumnDef<Uom>[] = [
  {
    header: (props) => <UomHeader title="No" className="w-10px" />,
    id: 'no',
    cell: (info) => info.row.index + 1, // Row index starts at 0, add 1 for a 1-based sequence
  },
  {
    header: (props) => <UomHeader title='Satuan UOM' className='w-450px' />,
    id: 'satuan_uom',
    accessorKey: 'uom_actual.name', // Access nested property for UOM name
  },
  // {
  //   header: (props) => <UomHeader title='Satuan Konversi' className='w-450px' />,
  //   id: 'satuan_konversi',
  //   accessorKey: 'uom_conversion.name', // Access nested property for conversion UOM name
  // },
  {
    header: (props) => <UomHeader title='Nilai Konversi' className='w-450px' />,
    id: 'konversi_uom',
    accessorKey: 'conversion', // Directly access the conversion value
  },
  {
    header: (props) => <UomHeader title='Barcode' className='w-450px' />,
    id: 'barcode',
    accessorKey: 'barcode', // Directly access the barcode
  },
  {
    header: (props) => <UomHeader title='SKU' className='w-450px' />,
    id: 'sku',
    accessorKey: 'sku', // Directly access the SKU
  },
  {
    header: (props) => <UomHeader title='Bisa Dijual' className='w-450px' />,
    id: 'bisa_dijual',
    accessorKey: 'uom_sellable', // Directly access the sellable status
    cell: (info) => (info.getValue() ? 'Ya' : 'Tidak'), // Convert boolean to "Ya" or "Tidak"
  },
  {
    header: (props) => <UomHeader title='Aksi' className='w-54px' />,
    id: 'actions',
    cell: (info) => <UomActionsCell id={info.row.original.id} />, // Pass the ID to the actions cell
  },
];

export { uomColumns };