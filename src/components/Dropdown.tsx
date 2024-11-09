import  { useState, useRef, useEffect } from 'react';
import { cn } from '../utils/cn';

interface DropdownOption {
//   [key: string]: any;
  value: string | number;
  label: string;
}

interface DropdownProps {
  id: string;
  label?: string;
  options: DropdownOption[];
  placeholder?: string;
  value?: DropdownOption | null;
  onChange?: (value: DropdownOption | null) => void;
  disabled?: boolean;
  required?: boolean;
  showSearch?: boolean;
  className?: string;
  error?: string;
  loading?: boolean;
  emptyMessage?: string;
  dataCy?: string;
}

export const Dropdown = ({
  id,
  label,
  options,
  placeholder = 'Select...',
  value,
  onChange,
  disabled = false,
  required = false,
  showSearch = false,
  className,
  error,
  loading = false,
  emptyMessage = 'No items found',
  dataCy,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen && showSearch) {
        setTimeout(() => searchInputRef.current?.focus(), 0);
      }
    }
  };

  const handleSelect = (option: DropdownOption) => {
    onChange?.(option);
    setIsOpen(false);
    setSearchTerm('');
  };

//   const handleClear = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     onChange?.(null);
//     setSearchTerm('');
//   };

  return (
    <div className="relative" ref={dropdownRef} data-cy={dataCy}>
      {/* Label */}
      {label && (
        <div className="flex justify-between items-center mb-1">
          <label htmlFor={id} className="text-sm font-medium text-gray-700">
            {label}
          </label>
          {required && (
            <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">
              Required
            </span>
          )}
        </div>
      )}

      {/* Dropdown Button */}
      <button
        type="button"
        className={cn(
          'flex justify-between items-center w-full px-3 py-2 text-left',
          'bg-white border rounded-lg',
          'focus:outline-none focus:ring-2 focus:ring-orange-200',
          disabled && 'bg-gray-50 cursor-not-allowed',
          error && 'border-red-500',
          !disabled && 'hover:border-gray-400',
          className
        )}
        onClick={handleToggle}
        disabled={disabled}
      >
        <span className="truncate">
          {value ? value.label : placeholder}
        </span>
        <svg
          className={cn(
            'w-5 h-5 transition-transform',
            isOpen && 'transform rotate-180'
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
          {showSearch && (
            <div className="p-2 border-b">
              <input
                ref={searchInputRef}
                type="text"
                className={cn(
                  'w-full px-3 py-2 text-sm border rounded-lg',
                  'focus:outline-none focus:ring-2 focus:ring-orange-200'
                )}
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          <div className="max-h-60 overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center text-gray-500">Loading...</div>
            ) : filteredOptions.length === 0 ? (
              <div className="p-4 text-center text-gray-500">{emptyMessage}</div>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={cn(
                    'px-3 py-2 cursor-pointer',
                    'hover:bg-orange-50 hover:text-orange-700',
                    value?.value === option.value && 'bg-orange-50 text-orange-700'
                  )}
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}; 