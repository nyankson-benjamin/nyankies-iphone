
export default function TableLoader() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-white rounded mb-4" /> {/* Header */}
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex space-x-4 mb-3">
          <div className="h-6 bg-white rounded w-1/4" />
          <div className="h-6 bg-white rounded w-1/4" />
          <div className="h-6 bg-white rounded w-1/4" />
          <div className="h-6 bg-white rounded w-1/4" />
        </div>
        ))}
    </div>
  )
}
