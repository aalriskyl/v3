export const formatDateToMonthYear = (isoDate?: string | null): string => {
  if (!isoDate) return "-";
  const date = new Date(isoDate);

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};
