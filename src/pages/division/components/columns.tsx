import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

interface User {
  id: string;
  name?: string;
}

export const columns: ColumnDef<User>[] = [
 // no
  {
    id: 'no',
    header: ({ column }) => <DataTableColumnHeader column={column} title='No' />,
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Name' />,
    cell: ({ row }) => <span>{row.getValue('name')}</span>,
  },
  {
    id: 'actions',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Actions' />,
    cell: ({ row }) => (
      <DataTableRowActions row={row} />
    ),
  },
];
