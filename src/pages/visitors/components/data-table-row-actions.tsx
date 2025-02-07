import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/custom/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from 'react-hot-toast'
import { useCallback } from 'react'

interface DataTableRowActionsProps {
  row: {
    original: {
      id: string
    }
  }
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const apiUrl = import.meta.env.VITE_API_MASTER;

  const handleDelete = useCallback(async (id: string) => {
    try {
      const response = await fetch(`${apiUrl}/users/${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        toast.success('User deleted successfully')
        location.reload()
      } else {
        console.error('Failed to delete user')
        toast.error('Failed to delete user')
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      toast.error('Error deleting user')
    }
  }, [apiUrl])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'>
          <DotsHorizontalIcon className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => handleDelete(row.original.id)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
