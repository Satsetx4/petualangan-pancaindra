import React from 'react';
import { motion } from 'framer-motion';

interface LivingCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

export const LivingCard: React.FC<LivingCardProps> = ({
  children,
  className = '',
  onClick,
  interactive = false,
}) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={interactive ? { y: -3, scale: 1.01 } : undefined}
      whileTap={interactive ? { scale: 0.98 } : undefined}
      className={`bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800/80 rounded-3xl p-4 md:p-6 shadow-sm ${
        interactive ? 'cursor-pointer transition-shadow hover:shadow-md' : ''
      } ${className}`}
    >
      {children}
    </motion.div>
  );
};
