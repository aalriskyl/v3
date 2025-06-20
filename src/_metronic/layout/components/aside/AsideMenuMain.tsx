import { useIntl } from "react-intl";
import { AsideMenuItemWithSub } from "./AsideMenuItemWithSub";
import { AsideMenuItem } from "./AsideMenuItem";
import { AsideFooter } from "./AsideFooter";
import { KTIcon } from "../../../helpers";

export function AsideMenuMain() {
  const intl = useIntl();

  return (
    <>
      <AsideMenuItemWithSub
        to="/crm"
        title="CRM"
        icon="book-square"
        fontIcon="KTIcons"
      >
        <div style={{ fontWeight: "400" }}>
          <AsideMenuItemWithSub
            to="/crm/pengajuan"
            title="Pengajuan"
            hasBullet={true}
          >
            <AsideMenuItem
              to="/crm/pengajuan/penawaran"
              title="Penawaran"
              hasBullet={true}
            />
          </AsideMenuItemWithSub>
        </div>

        {/* Sales End  */}
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to="/sales"
        title="Sales"
        icon="book-square"
        fontIcon="KTIcons"
      >
        <div style={{ fontWeight: "400" }}>
          <AsideMenuItemWithSub
            to="/sales/pengajuan"
            title="Pengajuan"
            hasBullet={true}
          >
            <AsideMenuItem
              to="/sales/pengajuan/request-order"
              title="Request Order"
              hasBullet={true}
            />
            <AsideMenuItem
              to="/sales/pengajuan/faktur-penjualan"
              title="Faktur Penjualan"
              hasBullet={true}
            />
            <AsideMenuItem
              to="/sales/pengajuan/pembayaran-faktur-penjualan"
              title="Pembayaran Faktur Penjualan"
              hasBullet={true}
            />
          </AsideMenuItemWithSub>
          <AsideMenuItemWithSub
            to="/crafted/pages/wizards"
            title="Laporan"
            hasBullet={true}
          ></AsideMenuItemWithSub>

          <AsideMenuItemWithSub
            to="/sales/masterdata"
            title="Master Data"
            hasBullet={true}
          >
            <AsideMenuItem
              to="/sales/masterdata/customers"
              title="Customer"
              hasBullet={true}
            />
          </AsideMenuItemWithSub>
        </div>

        {/* Sales End  */}
      </AsideMenuItemWithSub>

      {/*Procurement*/}

      <AsideMenuItemWithSub
        to="/procurement"
        title="Procurement"
        icon="book-square"
        fontIcon="KTIcons"
      >
        <div style={{ fontWeight: "400" }}>
          <AsideMenuItemWithSub
            to="/procurement/pengajuan"
            title="Pengajuan"
            hasBullet={true}
          >
            <AsideMenuItem
              to="/procurement/pengajuan/purchase-request"
              title="Purchase Request"
              hasBullet={true}
            />
            <AsideMenuItem
              to="/procurement/pengajuan/faktur-pembelian"
              title="Faktur Pembelian"
              hasBullet={true}
            />
            <AsideMenuItem
              to="/procurement/pengajuan/pembayaran-faktur-pembelian"
              title="Pembayaran Faktur Pembelian"
              hasBullet={true}
            />
          </AsideMenuItemWithSub>
          <AsideMenuItemWithSub
            to="/crafted/pages/wizards"
            title="Laporan"
            hasBullet={true}
          >
            {/* <AsideMenuItem
            to='/crafted/pages/wizards/horizontal'
            title='Loreml'
            hasBullet={true}
          />
          <AsideMenuItem to='/crafted/pages/wizards/vertical' title='Vertical' hasBullet={true} /> */}
          </AsideMenuItemWithSub>

          <AsideMenuItemWithSub
            to="/procurement/masterdata"
            title="Master Data"
            hasBullet={true}
          >
            <AsideMenuItem
              to="/procurement/masterdata/suppliers"
              title="Supplier"
              hasBullet={true}
            />
          </AsideMenuItemWithSub>
        </div>

        {/* Procurement End  */}
      </AsideMenuItemWithSub>

      {/* Inventory start  */}

      <AsideMenuItemWithSub
        to="/inventory"
        title="Inventory"
        icon="book-square"
        fontIcon="KTIcons"
      >
        <div className="fw-normal">
          <AsideMenuItemWithSub
            to="/inventory/pengajuan"
            title="Pengajuan"
            hasBullet={true}
          >
            <div style={{ marginLeft: "18px", fontWeight: "400" }}>
              <AsideMenuItemWithSub
                to="/inventory/pengajuan/manajemen-pengiriman"
                title="Manajemen Pengiriman"
                hasBullet={true}
              >
                <AsideMenuItem
                  to="/inventory/pengajuan/manajemen-pengiriman/material-request"
                  title="Material Request"
                  hasBullet={true}
                />
                <AsideMenuItem
                  to="/inventory/pengajuan/manajemen-pengiriman/catatan-pengiriman"
                  title="Catatan Pengiriman"
                  hasBullet={true}
                />
                <AsideMenuItem
                  to="/inventory/pengajuan/manajemen-pengiriman/catatan-penerimaan"
                  title="Catatan Penerimaan"
                  hasBullet={true}
                />
                {/* <AsideMenuItem
                  to="/inventory/pengajuan/manajemen-pengiriman/retur"
                  title="Retur"
                  hasBullet={true}
                /> */}
                <AsideMenuItem
                  to="/inventory/pengajuan/manajemen-pengiriman/retur-pembelian"
                  title="Retur Pembelian"
                  hasBullet={true}
                />
                <AsideMenuItem
                  to="/inventory/pengajuan/manajemen-pengiriman/retur-penjualan"
                  title="Retur Penjualan"
                  hasBullet={true}
                />
              </AsideMenuItemWithSub>

              <AsideMenuItemWithSub
                to="/inventory/pengajuan/manajemen-stok"
                title="Manajemen Stok"
                hasBullet={true}
              >
                <AsideMenuItem
                  to="/inventory/pengajuan/manajemen-stok/entry-stock"
                  title="Entry Stock"
                  hasBullet={true}
                />
                <AsideMenuItem
                  to="/inventory/pengajuan/manajemen-stok/stock-opname"
                  title="Stock Opname"
                  hasBullet={true}
                />
              </AsideMenuItemWithSub>
            </div>
          </AsideMenuItemWithSub>

          <AsideMenuItemWithSub
            to="/inventory/laporan"
            title="Laporan"
            hasBullet={true}
          >
            <div style={{ marginLeft: "18px", fontWeight: "400" }}>
              <AsideMenuItemWithSub
                to="/inventory/laporan/manajemen-pengiriman"
                title="Manajemen Pengiriman"
                hasBullet={true}
              >
                <AsideMenuItem
                  to="/inventory/laporan/manajemen-pengiriman/material-request"
                  title="Material Request"
                  hasBullet={true}
                />
                <AsideMenuItem
                  to="/inventory/laporan/manajemen-pengiriman/catatan-pengiriman"
                  title="Catatan Pengiriman"
                  hasBullet={true}
                />
                <AsideMenuItem
                  to="/inventory/laporan/manajemen-pengiriman/catatan-penerimaan"
                  title="Catatan Penerimaan"
                  hasBullet={true}
                />
              </AsideMenuItemWithSub>

              <AsideMenuItemWithSub
                to="/inventory/laporan/manajemen-stok"
                title="Manajemen Stok"
                hasBullet={true}
              >
                <AsideMenuItem
                  to="/inventory/laporan/manajemen-stok/entry-stock"
                  title="Entry Stock"
                  hasBullet={true}
                />
                <AsideMenuItem
                  to="/inventory/laporan/manajemen-stok/stock-opname"
                  title="Stock Opname"
                  hasBullet={true}
                />
                <AsideMenuItem
                  to="/inventory/laporan/manajemen-stok/stock-card"
                  title="Stock Card"
                  hasBullet={true}
                />
                <AsideMenuItem
                  to="/inventory/laporan/manajemen-stok/stock-ledger"
                  title="Stock Ledger"
                  hasBullet={true}
                />
                <AsideMenuItem
                  to="/inventory/laporan/manajemen-stok/stock-journal"
                  title="Stock Journal"
                  hasBullet={true}
                />
                <AsideMenuItem
                  to="/inventory/laporan/manajemen-stok/stock-balance"
                  title="Stock Balance"
                  hasBullet={true}
                />
                <AsideMenuItem
                  to="#"
                  title="Laporan Penerimaan Brang"
                  hasBullet={true}
                />
              </AsideMenuItemWithSub>
            </div>
          </AsideMenuItemWithSub>
          <AsideMenuItemWithSub
            to="/inventory/masterdata"
            title="Master Data"
            hasBullet={true}
          >
            <AsideMenuItem
              to="/inventory/masterdata/materials"
              title="Materials"
              hasBullet={true}
            />
            <AsideMenuItem
              to="/inventory/masterdata/finish-goods"
              title="Finish Goods"
              hasBullet={true}
            />
            <AsideMenuItem
              to="/inventory/masterdata/layanan"
              title="Layanan"
              hasBullet={true}
            />
            <AsideMenuItem
              to="/inventory/masterdata/brand"
              title="Brand"
              hasBullet={true}
            />
            <AsideMenuItem
              to="/inventory/masterdata/kategori-produk"
              title="Kategori Produk"
              hasBullet={true}
            />
            <AsideMenuItem
              to="/inventory/masterdata/satuan-uom"
              title="Satuan/UOM"
              hasBullet={true}
            />
            {/* <AsideMenuItem
            to='/inventory/masterdata/skema-harga'
            title='Skema Harga'
            hasBullet={true}
          /> */}
            <AsideMenuItem
              to="/inventory/masterdata/item-bundling"
              title="Item Bundling"
              hasBullet={true}
            />
            <AsideMenuItem
              to="/inventory/masterdata/gudang"
              title="Gudang"
              hasBullet={true}
            />

            <div style={{ marginLeft: "18px", fontWeight: "400" }}>
              <AsideMenuItemWithSub
                to="/inventory/masterdata/varian"
                title="Varian"
                hasBullet={true}
              >
                {/* <AsideMenuItem
                to='/inventory/masterdata/varian/varian-material'
                title='Varian Material'
                hasBullet={true}
              />
              <AsideMenuItem
                to='/inventory/masterdata/varian/varian-layanan'
                title='Varian Layanan'
                hasBullet={true}
              /> */}
                <AsideMenuItem
                  to="/inventory/masterdata/varian/varian-finish-goods"
                  title="Varian Finish Goods"
                  hasBullet={true}
                />
              </AsideMenuItemWithSub>
            </div>
          </AsideMenuItemWithSub>
        </div>
      </AsideMenuItemWithSub>

      <AsideMenuItemWithSub
        to="/ppic"
        title="PPIC"
        icon="book-square"
        fontIcon="KTIcons"
      >
        <div style={{ fontWeight: "400" }}>
          <AsideMenuItemWithSub
            to="/ppic/pengajuan"
            title="Pengajuan"
            hasBullet={true}
          >
            <AsideMenuItem
              to="/ppic/pengajuan/plan-production"
              title="Plan Production"
              hasBullet={true}
            />
          </AsideMenuItemWithSub>
          <AsideMenuItemWithSub
            to="/ppic/laporan"
            title="Laporan"
            hasBullet={true}
          >
            <AsideMenuItem
              to="/ppic/laporan/plan-production"
              title="Plan Production"
              hasBullet={true}
            />
          </AsideMenuItemWithSub>
          <AsideMenuItemWithSub
            to="/ppic/masterdata"
            title="Master Data"
            hasBullet={true}
          >
            <AsideMenuItem
              to="/ppic/masterdata/bom"
              title="Bill of Material"
              hasBullet={true}
            />
          </AsideMenuItemWithSub>
        </div>
      </AsideMenuItemWithSub>

      <AsideMenuItemWithSub
        to="/accounting"
        title="Accounting"
        icon="book-square"
        fontIcon="KTIcons"
      >
        <div style={{ fontWeight: "400" }}>
          <AsideMenuItemWithSub
            to="/accounting/manajemen-transaksi"
            title="Manajemen Transaksi"
            hasBullet={true}
          >
            <AsideMenuItem
              to="/accounting/manajemen-transaksi/purchase-order"
              title="Purchase Order"
              hasBullet={true}
            />
            <AsideMenuItem
              to="/accounting/manajemen-transaksi/sales-order"
              title="Sales Order"
              hasBullet={true}
            />
          </AsideMenuItemWithSub>
          <AsideMenuItemWithSub
            to="/accounting/bookkeeping-management"
            title="Manajemen Pembukuan"
            hasBullet={true}
          >
            <AsideMenuItem
              to="/accounting/manajemen-pembukuan/pembukuan-perusahaan"
              title="Pembukuan Perusahaan"
              hasBullet={true}
            />
          </AsideMenuItemWithSub>
          <AsideMenuItemWithSub
            to="/accounting/laporan"
            title="Laporan"
            hasBullet={true}
          >
            <AsideMenuItem
              to="/accounting/laporan/jurnal"
              title="Jurnal"
              hasBullet={true}
            />
            <AsideMenuItem
              to="/accounting/laporan/buku-besar"
              title="Buku Besar"
              hasBullet={true}
            />
          </AsideMenuItemWithSub>
          <AsideMenuItemWithSub
            to="/accounting/masterdata"
            title="Master Data"
            hasBullet={true}
          >
            <AsideMenuItem
              to="/accounting/masterdata/chart-of-account"
              title="Chart of Account"
              hasBullet={true}
            />
            <AsideMenuItem
              to="/accounting/masterdata/payment-term"
              title="Terms of Payment"
              hasBullet={true}
            />
          </AsideMenuItemWithSub>
        </div>
      </AsideMenuItemWithSub>
      
      <AsideMenuItemWithSub
        to="/hr"
        title="HR"
        icon="book-square"
        fontIcon="KTIcons"
      >
        <div style={{ fontWeight: "400" }}>
        <AsideMenuItemWithSub
          to="/hr/manajemen-pegawai"
          title="Manajemen Pegawai"
          hasBullet={true}
        ></AsideMenuItemWithSub>
        <AsideMenuItemWithSub
          to="/hr/manajemen-gaji"
          title="Manajemen Gaji"
          hasBullet={true}
        ></AsideMenuItemWithSub>
        <AsideMenuItemWithSub
          to="/hr/masterdata"
          title="Master Data"
          hasBullet={true}
        >
          <AsideMenuItem
            to="/hr/masterdata/pegawai"
            title="Pegawai"
            hasBullet={true}
          />
          <AsideMenuItem
            to="/hr/masterdata/jabatan"
            title="Jabatan"
            hasBullet={true}
          />
        </AsideMenuItemWithSub>
        </div>
      </AsideMenuItemWithSub>

      {/* Company*/}

      <AsideMenuItemWithSub
        to="/company"
        title="Company"
        icon="book-square"
        fontIcon="KTIcons"
      >
        <AsideMenuItem
          to="/company/perusahaan"
          title="Perusahaan"
          hasBullet={true}
        />
        <AsideMenuItem
          to="/company/tahun-fiskal"
          title="Tahun Fiskal"
          hasBullet={true}
        />
      </AsideMenuItemWithSub>

      <AsideMenuItemWithSub
        to="/pos"
        title="Pos"
        icon="book-square"
        fontIcon="KTIcons"
      >
        <AsideMenuItemWithSub
          to="/pos/masterdata"
          title="Master Data"
          hasBullet={true}
        >
          <AsideMenuItem
            to="/pos/masterdata/jenis-meja"
            title="Jenis Meja"
            hasBullet={true}
          />
          <AsideMenuItem
            to="/pos/masterdata/meja"
            title="Meja"
            hasBullet={true}
          />
           <AsideMenuItem
            to="/pos/masterdata/costumer"
            title="Costumer"
            hasBullet={true}
          />
        </AsideMenuItemWithSub>
      </AsideMenuItemWithSub>

      {/* <AsideMenuItemWithSub to='/error' title='Errors' fontIcon='bi-sticky' icon='cross-circle'>
        <AsideMenuItem to='/error/404' title='Error 404' hasBullet={true} />
        <AsideMenuItem to='/error/500' title='Error 500' hasBullet={true} />
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to='/crafted/widgets'
        title='Widgets'
        icon='element-11'
        fontIcon='bi-layers'
      >
        <AsideMenuItem to='/crafted/widgets/lists' title='Lists' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/statistics' title='Statistics' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/charts' title='Charts' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/mixed' title='Mixed' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/tables' title='Tables' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/feeds' title='Feeds' hasBullet={true} />
      </AsideMenuItemWithSub>
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Apps</span>
        </div>
      </div>
      <AsideMenuItemWithSub
        to='/apps/chat'
        title='Chat'
        fontIcon='bi-chat-left'
        icon='message-text-2'
      >
        <AsideMenuItem to='/apps/chat/private-chat' title='Private Chat' hasBullet={true} />
        <AsideMenuItem to='/apps/chat/group-chat' title='Group Chart' hasBullet={true} />
        <AsideMenuItem to='/apps/chat/drawer-chat' title='Drawer Chart' hasBullet={true} />
      </AsideMenuItemWithSub>
      <AsideMenuItem
        to='/apps/user-management/users'
        icon='shield-tick'
        title='User management'
        fontIcon='bi-layers'
      />
      <AsideMenuItem to="/my-page" title="My Page" /> */}
    </>
  );
}
