'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface Column<T> {
  header: string
  accessor: keyof T
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  onEdit: (item: T) => void
  onDelete: (id: string) => void
}

export default function DataTable<T extends { id: string }>({ columns, data, onEdit, onDelete }: DataTableProps<T>) {
  return (
    <div className={cn('overflow-x-auto rounded-lg border border-gray-200')}>
      <table className="min-w-full table-auto">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th key={String(col.accessor)} className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                {col.header}
              </th>
            ))}
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {data.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {columns.map((col) => (
                <td key={String(col.accessor)} className="px-4 py-2 text-sm text-gray-700">
                  {String(row[col.accessor])}
                </td>
              ))}
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => onEdit(row)}
                  className="px-3 py-1 text-xs rounded bg-[#1E5BFF] text-white hover:bg-[#1650cc]"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(row.id)}
                  className="px-3 py-1 text-xs rounded bg-red-500 text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
