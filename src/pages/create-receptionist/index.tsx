import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import { UserNav } from '@/components/user-nav'
import { Button } from '@/components/custom/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import ThemeSwitch from '@/components/theme-switch'
import { Link, useNavigate } from 'react-router-dom'

export default function CreateUser() {
  const form = useForm({
    defaultValues: {
      fullname: '',
      email: '',
      username: '',
      password: '',
    },
  })

  const navigate = useNavigate()
  const [role, setRole] = useState('admin')

  const onSubmit = async (data: any) => {
    const apiUrl = import.meta.env.VITE_API_URL
    try {
      const response = await fetch(`${apiUrl}/receptiopnists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast.success('User created successfully!')
        form.reset()
        navigate('/admin')
      } else {
        toast.error('Failed to create user.')
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.')
    }
  }

  return (
    <Layout>
      <Layout.Header sticky>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <Card>
          <CardHeader>
            <CardTitle>Create Data Receptionist</CardTitle>
            <CardDescription>Add a new user to the system</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4'
              >
                <FormField
                  control={form.control}
                  name='fullname'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type='email' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='username'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type='password' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />



                <div className='flex items-center gap-3 '>
                  <Button type='submit' className='bg-slate-600'>
                    Create Receptionist
                  </Button>
                  <Button type='button'>
                    <Link to='/receptionist'>Kembali</Link>
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </Layout.Body>
    </Layout>
  )
}
