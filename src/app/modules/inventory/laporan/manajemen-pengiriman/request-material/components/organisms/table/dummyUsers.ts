import { Model, MaterialModel } from '../../molecules/core/_models';

export const dummyUsers: Model[] = [
  {
    id: 1,
    material_request_number: 'MRN001',
    status: 'Approved',
    plan_production: 'Plan Production A',
    supplier: 'Supplier A',
    request_by: 'John Doe',
    approved_by: '',
  },
  {
    id: 2,
    material_request_number: 'MRN002',
    status: 'Approved',
    plan_production: 'Plan Production B',
    supplier: 'Supplier B',
    request_by: 'Jane Smith',
    approved_by: 'Manager A',
  },
  {
    id: 3,
    material_request_number: 'MRN003',
    status: 'Approved',
    plan_production: 'Plan Production C',
    supplier: 'Supplier C',
    request_by: 'Bob Brown',
    approved_by: 'Manager B',
  },
];

export const dummyMaterials: MaterialModel[] = [
  {
    id: 1,
    material: 'Material A',
    uom: 'pcs',
    jumlah: 100,
  },
  {
    id: 2,
    material: 'Material B',
    uom: 'kg',
    jumlah: 200,
  },
  {
    id: 3,
    material: 'Material C',
    uom: 'liters',
    jumlah: 150,
  },
];