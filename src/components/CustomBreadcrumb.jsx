import { Link, useLocation } from 'react-router-dom'
import { ChevronRight } from 'react-bootstrap-icons'
import { Button } from 'react-bootstrap'
import React from 'react'

export function CustomBreadcrumb ({ routes = [] }) {
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <nav
      className='bg-secondary px-2 py-2 my-1 rounded d-flex align-items-center '
    >
      <div className='d-flex flex-wrap flex-md-nowrap w-100 justify-content-end justify-content-lg-between align-items-center gap-3 gap-lg-0'>
        <div className='d-flex align-items-center w-100'>
          {routes.map((route, index) => {
            const isLast = index === routes.length - 1
            return (
              <React.Fragment key={route.path}>
                <Link
                  to={route.path}
                  className={`d-flex align-items-center text-decoration-none ${
                isLast ? 'text-info' : 'text-white'
              }`}
                  style={{ fontWeight: '300' }}
                >
                  <div className='d-flex align-items-center gap-1 fs-5'>
                    {route.icon}
                    {route.name}
                  </div>
                </Link>
                {!isLast && <ChevronRight size={16} className='mx-2 text-white' />}
              </React.Fragment>
            )
          })}
        </div>
        {routes.length > 1 && <Link to={routes[routes.length - 2].path}><Button variant='primary' className='px-4 py-2 fw-semibold shadow-sm rounded-2' style={{ width: '120px' }}><i class='bi bi-arrow-left' /> Volver</Button></Link>}
      </div>
    </nav>
  )
};
