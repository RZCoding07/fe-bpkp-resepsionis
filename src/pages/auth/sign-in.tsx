import { useEffect, useState } from 'react'
import { UserAuthForm } from './components/user-auth-form'

export default function SignIn() {
  const [formattedDate, setFormattedDate] = useState('')
  const [formattedTime, setFormattedTime] = useState('')

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date()
      setFormattedDate(
        currentTime.toLocaleDateString('id-ID', { dateStyle: 'full' })
      )
      setFormattedTime(
        currentTime.toLocaleTimeString('id-ID', { timeStyle: 'medium' })
      )
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <>
        <div className='relative grid h-screen items-center justify-center lg:grid-cols-[60%_40%] lg:px-0'>
          <div
            className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'
            style={{
              backgroundImage: "url('/background.jpeg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Gradient overlay with transparency */}
            <div className='absolute inset-0 bg-gradient-to-tl from-slate-900 to-slate-950 opacity-70' />
            {/* make green underline */}
            <div className='relative z-20 flex items-center text-xl font-medium'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='mr-2 h-6 w-6'
              >
                <path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
              </svg>
              <span>
               Sistem Resepsionis Badan Pengawasan Keuangan dan Pembangunan (BPKP)
              </span>
            </div>

            <div className='relative z-20 mt-auto'>
              <blockquote className='space-y-2'>
                <p className='text-xl'>
                  &ldquo;Fastabiqul Khairat, berlomba-lombalah dalam
                  kebaikan.&rdquo;
                </p>
                <footer className='text-lg'>
                  {formattedDate} | {formattedTime}
                </footer>
              </blockquote>
            </div>
          </div>

          <div className='lg:p-8'>
            <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[520px]'>
              <div
                className={`mb-10 flex items-center justify-center gap-2 align-middle lg:-ml-10`}
              >
                <img className='rounded-full' src='./logo.png' alt='logo' style={{ width: '55px' }} />
                <div
                  className={`visible flex w-auto flex-col justify-end truncate`}
                >
                  <span className='ml-2 text-xl font-semibold'>E-Receptionist</span>
                  <span className='text-md ml-2'>Badan Pengawasan Keuangan dan Pembangunan</span>
                </div>
              </div>
              <div className='flex flex-col space-y-2 text-left'>
                <h1 className='text-xl font-semibold tracking-tight'>Login</h1>
                <p className='text-sm text-muted-foreground'>
                  Silahkan masuk dengan akun yang telah terdaftar
                </p>
              </div>
              <UserAuthForm />
    
              <p className='px-8 text-center text-sm text-muted-foreground'>
                &copy; 2025 BPKP | All Rights Reserved
              </p>
            </div>
          </div>
        </div>
    </>
  )
}
