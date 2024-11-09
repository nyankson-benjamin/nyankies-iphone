import { useState, useRef, useEffect } from "react";
import { Input } from "./Input";
import ArrowDown from "../../assets/icons/ArrowDown";
interface SelectComponentProps {
  options: { label: string; value: string | number }[];
  setSearchTerm?: (term: string) => void;
  onChange: (value: string) => void;
  searchTerm?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  showSearch?: boolean;
  disabled?: boolean;
  error?: string;
  showError?: boolean;
}
export default function SelectComponent({
  options,
  setSearchTerm,
  onChange,
  searchTerm,
  placeholder = "Select an option",
  searchPlaceholder = "Search",
  showSearch = true,
  disabled = false,
  error,
  showError = false,
}: SelectComponentProps) {
  const [showOptions, setShowOptions] = useState(false);
  const filteredOptions = options
    .filter((option) =>
      option.label.toLowerCase().includes(searchTerm?.toLowerCase() ?? "")
    )
    ?.filter((option) => option.label?.length > 0);
  const [selectedValue, setSelectedValue] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef}>
         <label className="block text-sm font-medium text-gray-700 py-0.5">
            {placeholder} {!showError && error && <span className="text-red-500 text-sm">*</span>}
          </label>
          {showError && error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        onClick={() => setShowOptions(!showOptions)}
        disabled={disabled}
        className="w-full
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
        disabled:cursor-not-allowed text-left flex justify-between items-center"
      >
        <p>{selectedValue ? selectedValue : placeholder}</p>
        <ArrowDown />
      </button>
      <div className="relative">
        {showOptions && (
          <div className="absolute z-10 w-full mt-1 p-2 bg-white border border-gray-300 rounded-md shadow-lg ">
            {showSearch && (
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
                placeholder={searchPlaceholder}
                // className="mx-4 my-2 w-[95%]"
              />
            )}
            <div className="overflow-y-auto overflow-x-hidden max-h-60 scrollbar-2 scrollbar-thumb ">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <div
                    key={option.value}
                    className={` p-2 my-3 rounded-md cursor-pointer hover:bg-primary hover:text-white ${
                      selectedValue === option.label
                        ? "bg-primary text-white"
                        : "hover:bg-primary hover:text-white"
                    }`}
                    onClick={() => {
                      setSelectedValue(option.label ? option.label : "Others");
                      onChange(option.value as string);
                      setShowOptions(false);
                    }}
                  >
                    {option.label}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500">No results found</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
