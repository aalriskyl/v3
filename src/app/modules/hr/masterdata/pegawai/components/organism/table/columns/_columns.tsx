import { ColumnDef } from '@tanstack/react-table'
import { UserTwoStepsCell } from './UserTwoStepsCell'
import { UserActionsCell } from './UserActionsCell'
import { UserCustomHeader } from './UserCustomHeader'
import { Pegawai } from '../../../molecules/core/_models'

const pegawaiColumns: ColumnDef<Pegawai>[] = [
  {
    header: (props) => <UserCustomHeader tableProps={props} title="No" className="w-10px" />,
    id: 'no',
    cell: (info) => info.row.index + 1,
  },
  {
    header: (props) => <UserCustomHeader tableProps={props} title='Nama Lengkap' className='w-800px' />,
    id: 'name',
    accessorKey: 'name',
  },
  {
    header: (props) => <UserCustomHeader tableProps={props} title='No Pegawai' className='w-800px' />,
    id: 'no_employee',
    accessorKey: 'no_employee',
  },
  {
    header: (props) => <UserCustomHeader tableProps={props} title='Email' className='w-800px' />,
    id: 'email',
    accessorKey: 'email',
  },
  {
    header: (props) => <UserCustomHeader tableProps={props} title='Jabatan' className='w-800px' />,
    id: 'position_name',
    accessorFn: (row) => {
      const pegawaiWithCompany = row as Pegawai & { company_employees?: Array<{ position?: { name?: string } }> };
      return pegawaiWithCompany.company_employees?.[0]?.position?.name || '-';
    },
    cell: (info) => info.getValue() || '-',
  },
  {
    header: (props) => <UserCustomHeader tableProps={props} title='Jenis Kontrak' className='w-800px' />,
    id: 'contract_type',
    accessorKey: 'contract_type',
  },
  {
    header: (props) => (
      <UserCustomHeader tableProps={props} title='Aksi' className='w-54px' />
    ),
    id: 'actions',
    cell: (info) => <UserActionsCell id={info.row.original.id} />,
  },
]

export { pegawaiColumns }