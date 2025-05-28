import { Link, useLocation } from 'react-router-dom'
import { ChevronRight } from 'react-bootstrap-icons'
import React from 'react'

export function CustomBreadcrumb ({ routes = [] }) {
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <nav
      className='bg-secondary px-4 py-2 rounded d-flex align-items-center'
      style={{ margin: '1rem' }}
    >
      {routes.map((route, index) => {
        const isLast = index === routes.length - 1
        return (
          <React.Fragment key={route.path}>
            <Link
              to={route.path}
              className={`d-flex align-items-center text-decoration-none ${
                isLast ? 'text-primary' : 'text-dark'
              }`}
              style={{ fontWeight: '500' }}
            >
              {route.icon && <span className='me-2'>{route.icon}</span>}
              {route.name}
            </Link>
            {!isLast && <ChevronRight size={16} className='mx-2 text-white' />}
          </React.Fragment>
        )
      })}
    </nav>
  )
};
