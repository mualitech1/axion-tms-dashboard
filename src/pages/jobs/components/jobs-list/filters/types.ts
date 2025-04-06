
export interface FilterOptions {
  status: string | null;
  priority: string | null;
  startDate: Date | null;
  endDate: Date | null;
  sortBy: string;
  sortDirection: "asc" | "desc";
}
