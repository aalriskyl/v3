import { ColumnDef, HeaderContext } from "@tanstack/react-table";
import { MaterialActionsCell } from "./MaterialActionsCell";
import { MaterialCustomHeader } from "./MaterialCustomHeader";
import { MaterialModel } from "../../../molecules/core/_models";
import { MaterialActionsCellDetail } from "./MaterialActionsCellDetail";
import { useMaterial } from "../../../molecules/core/MaterialContext";

const materialColumnsDetail = (
  onMaterialUpdated: () => void,
  status: string,
  type: string,
  materialData?: string
): ColumnDef<MaterialModel>[] => [
  {
    header: (props: HeaderContext<MaterialModel, unknown>) => (
      <MaterialCustomHeader title="No" className="w-10px" />
    ),
    id: "no",
    cell: (info) => {
      const { pagination } = useMaterial();

      return (
        pagination.pageIndex * pagination.pageSize -
        pagination.pageSize +
        info.row.index +
        1
      );
    },
  },
  {
    header: (props: HeaderContext<MaterialModel, unknown>) => (
      <MaterialCustomHeader title="Material" className="w-370px" />
    ),
    id: "material.name",
    accessorKey: "material.name",
  },
  // // Kolom konversi material hanya muncul ketika tipe-nya Warehouse

  {
    header: (props: HeaderContext<MaterialModel, unknown>) => (
      <MaterialCustomHeader title="Satuan UOM" className="w-370px" />
    ),
    id: "material_uom.uom_actual.name",
    accessorKey: "material_uom.uom_actual.name",
  },
  {
    header: (props: HeaderContext<MaterialModel, unknown>) => (
      <MaterialCustomHeader title="Jumlah" className="w-370px" />
    ),
    id: "amount",
    accessorKey: "amount",
  },
  ...(type === "Standard"
    ? [
        {
          header: (props: HeaderContext<MaterialModel, unknown>) => (
            <MaterialCustomHeader title="Jumlah Diretur" className="w-370px" />
          ),
          id: "amount_retur",
          accessorKey: "amount_retur",
        },
      ]
    : [
        {
          header: (props: HeaderContext<MaterialModel, unknown>) => (
            <MaterialCustomHeader
              title="Jumlah Dimusnahkan"
              className="w-370px"
            />
          ),
          id: "amount_destroy",
          accessorKey: "amount_destroy",
        },
      ]),
  {
    header: (props: HeaderContext<MaterialModel, unknown>) => (
      <MaterialCustomHeader title="Catatan" className="w-370px" />
    ),
    id: "remarks",
    accessorKey: "remarks",
  },
  {
    header: (props: HeaderContext<MaterialModel, unknown>) => (
      <MaterialCustomHeader title="Aksi" className="w-20px" />
    ),
    id: "actions",
    cell: (info) => (
      <MaterialActionsCellDetail
        onMaterialUpdated={onMaterialUpdated}
        materialData={materialData}
        id={info.row.original.id}
        status={status}
        type={type}
      />
    ),
  },
];

export { materialColumnsDetail };
