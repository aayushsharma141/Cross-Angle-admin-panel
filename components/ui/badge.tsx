import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'default';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variants = {
    success: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400",
    warning: "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400",
    danger: "bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-400",
    info: "bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-400",
    default: "bg-gray-100 text-gray-800 dark:bg-gray-500/20 dark:text-gray-400",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
