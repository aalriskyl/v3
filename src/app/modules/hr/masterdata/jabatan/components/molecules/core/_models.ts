import {ID, Response} from '@metronic/helpers'
export type Jabatan = {
  id?: ID
  name?: string
  created_at?: string
  sales_pengajuan_choose_all?: boolean
  sales_pengajuan_sales_order?: string
  sales_pengajuan_faktur_penjualan?: string
  sales_pengajuan_pembayaran_penjualan?: string
  sales_pengajuan_pergantian_harga?: string
  
  sales_laporan_choose_all?: boolean
  sales_laporan_sales_order?: boolean
  sales_laporan_faktur_penjualan?: boolean
  sales_laporan_pembayaran_penjualan?: boolean
  sales_laporan_history_harga?: boolean
  sales_laporan_laporan_transaksi_customer?: boolean

  sales_masterdata_choose_all?: boolean
  sales_masterdata_customer?: string

  purchasing_pengajuan_choose_all?: boolean
  purchasing_pengajuan_purchase_order?: string
  purchasing_pengajuan_faktur_pembelian?: string
  purchasing_pengajuan_pembayaran_pembelian?: string

  purchasing_laporan_choose_all?: boolean
  purchasing_laporan_purchase_order?: boolean
  purchasing_laporan_faktur_pembelian?: boolean
  purchasing_laporan_pembayaran_pembelian?: boolean
  purchasing_laporan_laporan_transaksi_supplier?: boolean

  purchasing_masterdata_choose_all?: boolean
  purchasing_masterdata_supplier?: string

  pos_choose_all?: boolean
  pos_aplikasi_pos?: string
  pos_pos_sales?: boolean
  pos_shift?: string
  pos_voucher?: string
  pos_meja?: string

  inventory_manajemenpengiriman_choose_all?: boolean
  inventory_manajemenpengiriman_catatan_pengiriman?: string
  inventory_manajemenpengiriman_catatan_penerimaan?: string
  inventory_manajemenpengiriman_material_request?: string
  inventory_manajemenpengiriman_material_transfer?: string
  inventory_manajemenpengiriman_retur?: string

  inventory_manajemenstock_choose_all?: boolean
  inventory_manajemenentrystock_entry_stock?: string
  inventory_manajemenstockopname_opname_stock?: string

  inventory_masterdata_choose_all?: boolean
  inventory_masterdata_material?: string
  inventory_masterdata_layanan?: string
  inventory_masterdata_finish_goods?: string
  inventory_masterdata_varian_finis_goods?: string
  inventory_masterdata_brand?: string
  inventory_masterdata_kategori_produk?: string
  inventory_masterdata_satuan_uom?: string
  inventory_masterdata_item_bundling?: string

  ppic_choose_all?: boolean
  ppic_billofmaterial?: string
  ppic_rencana_produksi?: string
  ppic_work_order?: string
  ppic_sisa_produksi?: string

  accounting_manajementransaksi_choose_all?: boolean
  accounting_manajementransaksi_entry_transaksi?: string
  accounting_manajementransaksi_pengajuan_anggaran?: string

  accounting_manajemenaset_choose_all?: boolean
  accounting_manajemenaset_aset?: boolean
  accounting_manajemenaset_kategori_aset?: boolean

  accounting_laporan_choose_all?: boolean
  accounting_laporan_arus_kas?: boolean
  accounting_laporan_neraca_keuangan?: boolean
  accounting_laporan_laporan_laba_rugi?: boolean
  accounting_laporan_jurnal_umum?: boolean
  accounting_laporan_buku_besar?: boolean
  accounting_laporan_rekapitulasi?: boolean
  accounting_laporan_piutang_usaha?: boolean
  accounting_laporan_utang_dagang?: boolean
  accounting_laporan_laporan_penjualan?: boolean
  accounting_laporan_laporan_pembelian?: boolean

  hr_dashboard_dashboard_choose_all?: boolean

  hr_manajemenpegawai_choose_all?: boolean
  hr_manajemenpegawai_absen?: string
  hr_manajemenpegawai_manajemen_lembur?: string
  hr_manajemenpegawai_manajemen_cuti?: string
  hr_manajemenpegawai_manajemen_perjalanan_dinas?: string
  hr_manajemenpegawai_perjalanan_resign?: string

  hr_manajemengaji_choose_all?: boolean
  hr_manajemengaji_slip_gaji?: string
  hr_manajemengaji_struktur_gaji?: string  

  hr_masterdata_choose_all?: boolean
  hr_masterdata_pegawai?: string
  hr_masterdata_jabatan?: string
  hr_masterdata_jenis_cuti?: string
  hr_masterdata_bagian_slip_gaji?: string

  company_manajemenperusahaan_manajemen_perusahaan?: string

}

export type UsersQueryResponse = Response<Array<Jabatan>>

export const initialJabatan: Jabatan = {
  name: '',
  created_at: '',
  sales_pengajuan_choose_all: false,
  sales_pengajuan_sales_order: '',
  sales_pengajuan_faktur_penjualan: '',
  sales_pengajuan_pembayaran_penjualan: '',
  sales_pengajuan_pergantian_harga: '',
  
  sales_laporan_choose_all: false,
  sales_laporan_sales_order: false,
  sales_laporan_faktur_penjualan: false,
  sales_laporan_pembayaran_penjualan: false,
  sales_laporan_history_harga: false,
  sales_laporan_laporan_transaksi_customer: false,

  sales_masterdata_choose_all: false,
  sales_masterdata_customer: '',

  purchasing_pengajuan_choose_all: false,
  purchasing_pengajuan_purchase_order: '',
  purchasing_pengajuan_faktur_pembelian: '',
  purchasing_pengajuan_pembayaran_pembelian: '',

  purchasing_laporan_choose_all: false,
  purchasing_laporan_purchase_order: false,
  purchasing_laporan_faktur_pembelian: false,
  purchasing_laporan_pembayaran_pembelian: false,
  purchasing_laporan_laporan_transaksi_supplier: false,

  purchasing_masterdata_choose_all: false,
  purchasing_masterdata_supplier: '',

  pos_choose_all: false,
  pos_aplikasi_pos: '',
  pos_pos_sales: false,
  pos_shift: '',
  pos_voucher: '',
  pos_meja: '',

  inventory_manajemenpengiriman_choose_all: false,
  inventory_manajemenpengiriman_catatan_pengiriman: '',
  inventory_manajemenpengiriman_catatan_penerimaan: '',
  inventory_manajemenpengiriman_material_request: '',
  inventory_manajemenpengiriman_material_transfer: '',
  inventory_manajemenpengiriman_retur: '',

  inventory_manajemenstock_choose_all: false,
  inventory_manajemenentrystock_entry_stock: '',
  inventory_manajemenstockopname_opname_stock: '',

  inventory_masterdata_choose_all: false,
  inventory_masterdata_material: '',
  inventory_masterdata_layanan: '',
  inventory_masterdata_finish_goods: '',
  inventory_masterdata_varian_finis_goods: '',
  inventory_masterdata_brand: '',
  inventory_masterdata_kategori_produk: '',
  inventory_masterdata_satuan_uom: '',
  inventory_masterdata_item_bundling: '',

  ppic_choose_all: false,
  ppic_billofmaterial: '',
  ppic_rencana_produksi: '',
  ppic_work_order: '',
  ppic_sisa_produksi: '',

  accounting_manajementransaksi_choose_all: false,
  accounting_manajementransaksi_entry_transaksi: '',
  accounting_manajementransaksi_pengajuan_anggaran: '',

  accounting_manajemenaset_choose_all: false,
  accounting_manajemenaset_aset: false,
  accounting_manajemenaset_kategori_aset: false,

  accounting_laporan_choose_all: false,
  accounting_laporan_arus_kas: false,
  accounting_laporan_neraca_keuangan: false,
  accounting_laporan_laporan_laba_rugi: false,
  accounting_laporan_jurnal_umum: false,
  accounting_laporan_buku_besar: false,
  accounting_laporan_rekapitulasi: false,
  accounting_laporan_piutang_usaha: false,
  accounting_laporan_utang_dagang: false,
  accounting_laporan_laporan_penjualan: false,
  accounting_laporan_laporan_pembelian: false,

  hr_dashboard_dashboard_choose_all: false,

  hr_manajemenpegawai_choose_all: false,
  hr_manajemenpegawai_absen: '',
  hr_manajemenpegawai_manajemen_lembur: '',
  hr_manajemenpegawai_manajemen_cuti: '',
  hr_manajemenpegawai_manajemen_perjalanan_dinas: '',
  hr_manajemenpegawai_perjalanan_resign: '',

  hr_manajemengaji_choose_all: false,
  hr_manajemengaji_slip_gaji: '',
  hr_manajemengaji_struktur_gaji: '',  

  hr_masterdata_choose_all: false,
  hr_masterdata_pegawai: '',
  hr_masterdata_jabatan: '',
  hr_masterdata_jenis_cuti: '',
  hr_masterdata_bagian_slip_gaji: '',

  company_manajemenperusahaan_manajemen_perusahaan: '',
};