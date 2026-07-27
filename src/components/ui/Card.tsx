import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'bordered';
  hover?: boolean;
  children: React.ReactNode;
}

export default function Card({
  variant = 'default',
  hover = true,
  className = '',
  children,
  ...props
}: CardProps) {
  const base = 'rounded-2xl p-6';

  const variants = {
    default: 'bg-[#141312] shadow-lg shadow-slate-200/50',
    glass: 'glass',
    bordered: 'bg-[#141312] border border-[#282624]',
  };

  return (
    <div
      className={`${base} ${variants[variant]} ${hover ? 'card-hover' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
