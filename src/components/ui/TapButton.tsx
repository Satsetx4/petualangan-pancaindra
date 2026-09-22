import React from 'react';
import { motion } from 'framer-motion';
import { sound } from '../../lib/sound';

interface TapButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost' | 'amber';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export const TapButton: React.FC<TapButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  disabled = false,
  onClick,
  className = '',
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    sound.playPop();
    if (onClick) onClick(e);
  };

  const variantStyles = {
    primary:
      'bg-sky-500 hover:bg-sky-600 text-white font-bold border-b-4 border-sky-700 active:border-b-0 active:translate-y-1',
    secondary:
      'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 font-bold border-b-4 border-slate-300 dark:border-slate-900 active:border-b-0 active:translate-y-1',
    success:
      'bg-emerald-500 hover:bg-emerald-600 text-white font-bold border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1',
    amber:
      'bg-amber-500 hover:bg-amber-600 text-white font-bold border-b-4 border-amber-700 active:border-b-0 active:translate-y-1',
    danger:
      'bg-rose-500 hover:bg-rose-600 text-white font-bold border-b-4 border-rose-700 active:border-b-0 active:translate-y-1',
    ghost:
      'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs min-h-[36px] rounded-xl gap-1.5',
    md: 'px-4 py-2.5 text-sm min-h-[44px] rounded-2xl gap-2',
    lg: 'px-6 py-3.5 text-base min-h-[52px] rounded-2xl gap-2.5',
  };

  return (
    <motion.button
      whileTap={disabled ? undefined : { scale: 0.96 }}
      onClick={handleClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center cursor-pointer select-none transition-colors duration-100 ${
        variantStyles[variant]
      } ${sizeStyles[size]} ${disabled ? 'opacity-50 cursor-not-allowed border-b-0' : ''} ${className}`}
      {...(props as object)}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
};
