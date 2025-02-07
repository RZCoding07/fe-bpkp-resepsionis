import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

interface User {
  id: string;
  email?: string;
  fullname?: string;
  username: string;
}

export const columns: ColumnDef<User>[] = [
 // no
  {
    id: 'no',
    header: ({ column }) => <DataTableColumnHeader column={column} title='No' />,
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  
  {
    accessorKey: 'username',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Username' />,
    cell: ({ row }) => <span>{row.getValue('username')}</span>,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Email' />,
    cell: ({ row }) => <span>{row.getValue('email')}</span>,
  },
  {
    accessorKey: 'fullname',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Full Name' />,
    cell: ({ row }) => <span>{row.getValue('fullname')}</span>,
  },
  {
    id: 'actions',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Actions' />,
    cell: ({ row }) => (
      <DataTableRowActions row={row} />
    ),
  },
];
