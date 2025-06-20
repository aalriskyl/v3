import { ID } from "@metronic/helpers";

export type ListDataType = {
  id: any;
  name?: string;
  tanggal?: string;
  no_account?: string;
  status?: any;
  totalDebit?: string;
  totalCredit?: string;
  // Sub rows harus menggunakan tipe yang sama dengan parent
  subRows?: ListDataType[];
};

// Hapus atau modifikasi DetailDataType jika tidak diperlukan
