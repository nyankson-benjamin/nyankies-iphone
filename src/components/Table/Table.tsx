import { 
  useReactTable, 
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef 
} from '@tanstack/react-table'

interface TableProps<T extends object> {
  data: T[]
  columns: ColumnDef<T, any>[]
  className?: string
  pageSize?: number
}

export function Table<T extends object>({ 
  data, 
  columns,
  className = '',
  pageSize = 10
}: TableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize,
      },
    },
  })

  return (
    <div className={`border rounded-lg w-full overflow-scroll scrollbar-2 ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="hover:bg-gray-100">
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="px-6 py-3 w-full flex items-center justify-between border-t border-gray-200 bg-white">
        <div className="flex-1 flex items-center justify-between">
          <div className="flex gap-x-2 items-center">
            <span className="text-sm text-gray-700">
              Page{' '}
              <span className="font-medium">{table.getState().pagination.pageIndex + 1}</span>
              {' '}of{' '}
              <span className="font-medium">{table.getPageCount()}</span>
            </span>
          </div>
          <div className="flex gap-x-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1 border rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-3 py-1 border rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 