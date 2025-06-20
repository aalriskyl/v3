import React, { useEffect, useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import axiosInstance from "../../../../../../../service/axiosInstance";
import Kober from "/media/logos/kober.png";

interface DataType {
  approved_by: any;
  customer: {
    id: string;
    name: string;
    is_company?: {
      id: string;
      name: string;
    };
  };
  id: string;
  no_sales_order: string;
  purchase_order: {
    id: {
      id: "9fde4110-7ade-4d38-a141-c59a08781bda";
      no_purchase_order: "PO-1";
    };
    no_purchase_order: "PO-1";
  } | null;
  requested_by: {
    id: string;
    name: string;
  };
  status: string;
  type: string;
}

type MaterialType = {
  amount: number;
  id: string;
  material: {
    id: string;
    name: string;
  };
  material_uom: {
    id: string;
    uom_actual: {
      id: string;
      name: string;
    };
  };
  price: number;
};

interface MaterialItem {
  material: { name: string };
  amount: number;
  material_uom: { uom_actual: { name: string } };
  price: number;
}

interface SalesOrderPDFProps {
  id: string;
}

const SalesOrderDetailPDF = ({ id }: SalesOrderPDFProps) => {
  const [data, setData] = useState<DataType | null>(null);
  const [materialData, setMaterialData] = useState<MaterialType[]>([]);

  const getMaterial = async () => {
    try {
      const response = await axiosInstance.get(
        `/sales/submission/sales-order/sales-order-material/sales-order/${id}`
      );
      console.log({ materialpdf: response });
      // setMaterial(response.data.data.sales_order_materials);
      setMaterialData(response.data.data.sales_order_materials);
      return response.data.data.sales_order_materials;
    } catch (error) {}
  };

  const getData = async () => {
    try {
      const responseData = await axiosInstance.get(
        `/sales/submission/sales-order/${id}`
      );
      console.log({ getDetailSalesOrder: responseData.data.data });

      setData(responseData.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    if (id) {
      getData();
      getMaterial();
    }
  }, [id]);

  const totalAkhir = materialData.reduce((sum, item) => sum + item.price, 0);

  return (
    <Document>
      <Page size={[907, 1058]} style={styles.page}>
        <View style={styles.logoContainer}>
          <Image src={Kober} style={styles.logo} />
        </View>
        <View style={styles.sectionTitle}>
          <Text style={styles.title}>Sales Order</Text>
        </View>
        <View style={styles.headerContainer}>
          {[
            ["Nomor Sales Order", data?.no_sales_order],
            ["Nomor Purchase Order", data?.purchase_order?.no_purchase_order],
            ["Konsumen", data?.customer.name],
            ["Perusahaan", data?.customer.is_company?.name],
            ["Requested By", data?.requested_by?.name],
            ["Approved By", data?.approved_by?.name],
          ].map(([label, value], index) => (
            <View key={index} style={styles.headerRow}>
              <Text style={styles.headerLabel}>{label}</Text>
              <Text style={styles.headerSeparator}>:</Text>
              <Text style={styles.headerValue}>{value || "-"}</Text>
            </View>
          ))}
        </View>
        <View style={styles.section}>
          <View style={styles.table}>
            <View style={styles.tableHeaderRow}>
              <Text style={styles.tableHeaderCell}>Material</Text>
              <Text style={styles.tableHeaderCell}>Jumlah</Text>
              <Text style={styles.tableHeaderCell}>Satuan</Text>
              <Text style={styles.tableHeaderCell}>Harga</Text>
              <Text style={styles.tableHeaderCell}>Total Harga</Text>
            </View>
            {materialData.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>
                  {item.material.name || "-"}
                </Text>
                <Text style={styles.tableCell}>{item.amount || "-"}</Text>
                <Text style={styles.tableCell}>
                  {item.material_uom.uom_actual.name || "-"}
                </Text>
                <Text style={styles.tableCell}>
                  {item.price ? `Rp ${item.price.toLocaleString()}` : "-"}
                </Text>
                <Text style={styles.tableCell}>
                  {item.price * item.amount
                    ? `Rp ${(item.price * item.amount).toLocaleString()}`
                    : "-"}
                </Text>
              </View>
            ))}
            <View style={styles.line} />
            <View style={styles.tableRow}>
              <Text style={styles.tableCellEmpty}></Text>
              <Text style={styles.tableCellEmpty}></Text>
              <Text style={styles.tableCellEmpty}></Text>
              <Text style={[styles.tableCell, styles.totalLabel]}>
                Total Akhir:
              </Text>
              <Text
                style={[styles.tableCell, styles.totalValue]}
              >{`Rp ${totalAkhir.toLocaleString()}`}</Text>
            </View>
          </View>
        </View>
        {/* Term of Condition below the table */}
        {/* <View style={styles.section}>
          <Text style={styles.termOfCondition}>
            {data?.term_of_condition
              ? parseTermOfCondition(data.term_of_condition)
              : "No term of condition provided"}
          </Text>
        </View> */}
        {/* Requested By and Approved By with flex justify-between */}
        <View style={styles.signatureContainer}>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureValue}>
              {data?.requested_by?.name || "-"}
            </Text>
          </View>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureValue}>
              {data?.approved_by?.name || "-"}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: { padding: 40 },
  sectionTitle: { marginBottom: 10, marginTop: 100, alignItems: "center" },
  headerContainer: { flexDirection: "column", marginBottom: 10 },
  headerRow: { flexDirection: "row", marginBottom: 4 },
  headerLabel: { width: 150, fontSize: 12, fontWeight: "bold" },
  headerSeparator: { width: 10, textAlign: "center", fontSize: 12 },
  headerValue: { fontSize: 12, flex: 1 },
  section: { marginBottom: 10 },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
  },
  termOfCondition: { marginTop: 10, fontSize: 12, textAlign: "left" },
  table: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    fontSize: 12,
  },
  tableHeaderRow: { flexDirection: "row", backgroundColor: "#f0f0f0" },
  tableHeaderCell: {
    flex: 1,
    padding: 5,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableRow: { flexDirection: "row" },
  tableCell: { flex: 1, padding: 5, textAlign: "center" },
  tableCellEmpty: { flex: 1, padding: 5, backgroundColor: "transparent" },
  totalLabel: { fontWeight: "bold", textAlign: "right" },
  totalValue: { fontWeight: "bold" },
  logoContainer: { position: "absolute", top: 20, left: 20 },
  logo: { width: 100, height: "auto" },
  line: {
    height: 0.5,
    backgroundColor: "#393939",
    marginVertical: 5,
    width: "100%",
  },
  signatureContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  signatureBox: { width: "45%", textAlign: "center" },
  signatureLabel: { fontSize: 12, fontWeight: "bold", marginBottom: 5 },
  signatureValue: { fontSize: 12, paddingBottom: 10, marginTop: 10 },
});

export default SalesOrderDetailPDF;
