/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryDeep: "#0D3356",
        primary: "#3A4980",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' }
        }
      },
      animation: {
        'slide-in-left': 'slide-in-left 0.3s ease-out'
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const scrollbarUtilities = {
        // Scrollbar width variants
        ".scrollbar::-webkit-scrollbar": {
          width: "1px",
        },
        ".scrollbar-2::-webkit-scrollbar": {
          width: "2px",
        },
        ".scrollbar-3::-webkit-scrollbar": {
          width: "3px",
        },
        ".scrollbar-4::-webkit-scrollbar": {
          width: "4px",
        },
        // Custom scrollbar thumb
        ".scrollbar-thumb::-webkit-scrollbar-thumb": {
          backgroundColor: "#D8DAE5",
          borderRadius: "10px",
        },
        // Custom scrollbar track
        ".scrollbar-track::-webkit-scrollbar-track": {
          backgroundColor: "#f1f1f1",
        },
      };

      addUtilities(scrollbarUtilities);
    },
  ],
}