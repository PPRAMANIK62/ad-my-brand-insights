"use client";

import { motion } from "framer-motion";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar Skeleton */}
        <div className="hidden md:flex fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-280 bg-card border-r border-border">
          <div className="flex h-full flex-col w-full p-4 space-y-4">
            {/* Navigation Items */}
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center space-x-3"
              >
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-20" />
              </motion.div>
            ))}
            
            <div className="pt-4 border-t border-border">
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (i + 6) * 0.1 }}
                  className="flex items-center space-x-3 mb-4"
                >
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-16" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 md:ml-280">
          <main className="p-6 space-y-6">
            <div className="mx-auto max-w-7xl space-y-6">
              {/* Page Header Skeleton */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-96" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-28" />
                    <Skeleton className="h-8 w-20" />
                  </div>
                </div>
              </motion.div>

              {/* Metrics Cards Skeleton */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
              >
                {Array.from({ length: 4 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                  >
                    <Skeleton className="h-32 w-full rounded-lg" />
                  </motion.div>
                ))}
              </motion.div>

              {/* Charts Skeleton */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="grid gap-6 md:grid-cols-2"
              >
                {Array.from({ length: 2 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 + 0.4 }}
                  >
                    <Skeleton className="h-80 w-full rounded-lg" />
                  </motion.div>
                ))}
              </motion.div>

              {/* Additional Charts Skeleton */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="grid gap-6 md:grid-cols-2"
              >
                {Array.from({ length: 2 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 + 0.6 }}
                  >
                    <Skeleton className="h-80 w-full rounded-lg" />
                  </motion.div>
                ))}
              </motion.div>

              {/* Table Skeleton */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.7 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-4 w-64" />
                </div>
                <Skeleton className="h-96 w-full rounded-lg" />
              </motion.div>
            </div>
          </main>
        </div>
      </div>

      {/* Loading Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 right-6"
      >
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-muted-foreground">Loading dashboard...</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
