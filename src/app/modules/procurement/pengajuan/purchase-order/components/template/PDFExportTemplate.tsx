// components/pdf/Templates/PurchaseRequestTemplate.tsx
import React from "react";

interface PurchaseRequestTemplateProps {
  exportData: any;
}

const formatDate = (dateString?: string): string => {
  if (!dateString) return "-";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "-";
  }
};

const formatCurrency = (value?: number): string => {
  if (value === undefined || isNaN(value)) return "Rp 0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};

const calculateTotal = (items: any[] = [], isService = false): number => {
  return items.reduce((sum, item) => {
    const amount = Number(isService ? item.amount || 1 : item.amount || 0);
    const price = Number(item.price) || 0;
    return sum + amount * price;
  }, 0);
};

const PurchaseRequestTemplate: React.FC<PurchaseRequestTemplateProps> = ({
  exportData,
}) => {
  const poData = exportData?.data || exportData || {};
  const hasMaterials = poData.purchase_order_materials?.length > 0;
  const hasServices = poData.purchase_order_services?.length > 0;

  if (!hasMaterials && !hasServices) return null;

  const materialTotal = calculateTotal(poData.purchase_order_materials);
  const serviceTotal = calculateTotal(poData.purchase_order_services, true);
  const grandTotal = materialTotal + serviceTotal;

  // Styles
  const pageStyle: React.CSSProperties = {
    width: "100%",
    padding: "0",
    margin: "0",
    fontFamily: "'Arial', sans-serif",
    color: "#333",
    lineHeight: 1.5,
    maxWidth: "170mm",
  };

  const headerStyle: React.CSSProperties = {
    position: "sticky",
    top: 0,
    backgroundColor: "#ffffff",
    paddingBottom: "10mm",
    marginBottom: "10mm",
  };

  const tableHeaderStyle: React.CSSProperties = {
    backgroundColor: "#f5f5f5",
    fontWeight: "bold",
  };

  const tableCellStyle: React.CSSProperties = {
    border: "1px solid #ddd",
    padding: "8px",
  };

  const rightAlignedCell: React.CSSProperties = {
    ...tableCellStyle,
    textAlign: "right",
  };

  return (
    <div style={pageStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h1 style={{ fontSize: "24pt", margin: "0 0 5px 0" }}>
          PURCHASE REQUEST
        </h1>
      </div>

      {/* Information Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        {/* Left Column */}
        <div>
          <div style={{ marginBottom: "15px" }}>
            <strong>Nomor Purchase Request:</strong>{" "}
            {poData.no_purchase_order || "-"}
          </div>
          <div style={{ marginBottom: "15px" }}>
            <strong>Supplier:</strong> {poData.supplier?.name || "-"}
          </div>
          <div style={{ marginBottom: "15px" }}>
            <strong>Requested By:</strong> {poData.requested_by?.name || "-"}
          </div>
        </div>

        {/* Right Column */}
        <div>
          <div style={{ marginBottom: "15px" }}>
            <strong>Type:</strong> {poData.type || "-"}
          </div>
          <div style={{ marginBottom: "15px" }}>
            <strong>Material Request:</strong>{" "}
            {poData.material_request?.no_material_request || "-"}
          </div>
          <div style={{ marginBottom: "15px" }}>
            <strong>Created Date:</strong> {formatDate(poData.CreatedAt)}
          </div>
        </div>
      </div>

      {/* Materials Table */}
      {hasMaterials && (
        <div style={{ marginBottom: "30px", pageBreakInside: "avoid" }}>
          <h2 style={{ fontSize: "18pt", marginBottom: "15px" }}>Materials</h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={tableHeaderStyle}>
                <th style={tableCellStyle}>No</th>
                <th style={tableCellStyle}>Material</th>
                <th style={rightAlignedCell}>Jumlah</th>
                <th style={tableCellStyle}>UOM</th>
                <th style={rightAlignedCell}>Harga per Unit</th>
                <th style={rightAlignedCell}>Total</th>
              </tr>
            </thead>
            <tbody>
              {poData.purchase_order_materials.map(
                (item: any, index: number) => (
                  <tr key={`material-${index}`}>
                    <td style={tableCellStyle}>{index + 1}</td>
                    <td style={tableCellStyle}>{item.material?.name || "-"}</td>
                    <td style={rightAlignedCell}>
                      {item.amount?.toLocaleString("id-ID") || "0"}
                    </td>
                    <td style={tableCellStyle}>
                      {item.material_uom?.uom_actual?.name || "-"}
                    </td>
                    <td style={rightAlignedCell}>
                      {formatCurrency(item.price)}
                    </td>
                    <td style={rightAlignedCell}>
                      {formatCurrency(item.amount * item.price)}
                    </td>
                  </tr>
                )
              )}
            </tbody>
            <tfoot>
              <tr style={{ backgroundColor: "#f9f9f9" }}>
                <td
                  colSpan={5}
                  style={{
                    ...tableCellStyle,
                    textAlign: "right",
                    fontWeight: "bold",
                  }}
                >
                  Total Harga:
                </td>
                <td style={{ ...rightAlignedCell, fontWeight: "bold" }}>
                  {formatCurrency(materialTotal)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      {/* Services Table */}
      {hasServices && (
        <div style={{ marginBottom: "30px", pageBreakInside: "avoid" }}>
          <h2 style={{ fontSize: "18pt", marginBottom: "15px" }}>Layanan</h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={tableHeaderStyle}>
                <th style={tableCellStyle}>No</th>
                <th style={tableCellStyle}>Layanan</th>
                <th style={rightAlignedCell}>Jumlah</th>
                <th style={rightAlignedCell}>Harga Per Layanan</th>
                <th style={rightAlignedCell}>Total</th>
              </tr>
            </thead>
            <tbody>
              {poData.purchase_order_services.map(
                (item: any, index: number) => (
                  <tr key={`service-${index}`}>
                    <td style={tableCellStyle}>{index + 1}</td>
                    <td style={tableCellStyle}>{item.service?.name || "-"}</td>
                    <td style={rightAlignedCell}>
                      {item.amount?.toLocaleString("id-ID") || "1"}
                    </td>
                    <td style={rightAlignedCell}>
                      {formatCurrency(item.price)}
                    </td>
                    <td style={rightAlignedCell}>
                      {formatCurrency(item.price * (item.amount || 1))}
                    </td>
                  </tr>
                )
              )}
            </tbody>
            <tfoot>
              <tr style={{ backgroundColor: "#f9f9f9" }}>
                <td
                  colSpan={4}
                  style={{
                    ...tableCellStyle,
                    textAlign: "right",
                    fontWeight: "bold",
                  }}
                >
                  Total Harga:
                </td>
                <td style={{ ...rightAlignedCell, fontWeight: "bold" }}>
                  {formatCurrency(serviceTotal)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      {/* Grand Total */}
      <div style={{ marginBottom: "30px", textAlign: "right" }}>
        <div style={{ display: "inline-block", textAlign: "left" }}>
          <div style={{ fontSize: "10pt" }}>
            Total Material: {formatCurrency(materialTotal)}
          </div>
          <div style={{ fontSize: "10pt" }}>
            Total Layanan: {formatCurrency(serviceTotal)}
          </div>
          <div
            style={{ fontSize: "12pt", fontWeight: "bold", marginTop: "5px" }}
          >
            Grand Total: {formatCurrency(grandTotal)}
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      {poData.term_of_condition && (
        <div style={{ marginBottom: "30px", pageBreakInside: "avoid" }}>
          <h2 style={{ fontSize: "18pt", marginBottom: "15px" }}>
            Terms and Conditions
          </h2>
          <div
            dangerouslySetInnerHTML={{ __html: poData.term_of_condition }}
            style={{ lineHeight: "1.6", fontSize: "12pt" }}
          />
        </div>
      )}

      {/* Footer Signatures */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "50px",
          paddingTop: "20px",
          pageBreakInside: "avoid",
        }}
      >
        <div style={{ textAlign: "center", width: "45%" }}>
          <div style={{ marginBottom: "60px" }}>
            <strong>Requested By:</strong>
          </div>
          <div style={{ borderTop: "1px solid #333", paddingTop: "5px" }}>
            {poData.requested_by?.name || "-"}
          </div>
          <div style={{ fontSize: "10pt", marginTop: "5px" }}>
            {formatDate(poData.CreatedAt)}
          </div>
        </div>

        <div style={{ textAlign: "center", width: "45%" }}>
          <div style={{ marginBottom: "60px" }}>
            <strong>Approved By:</strong>
          </div>
          <div style={{ borderTop: "1px solid #333", paddingTop: "5px" }}>
            {poData.approved_by?.name || "-"}
          </div>
          <div style={{ fontSize: "10pt", marginTop: "5px" }}>
            {formatDate(poData.approved_date)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseRequestTemplate;
