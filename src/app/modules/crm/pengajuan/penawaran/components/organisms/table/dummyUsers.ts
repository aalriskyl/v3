/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model, MaterialModel } from '../../molecules/core/_models';

export const dummyUsers: Model[] = [
  {
    id: 1,
    material_request_number: 'MRN001',
    status: 'Draft',
    plan_production: 'Plan Production A',
    supplier: 'Supplier A',
    request_by: 'John Doe',
    approved_by: '',
  },
  {
    id: 2,
    material_request_number: 'MRN002',
    status: 'Submitted',
    plan_production: 'Plan Production B',
    supplier: 'Supplier B',
    request_by: 'Jane Smith',
    approved_by: 'Manager A',
  },
  {
    id: 3,
    material_request_number: 'MRN003',
    status: 'Rejected',
    plan_production: 'Plan Production C',
    supplier: 'Supplier C',
    request_by: 'Bob Brown',
    approved_by: 'Manager B',
  },
];

export const dummyMaterials: any[] = [
  {
    id: 1,
    material: 'Material A',
    uom: 'pcs',
    quantity: 100,
  },
  {
    id: 2,
    material: 'Material B',
    uom: 'kg',
    quantity: 200,
  },
  {
    id: 3,
    material: 'Material C',
    uom: 'liters',
    quantity: 150,
  },
];