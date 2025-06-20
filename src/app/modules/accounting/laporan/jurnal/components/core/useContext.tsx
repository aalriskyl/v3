// contexts/JournalContext.tsx
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import axiosInstance from "../../../../../../../service/axiosInstance";

interface JournalEntry {
  tanggal: string;
  total_debit: number;
  total_credit: number;
  sales_invoice_id: string | null;
  no_sales_invoice: string | null;
  purchase_invoice_id: string | null;
  no_purchase_invoice: string | null;
  payment_sales_invoice_id: string | null;
  no_payment_sales_invoice: string | null;
  payment_purchase_invoice_id: string | null;
  no_payment_purchase_invoice: string | null;
}

interface SubRowData {
  id?: string; // Present in detailed response
  coa_id?: string; // Present in simplified response
  amount?: number; // Present in detailed response
  type?: string; // Present in detailed response
  total_debit?: number; // Present in simplified response
  total_credit?: number; // Present in simplified response
  saldo_awal?: number; // From detailed response
  saldo_akhir?: number; // From detailed response
  company_id?: string; // From both responses
  no_account?: string; // Present in simplified response
  coa_name?: string; // Present in simplified response
  coa?: {
    // Present in detailed response
    id: string;
    name: string;
    no_account?: string;
    type?: string;
  };
  sales_invoice_id?: string | null;
  purchase_invoice_id?: string | null;
  payment_sales_invoice_id?: string | null;
  payment_purchase_invoice_id?: string | null;
  sales_invoice?: any | null;
  purchase_invoice?: {
    id: string;
    no_purchase_invoice?: string;
  } | null;
  payment_purchase_invoice?: any | null;
  payment_sales_invoice?: any | null;
  ID?: number;
  CreatedAt?: string;
  UpdatedAt?: string;
  DeletedAt?: string | null;
}

interface JournalContextType {
  journalEntries: JournalEntry[];
  subRowsData: Record<string, SubRowData[]>;
  isLoading: boolean;
  totalData: number;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  dateFrom: string;
  setDateFrom: (date: string) => void;
  dateTo: string;
  setDateTo: (date: string) => void;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  setPagination: (pagination: { pageIndex: number; pageSize: number }) => void;
  fetchJournalEntries: () => Promise<void>;
  fetchSubRows: (entry: JournalEntry) => Promise<void>;
  resetFilters: () => void;
  isSimplified: boolean; // Add this
  toggleSimplified: () => void; // Add this
}

const JournalContext = createContext<JournalContextType>({
  journalEntries: [],
  subRowsData: {},
  isLoading: false,
  totalData: 0,
  searchTerm: "",
  setSearchTerm: () => {},
  dateFrom: "",
  setDateFrom: () => {},
  dateTo: "",
  setDateTo: () => {},
  pagination: {
    pageIndex: 0,
    pageSize: 10,
  },
  setPagination: () => {},
  fetchJournalEntries: async () => {},
  fetchSubRows: async () => {},
  resetFilters: () => {},
  isSimplified: false, // Add default
  toggleSimplified: () => {}, // Add default
});

export const useJournal = () => useContext(JournalContext);

export const JournalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [subRowsData, setSubRowsData] = useState<Record<string, SubRowData[]>>(
    {}
  );
  const [isSimplified, setIsSimplified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [totalData, setTotalData] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const fetchJournalEntries = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        "/accounting/master-data/coa-transaction/journal",
        {
          params: {
            page: pagination.pageIndex + 1,
            pageSize: pagination.pageSize,
            search: searchTerm,
            created_from: dateFrom,
            created_to: dateTo,
            // simplified: isSimplified
          },
        }
      );

      const responseData = response.data.data;
      const entries = responseData.journal_entries || [];

      setJournalEntries(entries);

      if (responseData.total_page !== undefined) {
        const isLastPage = pagination.pageIndex + 1 >= responseData.total_page;
        const totalItems = isLastPage
          ? (responseData.total_page - 1) * pagination.pageSize + entries.length
          : responseData.total_page * pagination.pageSize;

        setTotalData(totalItems);
      } else {
        setTotalData(entries.length);
      }
    } catch (error) {
      console.error("Failed to fetch journal entries:", error);
    } finally {
      setIsLoading(false);
    }
  }, [pagination.pageIndex, pagination.pageSize, searchTerm, dateFrom, dateTo]);

  const fetchSubRows = useCallback(
    async (entry: JournalEntry) => {
      setIsLoading(true);
      const idToFetch =
        entry.sales_invoice_id ||
        entry.purchase_invoice_id ||
        entry.payment_sales_invoice_id ||
        entry.payment_purchase_invoice_id;

      if (!idToFetch) return;

      try {
        const response = await axiosInstance.get(
          "/accounting/master-data/coa-transaction/journal/detail",
          {
            params: {
              sales_invoice_id: entry.sales_invoice_id,
              purchase_invoice_id: entry.purchase_invoice_id,
              payment_sales_invoice_id: entry.payment_sales_invoice_id,
              payment_purchase_invoice_id: entry.payment_purchase_invoice_id,
              simplified: isSimplified,
            },
          }
        );

        // Clear previous data before setting new data
        setSubRowsData((prev) => {
          const newData = { ...prev };
          delete newData[idToFetch]; // Clear old data first
          return newData;
        });

        // Then set the new data
        setSubRowsData((prev) => ({
          ...prev,
          [idToFetch]: response.data.data || [], // Ensure we always have an array
        }));
      } catch (error) {
        console.error("Failed to fetch sub-rows:", error);
        // Set empty array on error
        setSubRowsData((prev) => ({
          ...prev,
          [idToFetch]: [],
        }));
      } finally {
        setIsLoading(false);
      }
    },
    [isSimplified]
  );
  const toggleSimplified = useCallback(() => {
    setIsSimplified((prev) => {
      const newValue = !prev;
      fetchJournalEntries(); // Refresh main entries
      return newValue;
    });
  }, [fetchJournalEntries]);

  const resetFilters = useCallback(() => {
    setSearchTerm("");
    setDateFrom("");
    setDateTo("");
    setPagination({
      pageIndex: 0,
      pageSize: 10,
    });
  }, []);

  // Auto-fetch when filters or pagination change
  useEffect(() => {
    fetchJournalEntries();
  }, [fetchJournalEntries]);

  return (
    <JournalContext.Provider
      value={{
        journalEntries,
        subRowsData,
        isLoading,
        totalData,
        searchTerm,
        setSearchTerm,
        dateFrom,
        setDateFrom,
        dateTo,
        setDateTo,
        pagination,
        setPagination,
        fetchJournalEntries,
        fetchSubRows,
        resetFilters,
        isSimplified,
        toggleSimplified,
      }}
    >
      {children}
    </JournalContext.Provider>
  );
};
