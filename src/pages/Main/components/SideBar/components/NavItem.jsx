import { People } from '@mui/icons-material'
import { NavLink } from 'react-router-dom'
import { clsx } from '@mantine/core'

export default function NavItem({ to, label, icon }) {
  return (
    <NavLink
      to={to}
      activeClassName=""
      className={(isActive) =>
        clsx(
          'pl-4 pr-6 py-4 w-full rounded-full',
          isActive && 'bg-gray-100 text-gray-900',
          !isActive &&
            'flex items-center py-2 px-4 text-gray-700 hover:bg-gray-100 transition-colors duration-300'
        )
      }
      style={{ display: 'inline-block' }}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </NavLink>
  )
}
