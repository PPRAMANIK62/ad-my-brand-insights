"use client";

import { motion } from "framer-motion";
import { AlertCircle, ArrowLeft, Home, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { env } from "@/env";

export default function Error({
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
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-border/50 shadow-lg">
          <CardContent className="p-8 text-center space-y-6">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex justify-center"
            >
              <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-destructive" />
              </div>
            </motion.div>

            {/* Error Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              <h1 className="text-2xl font-bold text-foreground">Something went wrong!</h1>
              <h2 className="text-lg font-semibold text-muted-foreground">Unexpected Error</h2>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground text-sm leading-relaxed"
            >
              We encountered an unexpected error while processing your request.
              Please try refreshing the page or contact support if the problem persists.
            </motion.p>

            {/* Error Details (Development only) */}
            {env.NODE_ENV === "development" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="p-3 bg-muted rounded-lg text-left"
              >
                <p className="text-xs font-mono text-muted-foreground break-all">
                  {error.message}
                </p>
                {error.digest && (
                  <p className="text-xs text-muted-foreground mt-1">
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
              className="flex flex-col sm:flex-row gap-3 pt-4"
            >
              <Button onClick={reset} className="flex-1">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link href="/">
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Link>
              </Button>
            </motion.div>

            {/* Additional Actions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="pt-4 border-t border-border/50"
            >
              <p className="text-xs text-muted-foreground mb-3">
                Need help? Try these options:
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.history.back()}
                  className="text-xs flex-1"
                >
                  <ArrowLeft className="w-3 h-3 mr-1" />
                  Go Back
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.location.reload()}
                  className="text-xs flex-1"
                >
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Reload Page
                </Button>
              </div>
            </motion.div>
          </CardContent>
        </Card>

        {/* Brand Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center mt-6"
        >
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground font-bold text-xs">
              AD
            </div>
            <span className="text-sm font-medium">ADmyBRAND Insights</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
