export type ListView = {
  id: string;
  name: string;
  status: boolean;
  position_permissions: null;
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: null | string;
};

export type Modules = {
  id: number;
  name: string;
  sub_modules: {
    name: string;
    sub_sub_modules: {
      id: number;
      name: string;
    }[];
  }[];
};

export type DetailView = {
  id: string;
  name: string;
  permissions: {
    id: number;
    name: string;
    submodules: {
      name: string;
      submodules: {
        id: number;
        name: string;
        permission: {
          id: string;
          view: boolean;
          create: boolean;
          update: boolean;
          delete: boolean;
          approve: boolean;
          sub_module_id: number;
          position_id: string;
          submodule: {
            id: number;
            name: string;
            parent_sub_module: string;
            module: {
              id: number;
              name: string;
            };
            module_id: number;
          };
        };
      }[];
    }[];
  }[];
  status: boolean;
};

const dawd = {
  id: "7403ae7b-99c2-4ef2-a153-7c64f9cc22f0",
  name: "Test",
  permissions: [
    {
      id: 1,
      name: "Sales",
      submodules: [
        {
          name: "Laporan",
          submodules: [
            {
              id: 5,
              name: "Sales Order",
              permission: {
                id: "e6136ea3-6b5f-42b1-adfb-78fe16f71db3",
                view: false,
                create: false,
                update: false,
                delete: false,
                approve: false,
                sub_module_id: 5,
                position_id: "7403ae7b-99c2-4ef2-a153-7c64f9cc22f0",
                submodule: {
                  id: 5,
                  name: "Sales Order",
                  parent_sub_module: "Laporan",
                  module: {
                    id: 1,
                    name: "Sales",
                  },
                  module_id: 1,
                },
              },
            },
            {
              id: 6,
              name: "Faktur Penjualan",
              permission: {
                id: "4b3a5009-ed8c-48bc-bb77-851845800afd",
                view: false,
                create: false,
                update: false,
                delete: false,
                approve: false,
                sub_module_id: 6,
                position_id: "7403ae7b-99c2-4ef2-a153-7c64f9cc22f0",
                submodule: {
                  id: 6,
                  name: "Faktur Penjualan",
                  parent_sub_module: "Laporan",
                  module: {
                    id: 1,
                    name: "Sales",
                  },
                  module_id: 1,
                },
              },
            },
            {
              id: 7,
              name: "Pembayaran Penjualan",
              permission: {
                id: "9710f7a2-4142-47ec-8e6b-7630f67b02eb",
                view: false,
                create: false,
                update: false,
                delete: false,
                approve: false,
                sub_module_id: 7,
                position_id: "7403ae7b-99c2-4ef2-a153-7c64f9cc22f0",
                submodule: {
                  id: 7,
                  name: "Pembayaran Penjualan",
                  parent_sub_module: "Laporan",
                  module: {
                    id: 1,
                    name: "Sales",
                  },
                  module_id: 1,
                },
              },
            },
          ],
        },
        {
          name: "Pengajuan",
          submodules: [
            {
              id: 1,
              name: "Sales Order",
              permission: {
                id: "4b3a9075-e4c6-4f39-bf3b-75e9ad17fab5",
                view: true,
                create: false,
                update: false,
                delete: false,
                approve: true,
                sub_module_id: 1,
                position_id: "7403ae7b-99c2-4ef2-a153-7c64f9cc22f0",
                submodule: {
                  id: 1,
                  name: "Sales Order",
                  parent_sub_module: "Pengajuan",
                  module: {
                    id: 1,
                    name: "Sales",
                  },
                  module_id: 1,
                },
              },
            },
            {
              id: 2,
              name: "Faktur Penjualan",
              permission: {
                id: "04b96bfc-c484-4ba8-bacc-792958d8e992",
                view: false,
                create: true,
                update: false,
                delete: false,
                approve: false,
                sub_module_id: 2,
                position_id: "7403ae7b-99c2-4ef2-a153-7c64f9cc22f0",
                submodule: {
                  id: 2,
                  name: "Faktur Penjualan",
                  parent_sub_module: "Pengajuan",
                  module: {
                    id: 1,
                    name: "Sales",
                  },
                  module_id: 1,
                },
              },
            },
            {
              id: 3,
              name: "Pembayaran Penjualan",
              permission: {
                id: "108ac1aa-ee90-461d-a9f8-ec005507c612",
                view: false,
                create: false,
                update: true,
                delete: false,
                approve: false,
                sub_module_id: 3,
                position_id: "7403ae7b-99c2-4ef2-a153-7c64f9cc22f0",
                submodule: {
                  id: 3,
                  name: "Pembayaran Penjualan",
                  parent_sub_module: "Pengajuan",
                  module: {
                    id: 1,
                    name: "Sales",
                  },
                  module_id: 1,
                },
              },
            },
            {
              id: 4,
              name: "Pergantian Harga",
              permission: {
                id: "03d4002d-00aa-4550-ad0b-a19b29880ed1",
                view: false,
                create: false,
                update: false,
                delete: true,
                approve: false,
                sub_module_id: 4,
                position_id: "7403ae7b-99c2-4ef2-a153-7c64f9cc22f0",
                submodule: {
                  id: 4,
                  name: "Pergantian Harga",
                  parent_sub_module: "Pengajuan",
                  module: {
                    id: 1,
                    name: "Sales",
                  },
                  module_id: 1,
                },
              },
            },
          ],
        },
      ],
    },
  ],
  status: true,
};
