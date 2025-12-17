import React from 'react';
import '../../styles/components/button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  icon?: React.ReactNode;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  icon,
  loading = false,
  disabled,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`btn btn-${variant} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? '⏳' : icon}
      {children}
    </button>
  );
};