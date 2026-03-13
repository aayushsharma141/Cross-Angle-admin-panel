'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0a0c10] p-4">
          <div className="bg-white dark:bg-[#151821] p-8 rounded-2xl shadow-xl max-w-lg w-full border border-red-100 dark:border-red-900/30">
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Something went wrong</h2>
            <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-lg overflow-auto max-h-64 mb-6">
              <p className="text-sm text-red-800 dark:text-red-300 font-mono whitespace-pre-wrap">
                {this.state.error?.message || 'An unexpected error occurred.'}
              </p>
            </div>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors font-medium"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
