export function Contact () {
  return (
    <main className='main flex-grow-1 bg-secondary py-5'>
      <div className='container'>
        <h2 className='text-center mb-4'>Contacto</h2>
        <p className='text-center text-black mb-5'>
          ¿Tienes dudas, consultas o sugerencias? ¡Nos encantará saber de ti! Completa el formulario y te responderemos lo antes posible.
        </p>

        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <form className='bg-white p-4 rounded shadow-sm'>
              <div className='mb-3'>
                <label htmlFor='name' className='form-label'>Nombre</label>
                <input type='text' className='form-control' id='name' placeholder='Tu nombre completo' required />
              </div>

              <div className='mb-3'>
                <label htmlFor='email' className='form-label'>Correo electrónico</label>
                <input type='email' className='form-control' id='email' placeholder='nombre@ejemplo.com' required />
              </div>

              <div className='mb-3'>
                <label htmlFor='subject' className='form-label'>Asunto</label>
                <input type='text' className='form-control' id='subject' placeholder='Motivo de tu mensaje' />
              </div>

              <div className='mb-3'>
                <label htmlFor='message' className='form-label'>Mensaje</label>
                <textarea className='form-control' id='message' rows='5' placeholder='Escribe tu mensaje aquí...' required />
              </div>

              <div className='text-center'>
                <button type='submit' className='btn btn-primary px-4'>
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
