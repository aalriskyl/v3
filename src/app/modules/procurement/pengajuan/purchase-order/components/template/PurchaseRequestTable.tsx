// PurchaseRequestListTemplate.tsx
import React from "react";

interface PurchaseRequest {
  id: string;
  no_purchase_order: string;
  supplier: {
    name: string;
  };
  status_delivery: string;
  status_payment: string;
  status: string;
  type: string;
  submitted_date?: string;
  approved_date?: string;
}

const PurchaseRequestListTemplate: React.FC<{
  exportData: PurchaseRequest[];
}> = ({ exportData }) => {
  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      style={{
        fontFamily: "Arial",
        padding: "20px",
        width: "100%",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Daftar Purchase Order
      </h1>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "12px",
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "#f8f9fa",
              borderBottom: "2px solid #dee2e6",
            }}
          >
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                fontWeight: "bold",
              }}
            >
              No
            </th>
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                fontWeight: "bold",
              }}
            >
              Nomor PO
            </th>
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                fontWeight: "bold",
              }}
            >
              Pemasok
            </th>
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                fontWeight: "bold",
              }}
            >
              Tipe
            </th>
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                fontWeight: "bold",
              }}
            >
              Status Pengiriman
            </th>
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                fontWeight: "bold",
              }}
            >
              Status Pembayaran
            </th>
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                fontWeight: "bold",
              }}
            >
              Status Dokumen
            </th>
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                fontWeight: "bold",
              }}
            >
              Tanggal Submit
            </th>
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                fontWeight: "bold",
              }}
            >
              Tanggal Approve
            </th>
          </tr>
        </thead>
        <tbody>
          {exportData.map((item, index) => (
            <tr
              key={item.id}
              style={{
                borderBottom: "1px solid #dee2e6",
              }}
            >
              <td
                style={{
                  padding: "12px",
                  textAlign: "left",
                }}
              >
                {index + 1}
              </td>
              <td
                style={{
                  padding: "12px",
                  textAlign: "left",
                }}
              >
                {item.no_purchase_order}
              </td>
              <td
                style={{
                  padding: "12px",
                  textAlign: "left",
                }}
              >
                {item.supplier?.name || "-"}
              </td>
              <td
                style={{
                  padding: "12px",
                  textAlign: "left",
                }}
              >
                {item.type}
              </td>
              <td
                style={{
                  padding: "12px",
                  textAlign: "left",
                  color:
                    item.status_delivery === "Undelivered"
                      ? "#dc3545"
                      : item.status_delivery === "PartiallyDelivered"
                      ? "#ffc107"
                      : "#28a745",
                }}
              >
                {item.status_delivery}
              </td>
              <td
                style={{
                  padding: "12px",
                  textAlign: "left",
                  color:
                    item.status_payment === "Unpaid" ? "#dc3545" : "#28a745",
                }}
              >
                {item.status_payment}
              </td>
              <td
                style={{
                  padding: "12px",
                  textAlign: "left",
                  color:
                    item.status === "Submitted"
                      ? "#17a2b8"
                      : item.status === "Approved"
                      ? "#28a745"
                      : item.status === "Rejected"
                      ? "#dc3545"
                      : "#6c757d",
                }}
              >
                {item.status}
              </td>
              <td
                style={{
                  padding: "12px",
                  textAlign: "left",
                }}
              >
                {formatDate(item.submitted_date)}
              </td>
              <td
                style={{
                  padding: "12px",
                  textAlign: "left",
                }}
              >
                {formatDate(item.approved_date)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        style={{
          marginTop: "30px",
          fontSize: "10px",
          color: "#6c757d",
          textAlign: "right",
        }}
      >
        Dicetak pada:{" "}
        {new Date().toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </div>
  );
};

export default PurchaseRequestListTemplate;
