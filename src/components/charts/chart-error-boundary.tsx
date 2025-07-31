"use client";

import React from "react";

type ChartErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
};

type ChartErrorBoundaryProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  chartName?: string;
};

export class ChartErrorBoundary extends React.Component<
  ChartErrorBoundaryProps,
  ChartErrorBoundaryState
> {
  constructor(props: ChartErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ChartErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`Chart Error in ${this.props.chartName || "Unknown Chart"}:`, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex items-center justify-center h-[300px] bg-muted/50 rounded-lg border-2 border-dashed border-muted-foreground/25">
            <div className="text-center space-y-2">
              <div className="text-destructive font-medium">
                Error loading chart:
                {" "}
                {this.props.chartName || "Chart"}
              </div>
              <div className="text-sm text-muted-foreground">
                {this.state.error?.message || "Unknown error occurred"}
              </div>
              <button
                onClick={() => this.setState({ hasError: false, error: undefined })}
                className="text-sm text-primary hover:underline"
              >
                Try again
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
