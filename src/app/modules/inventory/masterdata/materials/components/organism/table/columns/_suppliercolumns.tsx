import { ColumnDef } from '@tanstack/react-table'
import { SupplierActionsCell } from './SupplierActionsCell'
import { SupplierHeader } from './SupplierHeader'
import { Supplier } from '../../../molecules/core/_models'

const supplierColumns: ColumnDef<Supplier>[] = [
  {
    header: () => <SupplierHeader title="No" className="w-10px" />,
    id: 'no',
    cell: (info) => info.row.index + 1,
  },
  {
    header: () => <SupplierHeader title="Supplier" className="w-450px" />,
    id: 'name',
    accessorKey: 'supplier.name', // Accessing the supplier's name
  },
  {
    header: () => <SupplierHeader title="Harga Beli" className="w-450px" />,
    id: 'purchase_price',
    accessorKey: 'buy_price', // Accessing the buy price
  },
  // {
  //   header: () => <SupplierHeader title="Harga Jual" className="w-450px" />,
  //   id: 'selling_price',
  //   accessorKey: 'selling_price', // This key does not exist in your data
  //   // You may want to remove this column or provide a default value
  // },
  {
    header: (props) => (
      <SupplierHeader title='Aksi' className='w-54px' />
    ),
    id: 'actions',
    cell: (info) => <SupplierActionsCell id={info.row.original.id} />,
  },
]

export { supplierColumns }