export function Contact () {
  return (
    <main className='main flex-grow-1 bg-secondary py-5'>
      <div className='container'>
        <h2 className='text-center mb-4 text-white'>Contacto</h2>
        <p className='text-center text-light mb-5'>
          ¿Tienes dudas, consultas o sugerencias? ¡Nos encantará saber de ti! Completa el formulario y te responderemos lo antes posible.
        </p>

        <div className='row justify-content-center'>
          <div className='col-md-10 col-lg-8'>
            <form className='bg-white p-4 p-md-5 rounded-4 shadow-lg'>
              <div className='mb-4'>
                <label htmlFor='name' className='form-label fw-semibold'>Nombre</label>
                <input
                  type='text'
                  className='form-control form-control-lg'
                  id='name'
                  placeholder='Tu nombre completo'
                  required
                />
              </div>

              <div className='mb-4'>
                <label htmlFor='email' className='form-label fw-semibold'>Correo electrónico</label>
                <input
                  type='email'
                  className='form-control form-control-lg'
                  id='email'
                  placeholder='nombre@ejemplo.com'
                  required
                />
              </div>

              <div className='mb-4'>
                <label htmlFor='subject' className='form-label fw-semibold'>Asunto</label>
                <input
                  type='text'
                  className='form-control form-control-lg'
                  id='subject'
                  placeholder='Motivo de tu mensaje'
                />
              </div>

              <div className='mb-4'>
                <label htmlFor='message' className='form-label fw-semibold'>Mensaje</label>
                <textarea
                  className='form-control form-control-lg'
                  id='message'
                  rows='5'
                  placeholder='Escribe tu mensaje aquí...'
                  required
                />
              </div>

              <div className='text-center'>
                <button
                  type='submit'
                  className='btn btn-primary btn-lg px-5 shadow-sm'
                  style={{
                    borderRadius: '50px',
                    transition: 'all 0.3s ease-in-out'
                  }}
                >
                  Enviar mensaje
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
