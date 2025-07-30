"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { env } from "@/env";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html>
      <body className="bg-background text-foreground font-sans">
        <div className="min-h-screen flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md text-center space-y-6"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex justify-center"
            >
              <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                <AlertTriangle className="w-10 h-10 text-red-600 dark:text-red-400" />
              </div>
            </motion.div>

            {/* Error Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-3"
            >
              <h1 className="text-3xl font-bold">Critical Error</h1>
              <h2 className="text-xl text-gray-600 dark:text-gray-400">
                Application Unavailable
              </h2>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm mx-auto"
            >
              We're experiencing technical difficulties. Our team has been notified
              and is working to resolve this issue as quickly as possible.
            </motion.p>

            {/* Error Details (Development only) */}
            {env.NODE_ENV === "development" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-left max-w-sm mx-auto"
              >
                <p className="text-xs font-mono text-gray-600 dark:text-gray-400 break-all">
                  {error.message}
                </p>
                {error.digest && (
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                    Error ID:
                    {" "}
                    {error.digest}
                  </p>
                )}
              </motion.div>
            )}

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 pt-6 max-w-sm mx-auto"
            >
              <button
                onClick={reset}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
              <Link
                href="/"
                className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" />
                Go Home
              </Link>
            </motion.div>

            {/* Brand Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="pt-8"
            >
              <div className="flex items-center justify-center space-x-2 text-gray-500 dark:text-gray-400">
                <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-600 text-white font-bold text-xs">
                  AD
                </div>
                <span className="text-sm font-medium">ADmyBRAND Insights</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </body>
    </html>
  );
}
