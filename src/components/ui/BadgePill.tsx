import React from 'react';

interface BadgePillProps {
  children: React.ReactNode;
  colorClass?: string;
  icon?: React.ReactNode;
  size?: 'sm' | 'md';
}

export const BadgePill: React.FC<BadgePillProps> = ({
  children,
  colorClass = 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border-amber-200 dark:border-amber-800',
  icon,
  size = 'md',
}) => {
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs font-semibold rounded-lg gap-1',
    md: 'px-3 py-1 text-xs font-bold rounded-xl gap-1.5',
  };

  return (
    <span
      className={`inline-flex items-center border ${colorClass} ${sizeStyles[size]} shrink-0`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
