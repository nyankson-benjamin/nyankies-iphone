import { SelectHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'filled';
  containerClassName?: string;
  options: Array<{ value: string | number; label: string }>;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    className, 
    label, 
    error, 
    helperText,
    variant = 'default',
    containerClassName,
    options,
    ...props 
  }, ref) => {
    const baseSelectStyles = `
      w-full
      p-3 
      rounded-lg 
      border 
      transition-colors
      duration-200
      focus:outline-none 
      focus:ring-2 
      focus:ring-primary
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

    const selectStyles = cn(
      baseSelectStyles,
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
        <select
          ref={ref}
          className={selectStyles}
          {...props}
        >
            <option value="" disabled>{label}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
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

Select.displayName = 'Select';