import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md',
    isLoading,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props 
  }, ref) => {
    const baseStyles = `
      inline-flex
      items-center
      justify-center
      font-medium
      rounded-lg
      transition-colors
      duration-200
      disabled:opacity-50
      disabled:cursor-not-allowed
    `;

    const variants = {
      primary: `
        bg-[blue]
        text-white
        hover:bg-primary-700
        focus:ring-2
        focus:ring-primary-500
        focus:ring-offset-2
      `,
      secondary: `
        bg-gray-100
        text-gray-900
        hover:bg-gray-200
        focus:ring-2
        focus:ring-gray-500
        focus:ring-offset-2
      `,
      outline: `
        border
        border-gray-300
        bg-transparent
        hover:bg-gray-50
        focus:ring-2
        focus:ring-primary-500
        focus:ring-offset-2
      `,
      ghost: `
        bg-transparent
        hover:bg-gray-100
        focus:ring-2
        focus:ring-gray-500
      `,
      danger: `
        bg-red-600
        text-white
        hover:bg-red-700
        focus:ring-2
        focus:ring-red-500
        focus:ring-offset-2
      `
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
    };

    const buttonStyles = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      className
    );

    return (
      <button
        ref={ref}
        className={buttonStyles}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg 
            className="animate-spin -ml-1 mr-2 h-4 w-4" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {leftIcon && !isLoading && (
          <span className="mr-2">{leftIcon}</span>
        )}
        {children}
        {rightIcon && (
          <span className="ml-2">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button'; 