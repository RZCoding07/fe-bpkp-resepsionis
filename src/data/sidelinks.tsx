import cookie from 'js-cookie'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

const user = cookie.get('user')
const role = user ? JSON.parse(user).role : ''
console.log(role)

let sidelinksMaster: SideLink[];

if (role === 'admin') {
  sidelinksMaster = [
    {
      title: 'Dashboard',
      label: '',
      href: '/',
      icon: <img width="20" height="20" src="https://img.icons8.com/stickers/20/virtual-machine2.png" alt="virtual-machine2" />,
    },
    {
      title: 'Data Admin',
      label: '',
      href: '/admin',
      icon: <img width="20" height="20" src="https://img.icons8.com/stickers/20/administrator-male.png" alt="administrator-male" />,
    },
    {
      title: 'Data Employees',
      label: '',
      href: '/employee',
      icon: <img width="20" height="20" src="https://img.icons8.com/stickers/20/permanent-job.png" alt="permanent-job" />,
    },

    {
      title: 'Data Receptionist',
      label: '',
      href: '/receptionist',
      icon: <img width="20" height="20" src="https://img.icons8.com/stickers/20/moleskine.png" alt="moleskine" />
    },
    {
      title: 'Data Division',
      label: '',
      href: '/division',
      icon: <img width="20" height="20" src="https://img.icons8.com/stickers/20/organization.png" alt="organization" />
    },
    {
      title: 'Scanner QRCode',
      label: '',
      href: '/scan-qr',
      icon: <img width="22" height="22" src="https://img.icons8.com/stickers/22/qr-code--v1.png" alt="qr-code--v1" />
    },
    {
      title: 'Data Visitor',
      label: '',
      href: '/visitor',
      icon: <img width="22" height="22" src="https://img.icons8.com/stickers/22/qr-code--v1.png" alt="qr-code--v1" />
    }
  ]
} else if (role === 'receptionists') {
  sidelinksMaster = [
    {
      title: 'Dashboard',
      label: '',
      href: '/',
      icon: <img width="20" height="20" src="https://img.icons8.com/stickers/20/virtual-machine2.png" alt="virtual-machine2" />,
    },
    {
      title: 'Scanner QRCode',
      label: '',
      href: '/scan-qr',
      icon: <img width="22" height="22" src="https://img.icons8.com/stickers/22/qr-code--v1.png" alt="qr-code--v1" />
    },
    {
      title: 'Data Visitor',
      label: '',
      href: '/visitor',
      icon: <img width="22" height="22" src="https://img.icons8.com/stickers/22/qr-code--v1.png" alt="qr-code--v1" />
    }
  ]
} else {
  sidelinksMaster = [

  ]
}




export const sidelinks: SideLink[] = sidelinksMaster