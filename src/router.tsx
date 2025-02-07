import { createBrowserRouter } from 'react-router-dom'
import GeneralError from './pages/errors/general-error'
import NotFoundError from './pages/errors/not-found-error'
import MaintenanceError from './pages/errors/maintenance-error'
import UnauthorisedError from './pages/errors/unauthorised-error.tsx'

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
    errorElement: <GeneralError />,
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import('./pages/dashboard')).default,
        }),
      },
      {
        path: 'admin',
        lazy: async () => ({
          Component: (await import('@/pages/admins/index.tsx')).default,
        }),
      },
      {
        path : 'receptionist',
        lazy: async () => ({
          Component: (await import('@/pages/receptionists/index.tsx')).default,
        }),
      },
      {
        path : 'employee',
        lazy: async () => ({
          Component: (await import('@/pages/employees/index.tsx')).default,
        }),
      },
      {
        path : 'visitor',
        lazy: async () => ({
          Component: (await import('@/pages/visitors/index.tsx')).default,
        }),
      },
      {
        path : 'division',
        lazy: async () => ({
          Component: (await import('@/pages/division/index.tsx')).default,
        }),
      },
{
        path : 'create-admin',
        lazy: async () => ({
          Component: (await import('@/pages/create-admin/index.tsx')).default,
        }),
      },
      {
        path : 'create-division',
        lazy: async () => ({
          Component: (await import('@/pages/create-division/index.tsx')).default,
        }),

      },
      {
        path : 'create-employees',
        lazy: async () => ({
          Component: (await import('@/pages/create-employee/index.tsx')).default,
        }),

      },
      {
        path : 'create-receptionist',
        lazy: async () => ({
          Component: (await import('@/pages/create-receptionist/index.tsx')).default,
        }),

      },
      {
        path : 'visitor',
        lazy: async () => ({
          Component: (await import('@/pages/visitors/index.tsx')).default,
        }),
      },
      {
        path : 'visitor-public',
        lazy: async () => ({
          Component: (await import('@/pages/visitor-public/index.tsx')).default,
        }),

      },


      
    ],
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
