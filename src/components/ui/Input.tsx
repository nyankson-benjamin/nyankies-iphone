import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn'; // utility for merging classnames

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'filled';
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    label, 
    error, 
    helperText,
    variant = 'default',
    containerClassName,
    ...props 
  }, ref) => {
    const baseInputStyles = `
      w-full
      px-4 
      py-2 
      rounded-lg 
      border 
      transition-colors
      duration-200
      focus:outline-none 
      focus:ring-2 
      focus:ring-primary-500
      disabled:bg-gray-100
      disabled:cursor-not-allowed
    `;

    const variants = {
      default: `
        bg-white 
        border-gray-300 
        focus:border-primary-500
      `,
      filled: `
        bg-gray-100 
        border-transparent 
        hover:bg-gray-200 
        focus:bg-white
      `
    };

    const inputStyles = cn(
      baseInputStyles,
      variants[variant],
      error && 'border-red-500 focus:ring-red-500',
      className
    );

    return (
      <div className={cn('space-y-1', containerClassName)}>
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={inputStyles}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input'; 