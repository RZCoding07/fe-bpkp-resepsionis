import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';

interface Visitor {
  id: string;
  fullname: string;
  phone: string;
  address: string;
  email: string;
  purpose: string;
  agency: string;
  checkIn: string;
  checkOut?: string;
  visit_date: string;
  signature?: string;
  departement: string;
}

export const columns: ColumnDef<Visitor>[] = [
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
    accessorKey: 'email',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Email' />,
    cell: ({ row }) => <span>{row.getValue('email')}</span>,
  },
  {
    accessorKey: 'purpose',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Purpose' />,
    cell: ({ row }) => <span>{row.getValue('purpose')}</span>,
  },
  {
    accessorKey: 'agency',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Agency' />,
    cell: ({ row }) => <span>{row.getValue('agency')}</span>,
  },
  {
    accessorKey: 'visit_date',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Visit Date' />,
    cell: ({ row }) => <span>{row.getValue('visit_date')}</span>,
  },
  {
    accessorKey: 'checkIn',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Check In' />,
    cell: ({ row }) => <span>{row.getValue('checkIn')}</span>,
  },
  {
    accessorKey: 'checkOut',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Check Out' />,
    cell: ({ row }) => <span>{row.getValue('checkOut')}</span>,
  },
  {
    accessorKey: 'departement',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Department' />,
    cell: ({ row }) => <span>{row.getValue('departement')}</span>,
  },
  {
    accessorKey: 'signature',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Signature' />,
    cell: ({ row }) => <img src={row.getValue('signature')} alt='signature' className='w-20 h-20 object-cover rounded-lg' />,
  },
  {
    id: 'actions',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Actions' />,
    cell: ({ row }) => <DataTableRowActions row={row} />, 
  },
];
