interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
}

export default function ResponsiveGrid({ children, className = "" }: ResponsiveGridProps) {
  return (
    <div className={`
      grid
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      xl:grid-cols-5
      gap-4
      p-4
      ${className}
    `}>
      {children}
    </div>
  );
} 