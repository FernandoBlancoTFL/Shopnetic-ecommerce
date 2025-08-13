import { Link } from 'react-router-dom'

export function Footer () {
  return (
    <footer className='bg-dark text-white mt-auto pt-5 pb-3'>
      <div className='container'>
        <div className='row mb-4'>
          <div className='col-md-4'>
            <h5 className='text-uppercase'>Shopnetic</h5>
            <p className='text-white-50'>
              Tu tienda online de confianza para productos de tecnología, hogar y más. Calidad y buen precio, en un solo lugar.
            </p>
          </div>
          <div className='col-md-4'>
            <h6 className='text-uppercase'>Enlaces</h6>
            <ul className='list-unstyled text-white-50'>
              <li><Link to='/' className='text-white-50 text-decoration-none'>Inicio</Link></li>
              <li><Link to='/' className='text-white-50 text-decoration-none'>Productos</Link></li>
              <li><Link to='/about' className='text-white-50 text-decoration-none'>Sobre Nosotros</Link></li>
              <li><Link to='/contact' className='text-white-50 text-decoration-none'>Contacto</Link></li>
            </ul>
          </div>
          <div className='col-md-4'>
            <h6 className='text-uppercase'>Seguinos</h6>
            <div className='d-flex gap-2'>
              <button className='btn btn-outline-light btn-sm rounded-circle' title='Facebook'>
                <i className='bi bi-facebook' />
              </button>
              <button className='btn btn-outline-light btn-sm rounded-circle' title='Twitter'>
                <i className='bi bi-twitter' />
              </button>
              <button className='btn btn-outline-light btn-sm rounded-circle' title='Instagram'>
                <i className='bi bi-instagram' />
              </button>
            </div>
          </div>
        </div>

        <hr className='border-white-50' />
        <div className='text-center text-white-50'>
          <small>© {new Date().getFullYear()} Shopnetic. Todos los derechos reservados.</small>
        </div>
      </div>
    </footer>
  )
}
