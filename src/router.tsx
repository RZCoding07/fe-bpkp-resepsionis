import { createBrowserRouter } from 'react-router-dom'
import GeneralError from './pages/errors/general-error'
import NotFoundError from './pages/errors/not-found-error'
import MaintenanceError from './pages/errors/maintenance-error'
import UnauthorisedError from './pages/errors/unauthorised-error.tsx'
import cookie from 'js-cookie'
import { toast } from 'react-hot-toast'
import { redirect } from 'react-router-dom'

const user = cookie.get('user')


// Helper untuk mendapatkan cookie
const getCookie = (name: string) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? match[2] : null
}

let currentUrl = window.location.pathname;


// Loader untuk autentikasi
const requireAuth = async () => {
  const userCookie = getCookie('user')
  if (currentUrl === '/visitor-public') {
    return null
  }

  console.log(userCookie)
  if (!userCookie || userCookie.length === 0) {
    throw redirect('/sign-in') // Redirect ke halaman sign-in jika tidak ada cookie
  }
  return null
}

const removeAllCookies = () => {
  document.cookie.split(';').forEach(function (c) {
    document.cookie = c
      .replace(/^ +/, '')
      .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/')
  })
}

requireAuth().catch((error) => {
  if (error instanceof Error) {
    toast.error(error.message)
  }
})



// Fungsi untuk menjalankan pemeriksaan secara berkala
const checkAuthPeriodically = () => {
  setInterval(async () => {
    try {
      await requireAuth();
    } catch (error) {
      toast.error('Sesi Anda telah berakhir. Silakan masuk kembali.');
      window.location.reload();
    }
  }, 1000); // Setiap 1 detik
};


if (currentUrl !== '/sign-in') {
  checkAuthPeriodically();
}




const router = createBrowserRouter([
  // Auth routes
  {
    path: '/sign-in',
    lazy: async () => ({
      Component: (await import('./pages/auth/sign-in')).default,
    }),
  },

  // Main routes
  {
    path: '/',
    lazy: async () => {
      const AppShell = await import('./components/app-shell')
      return { Component: AppShell.default }
    },
    loader: requireAuth,
    errorElement: <GeneralError />,
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import('./pages/dashboard')).default,
        }),
        loader: requireAuth,
      },
      {
        path: 'dashboard',
        lazy: async () => ({
          Component: (await import('./pages/dashboard')).default,
        }),
        loader: requireAuth,
      },
      {
        path: 'admin',
        lazy: async () => ({
          Component: (await import('@/pages/admins/index.tsx')).default,
        }),
        loader: requireAuth,
      },
      {
        path: 'receptionist',
        lazy: async () => ({
          Component: (await import('@/pages/receptionists/index.tsx')).default,
        }),
        loader: requireAuth,
      },
      {
        path: 'employee',
        lazy: async () => ({
          Component: (await import('@/pages/employees/index.tsx')).default,
        }),

      },
      {
        path: 'scan-qr',
        lazy: async () => ({
          Component: (await import('@/pages/scanner-receptionists/index.tsx')).default
        }),
        loader: requireAuth,
      },
      {
        path: 'visitor',
        lazy: async () => ({
          Component: (await import('@/pages/visitors/index.tsx')).default,
        }),
        loader: requireAuth,
      },
      {
        path: 'division',
        lazy: async () => ({
          Component: (await import('@/pages/division/index.tsx')).default,
        }),
        loader: requireAuth,
      },
      {
        path: 'create-admin',
        lazy: async () => ({
          Component: (await import('@/pages/create-admin/index.tsx')).default,
        }),
        loader: requireAuth,
      },
      {
        path: 'create-division',
        lazy: async () => ({
          Component: (await import('@/pages/create-division/index.tsx')).default,
        }),
        loader: requireAuth,
      },
      {
        path: 'create-employees',
        lazy: async () => ({
          Component: (await import('@/pages/create-employee/index.tsx')).default,
        }),


      },
      {
        path: 'create-receptionist',
        lazy: async () => ({
          Component: (await import('@/pages/create-receptionist/index.tsx')).default,
        }),
        loader: requireAuth
      },
      {
        path: 'visitor',
        lazy: async () => ({
          Component: (await import('@/pages/visitors/index.tsx')).default,
        }),
        loader: requireAuth,
      },




    ],
  },
  {
    path: 'visitor-public',
    lazy: async () => ({
      Component: (await import('@/pages/visitor-public/index.tsx')).default,
    }),


  },

  {
    path: '/logout',
    lazy: async () => ({
      Component: (await import('./pages/auth/sign-in')).default,
    }),
    loader: async () => {
      toast.success('Logout successful');
      removeAllCookies();
      return redirect('/sign-in');
    },
  },

  // Error routes
  { path: '/500', Component: GeneralError },
  { path: '/404', Component: NotFoundError },
  { path: '/503', Component: MaintenanceError },
  { path: '/401', Component: UnauthorisedError },

  // Fallback 404 route
  { path: '*', Component: NotFoundError },
])

export default router
