// Core dashboard types
export type DashboardMetric = {
  id: string;
  title: string;
  value: string | number;
  change: number;
  changeType: "increase" | "decrease" | "neutral";
  icon: string;
  description?: string;
  trend?: number[];
};

export type ChartConfig = {
  [key: string]: {
    label: string;
    color: string;
  };
};

export type TimeSeriesData = {
  date: string;
  [key: string]: string | number;
};

export type FilterOption = {
  label: string;
  value: string;
};

export type DateRange = {
  from: Date;
  to: Date;
};

// Table types
export type SortConfig = {
  key: string;
  direction: "asc" | "desc";
};

export type FilterConfig = {
  [key: string]: string | string[] | number | boolean;
};

export type PaginationConfig = {
  page: number;
  pageSize: number;
  total: number;
};

// Theme types
export type Theme = "light" | "dark" | "system";

// Animation types
export type AnimationConfig = {
  duration: number;
  delay?: number;
  ease?: string;
};

// Component props types
export type BaseComponentProps = {
  className?: string;
  children?: React.ReactNode;
};

export type LoadingState = {
  isLoading: boolean;
  error?: string | null;
};

// Chart data types
export type ChartDataPoint = {
  [key: string]: string | number;
};

export type ChartProps = {
  data: ChartDataPoint[];
  config?: ChartConfig;
  height?: number;
  className?: string;
  loading?: boolean;
};

// Dashboard layout types
export type LayoutConfig = {
  sidebar: {
    collapsed: boolean;
    width: number;
  };
  header: {
    height: number;
  };
  content: {
    padding: number;
  };
};

// Navigation types
export type NavItem = {
  id: string;
  label: string;
  href: string;
  icon?: string;
  badge?: string | number;
  children?: NavItem[];
};

// Export/Import types
export type ExportConfig = {
  format: "pdf" | "csv" | "xlsx" | "png";
  filename?: string;
  includeCharts?: boolean;
  dateRange?: DateRange;
};

// Real-time update types
export type RealtimeConfig = {
  enabled: boolean;
  interval: number;
  endpoint?: string;
};

// Notification types
export type Notification = {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
};

// User preferences types
export type UserPreferences = {
  theme: Theme;
  language: string;
  timezone: string;
  dateFormat: string;
  currency: string;
  notifications: {
    email: boolean;
    push: boolean;
    inApp: boolean;
  };
  dashboard: {
    defaultDateRange: string;
    autoRefresh: boolean;
    refreshInterval: number;
  };
};
