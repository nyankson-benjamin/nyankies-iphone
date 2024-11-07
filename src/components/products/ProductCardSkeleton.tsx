export default function ProductCardSkeleton() {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <div className="flex flex-col items-center justify-between h-full">
        <div className="flex flex-col items-center w-full">
          {/* Image placeholder */}
          <div className="w-[100px] h-[100px] bg-gray-200 rounded-md mb-3 animate-pulse" />
          
          {/* Title placeholder */}
          <div className="h-6 w-3/4 bg-gray-200 rounded mb-2 animate-pulse" />
          
          {/* Price placeholder */}
          <div className="h-5 w-1/4 bg-gray-200 rounded mb-3 animate-pulse" />
        </div>
        
        {/* Button placeholder */}
        <div className="w-full h-9 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );
} 