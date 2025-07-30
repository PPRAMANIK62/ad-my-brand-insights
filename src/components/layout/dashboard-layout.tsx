"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { Header } from "./header";
import { Sidebar, SidebarOverlay } from "./sidebar";

type DashboardLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

export function DashboardLayout({ children, className }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false); // For mobile only
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // For desktop sidebar collapse
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleSidebarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  if (!mounted) {
    return (
      <div className="flex h-screen bg-background">
        <div className="flex-1 flex flex-col">
          <div className="h-16 border-b bg-card" />
          <div className="flex-1 p-6">
            <div className="space-y-6">
              <div className="h-8 bg-muted animate-pulse rounded" />
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
                ))}
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="h-80 bg-muted animate-pulse rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={handleSidebarToggle}
        collapsed={sidebarCollapsed}
        onCollapse={handleSidebarCollapse}
      />

      {/* Mobile overlay */}
      <SidebarOverlay isOpen={sidebarOpen} onClose={handleSidebarClose} />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 md:ml-0">
        {/* Header */}
        <Header
          onMenuClick={handleSidebarToggle}
          sidebarCollapsed={sidebarCollapsed}
        />

        {/* Main content area */}
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className={cn(
            "flex-1 overflow-auto p-6 space-y-6",
            className,
          )}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}

// Container component for dashboard content
export function DashboardContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-7xl space-y-6", className)}>
      {children}
    </div>
  );
}

// Grid layouts for dashboard content
export function DashboardGrid({
  children,
  className,
  cols = 4,
}: {
  children: React.ReactNode;
  className?: string;
  cols?: number;
}) {
  const gridCols = {
    1: "grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={cn(
      "grid gap-4",
      gridCols[cols as keyof typeof gridCols] || gridCols[4],
      className,
    )}
    >
      {children}
    </div>
  );
}

// Section component for organizing dashboard content
export function DashboardSection({
  title,
  description,
  children,
  className,
  actions,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("space-y-4", className)}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {actions && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            {actions}
          </motion.div>
        )}
      </div>
      {children}
    </motion.section>
  );
}

// Loading state for dashboard
export function DashboardLoading() {
  return (
    <DashboardLayout>
      <DashboardContainer>
        {/* Header skeleton */}
        <div className="space-y-2">
          <div className="h-8 w-48 bg-muted animate-pulse rounded" />
          <div className="h-4 w-96 bg-muted animate-pulse rounded" />
        </div>

        {/* Metrics cards skeleton */}
        <DashboardGrid>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
          ))}
        </DashboardGrid>

        {/* Charts skeleton */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="h-80 bg-muted animate-pulse rounded-lg" />
          <div className="h-80 bg-muted animate-pulse rounded-lg" />
        </div>

        {/* Table skeleton */}
        <div className="space-y-4">
          <div className="h-6 w-32 bg-muted animate-pulse rounded" />
          <div className="h-64 bg-muted animate-pulse rounded-lg" />
        </div>
      </DashboardContainer>
    </DashboardLayout>
  );
}

// Error state for dashboard
export function DashboardError({
  error,
  retry,
}: {
  error: string;
  retry?: () => void;
}) {
  return (
    <DashboardLayout>
      <DashboardContainer>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4"
        >
          <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <span className="text-2xl">⚠️</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Something went wrong</h3>
            <p className="text-muted-foreground max-w-md">{error}</p>
          </div>
          {retry && (
            <button
              onClick={retry}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Try again
            </button>
          )}
        </motion.div>
      </DashboardContainer>
    </DashboardLayout>
  );
}
