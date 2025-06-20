import { ColumnDef } from '@tanstack/react-table';
import { SupplierActionsCell } from './SupplierActionsCell';
import { SupplierHeader } from './SupplierHeader';
import { Supplier } from '../../../molecules/core/_models';

const supplierColumns: ColumnDef<Supplier>[] = [
  {
    header: (props) => <SupplierHeader tableProps={props} title="No" className="w-10px" />,
    id: 'no',
    cell: (info) => info.row.index + 1,
  },
  {
    header: (props) => <SupplierHeader tableProps={props} title="Supplier" className="w-800px" />,
    id: 'supplier',
    accessorKey: 'supplier.name',
  },
  {
    header: (props) => <SupplierHeader tableProps={props} title="Harga Beli" className="w-800px" />,
    id: 'harga_beli',
    accessorKey: 'buy_price',
  },
  // {
  //   header: (props) => <SupplierHeader tableProps={props} title="Harga Jual" className="w-800px" />,
  //   id: 'harga_jual',
  //   accessorKey: 'sell_price',
  // },
  {
    header: (props) => <SupplierHeader tableProps={props} title="Aksi" className="w-54px" />,
    id: 'actions',
    cell: (info) => <SupplierActionsCell id={info.row.original.id} />,
  },
];

export { supplierColumns };