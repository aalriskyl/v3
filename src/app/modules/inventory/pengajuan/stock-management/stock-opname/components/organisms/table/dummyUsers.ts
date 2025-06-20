import { Model } from '../../molecules/core/_models';

export const dummyUsers: Model[] = [
  {
    id: 1,
    opname_date: '2023-10-15',
    approved_by: '',
    request_by: '',
    status: 'Draft',
    material: 'Material A',
    uom: 'pcs',
    actual_stock: 100,
    note: 'Initial stock check',
  },
  {
    id: 2,
    opname_date: '2023-10-16',
    approved_by: '',
    request_by: 'Jane Smith',
    status: 'Submitted',
    material: 'Material B',
    uom: 'kg',
    actual_stock: 200,
    note: 'Monthly stock audit',
  },
  {
    id: 3,
    opname_date: '2024-10-17',
    approved_by: 'Manager C',
    request_by: 'Bob Brown',
    status: 'Rejected',
    material: 'Material C',
    uom: 'liters',
    actual_stock: 150,
    note: 'Stock discrepancy found',
  },
];