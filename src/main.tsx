// import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from 'react-hot-toast'
import router from '@/router'
import 'primereact/resources/themes/lara-light-cyan/theme.css'
import { PrimeReactProvider } from 'primereact/api'
import { AuthProvider } from "@/contexts/auth-context"
import '@/index.css'
// if user app_type nya monica maka gunakan monicaRouter

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <AuthProvider>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <PrimeReactProvider value={{ unstyled: true }}>
        <RouterProvider router={router} />
        <Toaster position='top-center' toastOptions={{ duration: 3000 }} />
      </PrimeReactProvider>
    </ThemeProvider>
  </AuthProvider>,
)
