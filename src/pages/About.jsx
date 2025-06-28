import { Seo } from '../components/Seo'

export function About () {
  return (
    <main className='main flex-grow-1 bg-secondary text-dark py-5'>
      <Seo
        title='Sobre Nosotros - Shopnetic'
        description='Conocé más sobre Shopnetic y nuestra misión como tienda online.'
        keywords='sobre nosotros, quienes somos, tienda shopnetic, ecommerce'
        url='https://shopneticfb.netlify.app/about'
      />
      <div className='container'>
        <div className='row align-items-center mb-5 text-black'>
          <div className='col-md-6 mb-4 mb-md-0'>
            <img
              src='https://www.nubixstore.ar/img/posts/2023/05/como_armar_una_tienda_online_pasos_clave_para_el_exito.jpg'
              alt='Sobre nosotros'
              className='img-fluid rounded-4 shadow-lg'
            />
          </div>
          <div className='col-md-6'>
            <h2 className='mb-3 fw-bold'>Sobre Nosotros</h2>
            <p className='lead'>
              Bienvenido a <strong>Shopnetic</strong>, tu tienda en línea confiable donde encontrarás productos de
              tecnología, hogar y estilo de vida a precios accesibles.
            </p>
            <p>
              Nuestro objetivo es ofrecerte una experiencia de compra sencilla, rápida y segura, con productos de calidad seleccionados cuidadosamente.
            </p>
            <p>
              Utilizamos la{' '}
              <a
                href='https://dummyjson.com/docs/products'
                target='_blank'
                rel='noopener noreferrer'
                className='text-decoration-underline text-primary fw-semibold'
              >
                DummyJSON API
              </a>{' '}
              para mostrar los productos más variados y populares.
            </p>
          </div>
        </div>

        <div className='row text-center'>
          <div className='col-md-4 mb-4'>
            <div className='card h-100 border-0 shadow rounded-4 card-body-mvm'>
              <div className='card-body'>
                <div className='fs-1 mb-3'>🚚</div>
                <h5 className='card-title fw-semibold'>Envíos Rápidos</h5>
                <p className='card-text'>Enviamos tus productos a todo el país con entregas rápidas y seguras.</p>
              </div>
            </div>
          </div>
          <div className='col-md-4 mb-4'>
            <div className='card h-100 border-0 shadow rounded-4 card-body-mvm'>
              <div className='card-body'>
                <div className='fs-1 mb-3'>💳</div>
                <h5 className='card-title fw-semibold'>Pagos Seguros</h5>
                <p className='card-text'>Aceptamos múltiples formas de pago y garantizamos la protección de tus datos.</p>
              </div>
            </div>
          </div>
          <div className='col-md-4 mb-4'>
            <div className='card h-100 border-0 shadow rounded-4 card-body-mvm'>
              <div className='card-body'>
                <div className='fs-1 mb-3'>⭐</div>
                <h5 className='card-title fw-semibold'>Atención Personalizada</h5>
                <p className='card-text'>Nuestro equipo está listo para ayudarte con cualquier consulta o sugerencia.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
