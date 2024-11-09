import { TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'filled';
  containerClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    className, 
    label, 
    error, 
    helperText,
    variant = 'default',
    containerClassName,
    ...props 
  }, ref) => {
    const baseTextareaStyles = `
      w-full
      px-4 
      py-2 
      rounded-lg 
      border 
      transition-colors
      duration-200
      focus:outline-none 
      focus:ring-2 
      focus:ring-primary
      disabled:bg-gray-100
      disabled:cursor-not-allowed
      min-h-[100px]
      resize-y
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

    const textareaStyles = cn(
      baseTextareaStyles,
      variants[variant],
      error && 'border-red-500 focus:ring-red-500',
      className
    );

    return (
      <div className={cn('space-y-1', containerClassName)}>
        {(
          <label className="block text-sm font-medium text-gray-700">
            {label ?? props.placeholder}
          </label>
        )}
        <textarea
          ref={ref}
          className={textareaStyles}
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

Textarea.displayName = 'Textarea'; 