import { Layout } from '@/components/custom/layout'
import { useState, useEffect } from 'react'
// import { Search } from '@/components/search'
// import { Button } from '@/components/custom/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Search } from '@/components/search'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ThemeSwitch from '@/components/theme-switch'
import { TopNav } from '@/components/top-nav'
import { UserNav } from '@/components/user-nav'
import { RecentSales } from './components/recent-sales'
import { Overview } from './components/overview'
import LanguageSwitch from '@/components/language-switch'

export default function Dashboard() {

  const [data , setData] = useState({
    countApproveTamuHariIniCheckIn: 0,
    countApproveTamuHariIniCheckOut: 0,
    countApproveKeseluruhanTamuCheckIn: 0,
    countApproveKeseluruhanTamuCheckOut: 0,
  });

  const apiurl = import.meta.env.VITE_API_URL as string;

  useEffect(() => {
    fetch(`${apiurl}/dashboard`) 
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header>
        <div className='ml-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      {/* ===== Main ===== */}
      <Layout.Body>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>
            {('Dashboard')}
          </h1>
        </div>
        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-4'
        >
          <div className='w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger value='overview'>{('Statistik Pengunjung')}</TabsTrigger>
              <TabsTrigger value='reports'>{('Laporan')}</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value='overview' className='space-y-4'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>

              <Card className='shadow-md shadow-cyan-500'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Total Pengunjung Hari Ini</CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='h-4 w-4 text-muted-foreground'
                  >
                    <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
                  </svg>
                </CardHeader>

                <CardContent>
                <hr className='w-full border border-cyan-600 px-5' />
                  
                  <p className='text-sm text-muted-foreground pt-2'>Check In: {data.countApproveTamuHariIniCheckIn} | Check Out: {data.countApproveTamuHariIniCheckOut}</p>
                </CardContent>
              </Card>

              <Card className='shadow-md shadow-cyan-500'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Total Pengunjung S.D Hari Ini</CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='h-4 w-4 text-muted-foreground'
                  >
                    <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
                  </svg>
                </CardHeader>
                <CardContent>
                <hr className='w-full border border-cyan-600 px-5' />
                  
                  <p className='text-sm text-muted-foreground pt-2'>Check In: {data.countApproveKeseluruhanTamuCheckIn} | Check Out: {data.countApproveKeseluruhanTamuCheckOut}</p>
                </CardContent>
              </Card>
              
            </div>
          </TabsContent>
        </Tabs>
      </Layout.Body>
    </Layout>
  )
}
