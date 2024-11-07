import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ArrowDown from '../../assets/icons/ArrowDown'; 
import { categories } from '../../constants/Navlinks';      

export default function CategoriesDropDown() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="relative z-10">
      <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            className="text-lg text-primaryDeep flex items-center gap-1"
          >
            Categories <ArrowDown />
          </button>
          {isDropdownOpen && (
            <div className="absolute bg-white shadow-md mt-2 rounded right-0">
              {categories.map((category) => (
                <Link
                  key={category.path}
                  to={category.path}
                  className={`block px-4 py-2 text-lg text-primaryDeep hover:bg-gray-100 whitespace-nowrap ${
                    location.pathname === category.path ? "font-bold" : ""
                  }`}
                  onClick={() => setDropdownOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          )}
        </div>
    </div>
  )
}
