import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

interface Employee {
  id: string;
  fullname: string;
  phone: string;
  address: string;
  division_id: string;
  division: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export const columns: ColumnDef<Employee>[] = [
  // No
  {
    id: 'no',
    header: ({ column }) => <DataTableColumnHeader column={column} title='No' />,
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  
  {
    accessorKey: 'fullname',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Full Name' />,
    cell: ({ row }) => <span>{row.getValue('fullname')}</span>,
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Phone' />,
    cell: ({ row }) => <span>{row.getValue('phone')}</span>,
  },
  {
    accessorKey: 'address',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Address' />,
    cell: ({ row }) => <span>{row.getValue('address')}</span>,
  },
  {
    id: 'division',  // Custom id for division
    header: ({ column }) => <DataTableColumnHeader column={column} title='Division' />,
    cell: ({ row }) => <span>{row.original.division?.name}</span>,  // Accessing division name via `row.original`
  },
  {
    id: 'actions',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Actions' />,
    cell: ({ row }) => (
      <DataTableRowActions row={row} />
    ),
  },
];
