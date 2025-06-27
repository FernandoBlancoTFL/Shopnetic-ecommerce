export function UserProfile () {
  const user = {
    username: 'admin',
    fullName: 'Admin Master',
    email: 'admin@admin.com',
    role: 'Super Administrador',
    joined: '15 de enero de 2020',
    country: 'Argentina',
    bio: 'Encargado de la gestión y supervisión de todo el sistema. Fanático de la eficiencia, el código limpio y el mate.',
    profilePicture: 'https://i.pravatar.cc/300?img=12'
  }

  return (
    <div className='container my-5'>
      <div className='main row justify-content-center'>
        <div className='col-lg-8 col-md-10'>
          <div className='card shadow-lg'>
            <div className='card-body text-center p-4'>
              <img
                src={user.profilePicture}
                alt='Foto de perfil de admin'
                className='rounded-circle mb-3'
                width='150'
                height='150'
              />
              <h2 className='card-title'>{user.fullName}</h2>
              <h5 className='text-muted mb-2'>@{user.username}</h5>
              <p className='text-muted'>{user.role}</p>

              <p className='mt-3'>{user.bio}</p>

              <hr />

              <div className='row mt-4 text-start'>
                <div className='col-sm-6 mb-3'>
                  <h6 className='mb-0 text-muted'>Correo electrónico:</h6>
                  <span>{user.email}</span>
                </div>
                <div className='col-sm-6 mb-3'>
                  <h6 className='mb-0 text-muted'>País:</h6>
                  <span>{user.country}</span>
                </div>
                <div className='col-sm-6 mb-3'>
                  <h6 className='mb-0 text-muted'>Fecha de ingreso:</h6>
                  <span>{user.joined}</span>
                </div>
                <div className='col-sm-6 mb-3'>
                  <h6 className='mb-0 text-muted'>Contraseña:</h6>
                  <span>••••</span>
                </div>
              </div>

              <button className='btn btn-primary mt-3 px-4'>Editar perfil</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
