import { ID } from "@metronic/helpers";

export type ListDataType = {
  id: ID; // Tetap gunakan ID dari @metronic/helpers
  name?: string; // Nama akun (opsional)
  tanggal?: string; // Tanggal transaksi (opsional)
  no_account?: string; // Nomor akun (opsional)
  status?: any; // Status transaksi (opsional)
  totalDebit?: string; // Total debit (opsional)
  totalCredit?: string; // Total kredit (opsional)
  subRows?: SubRowType[]; // Sub-rows untuk detail debit dan kredit
};

export type SubRowType = {
  id: string; // ID unik untuk sub-row
  akun?: string; // Nama akun (opsional, jika diperlukan)
  debit: string; // Nilai debit
  credit: string; // Nilai kredit
};