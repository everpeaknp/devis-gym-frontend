"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: string | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: error.stack || null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("[ErrorBoundary] React error caught:", {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
    });

    // Log to window for debugging
    if (typeof window !== "undefined") {
      (window as any).__lastReactError = {
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
      };
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <div className="max-w-2xl w-full bg-background-elevated p-8 rounded-lg">
            <h1 className="text-2xl font-bold text-accent mb-4">
              Something went wrong
            </h1>
            <p className="text-muted mb-4">
              The page encountered an error. Please refresh to continue.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-accent text-black font-bold uppercase rounded hover:bg-accent-bright transition-colors"
            >
              Refresh Page
            </button>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mt-6">
                <summary className="cursor-pointer text-sm text-muted hover:text-white">
                  Error Details
                </summary>
                <pre className="mt-2 p-4 bg-black rounded text-xs text-red-400 overflow-auto max-h-96">
                  {this.state.error.message}
                  {"\n\n"}
                  {this.state.errorInfo}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
