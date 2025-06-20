import React, { useState, useEffect } from "react";
import { KTCardBody } from "@metronic/helpers";
import { ListPagination } from "@metronic/layout/components/form/components/pagination/ListPagination";
import { useJournal } from "../../core/useContext";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";

export default function ExpandableTable() {
  const {
    journalEntries,
    subRowsData,
    isLoading,
    totalData,
    pagination,
    setPagination,
    fetchJournalEntries,
    fetchSubRows,
    isSimplified,
  } = useJournal();

  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [loadingSubRows, setLoadingSubRows] = useState<string | null>(null);

  // Main data fetch effect
  useEffect(() => {
    const fetchData = async () => {
      await fetchJournalEntries();
      // Clean up expanded rows that no longer exist
      setExpandedRows((prev) => {
        const currentIds = journalEntries
          .map(
            (entry) =>
              entry.sales_invoice_id ||
              entry.purchase_invoice_id ||
              entry.payment_sales_invoice_id ||
              entry.payment_purchase_invoice_id
          )
          .filter(Boolean);
        return prev.filter((id) => currentIds.includes(id));
      });
    };
    fetchData();
  }, [pagination.pageIndex, pagination.pageSize, isSimplified]);

  // Refresh expanded rows when simplified mode changes
  useEffect(() => {
    if (expandedRows.length === 0) return;

    const refreshExpandedRows = async () => {
      const validEntries = journalEntries.filter((entry) => {
        const id =
          entry.sales_invoice_id ||
          entry.purchase_invoice_id ||
          entry.payment_sales_invoice_id ||
          entry.payment_purchase_invoice_id;
        return id && expandedRows.includes(id);
      });

      if (validEntries.length > 0) {
        await Promise.all(
          validEntries.map((entry) => {
            const id =
              entry.sales_invoice_id ||
              entry.purchase_invoice_id ||
              entry.payment_sales_invoice_id ||
              entry.payment_purchase_invoice_id;
            setLoadingSubRows(id || null);
            return fetchSubRows(entry).finally(() => setLoadingSubRows(null));
          })
        );
      }
    };

    refreshExpandedRows();
  }, [isSimplified]);

  const formatDate = (date: string) => {
    if (!date || isNaN(new Date(date).getTime())) return "-";
    return new Intl.DateTimeFormat("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  };

  const formatCurrency = (value: number | undefined) => {
    if (value === undefined || isNaN(value)) return "-";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const handlePageChange = (page: number) => {
    setPagination({
      ...pagination,
      pageIndex: page - 1,
    });
  };

  const toggleRow = async (entry: any) => {
    const idToToggle =
      entry.sales_invoice_id ||
      entry.purchase_invoice_id ||
      entry.payment_sales_invoice_id ||
      entry.payment_purchase_invoice_id;

    if (!idToToggle) return;

    setExpandedRows((prev) =>
      prev.includes(idToToggle)
        ? prev.filter((id) => id !== idToToggle)
        : [...prev, idToToggle]
    );

    // Only fetch if expanding and data doesn't exist
    if (!expandedRows.includes(idToToggle) && !subRowsData[idToToggle]) {
      setLoadingSubRows(idToToggle);
      try {
        await fetchSubRows(entry);
      } finally {
        setLoadingSubRows(null);
      }
    }
  };

  const renderDocumentNumber = (row: any) => {
    const number =
      row.no_sales_invoice ||
      row.no_purchase_invoice ||
      row.no_payment_sales_invoice ||
      row.no_payment_purchase_invoice;
    return number || "-";
  };

  // Helper function to extract sortable number from account string
  const getAccountNumber = (accountStr: any) => {
    if (!accountStr) return 0;
    const match = accountStr.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  const startNumber = pagination.pageIndex * pagination.pageSize + 1;

  if (isLoading) {
    return <OverlayLoader />;
  }

  return (
    <KTCardBody>
      <table className="table table-bordered">
        <thead>
          <tr className="align-middle">
            <th style={{ width: "54px" }}>No</th>
            <th className="col-4">Nomor Dokumen</th>
            <th className="col-3">Tanggal</th>
            <th className="col-2">Total Debit</th>
            <th className="col-2">Total Credit</th>
            <th style={{ width: "52px" }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {journalEntries.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center">
                Belum ada data
              </td>
            </tr>
          ) : (
            journalEntries.map((row, index) => {
              const idToUse =
                row.sales_invoice_id ||
                row.purchase_invoice_id ||
                row.payment_sales_invoice_id ||
                row.payment_purchase_invoice_id;
              const subRows = idToUse ? subRowsData[idToUse] || [] : [];

              // Sort subRows by account number
              const sortedSubRows = [...subRows].sort((a, b) => {
                const accountA = isSimplified
                  ? a.no_account
                  : a.coa?.no_account;
                const accountB = isSimplified
                  ? b.no_account
                  : b.coa?.no_account;
                return getAccountNumber(accountA) - getAccountNumber(accountB);
              });

              // Calculate totals based on response format
              const totalDebit = isSimplified
                ? subRows.reduce(
                    (sum, subRow) => sum + (subRow.total_debit || 0),
                    0
                  )
                : subRows.reduce(
                    (sum, subRow) =>
                      sum + (subRow.type === "Debit" ? subRow.amount || 0 : 0),
                    0
                  );

              const totalCredit = isSimplified
                ? subRows.reduce(
                    (sum, subRow) => sum + (subRow.total_credit || 0),
                    0
                  )
                : subRows.reduce(
                    (sum, subRow) =>
                      sum + (subRow.type === "Kredit" ? subRow.amount || 0 : 0),
                    0
                  );

              return (
                <React.Fragment key={idToUse || index}>
                  <tr
                    className={`align-middle ${
                      expandedRows.includes(idToUse || "") ? "table-active" : ""
                    }`}
                  >
                    <td>{startNumber + index}</td>
                    <td>{renderDocumentNumber(row)}</td>
                    <td>{formatDate(row?.tanggal)}</td>
                    <td>{formatCurrency(row.total_debit)}</td>
                    <td>{formatCurrency(row.total_credit)}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-black"
                        onClick={() => toggleRow(row)}
                        disabled={!idToUse}
                      >
                        {expandedRows.includes(idToUse || "") ? "▼" : "▶"}
                      </button>
                    </td>
                  </tr>

                  {expandedRows.includes(idToUse || "") && (
                    <>
                      <tr className="align-middle">
                        <th></th>
                        <th colSpan={2}>Akun</th>
                        <th>Debit</th>
                        <th>Kredit</th>
                        <th></th>
                      </tr>

                      {sortedSubRows.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="text-center">
                            {loadingSubRows === idToUse ? (
                              <span>Loading data...</span>
                            ) : (
                              <span>No detail data available</span>
                            )}
                          </td>
                        </tr>
                      ) : (
                        <>
                          {sortedSubRows.map((subRow, subIndex) => {
                            // Only render if data matches current mode
                            const isValidData = isSimplified
                              ? subRow.total_debit !== undefined ||
                                subRow.total_credit !== undefined
                              : subRow.type !== undefined &&
                                subRow.amount !== undefined;

                            if (!isValidData) return null;

                            const coaName = isSimplified
                              ? `${subRow.no_account || "-"} - ${
                                  subRow.coa_name || "-"
                                }`
                              : `${subRow.coa?.no_account || "-"} - ${
                                  subRow.coa?.name
                                }`;

                            const debitAmount = isSimplified
                              ? subRow.total_debit
                              : subRow.type === "Debit"
                              ? subRow.amount
                              : 0;

                            const creditAmount = isSimplified
                              ? subRow.total_credit
                              : subRow.type === "Kredit"
                              ? subRow.amount
                              : 0;

                            return (
                              <tr
                                key={
                                  isSimplified
                                    ? subRow.coa_id || subIndex
                                    : subRow.id || subIndex
                                }
                                className="align-middle"
                              >
                                <td></td>
                                <td colSpan={2}>{coaName}</td>
                                <td>{formatCurrency(debitAmount)}</td>
                                <td>{formatCurrency(creditAmount)}</td>
                                <td></td>
                              </tr>
                            );
                          })}
                          <tr className="align-middle">
                            <td></td>
                            <td colSpan={2} className="text-end fw-bold">
                              Total
                            </td>
                            <td className="fw-bold">
                              {formatCurrency(totalDebit)}
                            </td>
                            <td className="fw-bold">
                              {formatCurrency(totalCredit)}
                            </td>
                            <td></td>
                          </tr>
                        </>
                      )}
                    </>
                  )}
                </React.Fragment>
              );
            })
          )}
        </tbody>
      </table>
      <ListPagination
        total={totalData}
        currentPage={pagination.pageIndex + 1}
        pageSize={pagination.pageSize}
        onPageChange={handlePageChange}
      />
    </KTCardBody>
  );
}
