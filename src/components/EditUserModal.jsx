import { useState } from 'react'

export function EditUserModal ({ selectedUser, handleInputChange, onSave }) {
  const [errors, setErrors] = useState({})
  const [userAdded, setUserAdded] = useState(false)

  const validate = () => {
    const newErrors = {}

    if (!selectedUser.userName.trim()) {
      newErrors.userName = 'El nombre de usuario es obligatorio'
    } else if (selectedUser.userName.length > 50) {
      newErrors.userName = 'El nombre de usuario no puede tener más de 50 caracteres'
    }
    if (!selectedUser.email.trim()) {
      newErrors.email = 'El correo es obligatorio'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(selectedUser.email)) {
      newErrors.email = 'El correo no es válido'
    }
    if (!selectedUser.firstName.trim()) {
      newErrors.firstName = 'El nombre es obligatorio'
    } else if (selectedUser.firstName.length > 25) {
      newErrors.firstName = 'El nombre no puede tener más de 25 caracteres'
    }
    if (!selectedUser.lastname.trim()) {
      newErrors.lastname = 'El apellido es obligatorio'
    } else if (selectedUser.lastname.length > 25) {
      newErrors.lastname = 'El apellido no puede tener más de 25 caracteres'
    }
    if (!selectedUser.password.trim()) newErrors.password = 'La contraseña es obligatoria'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (validate()) {
      setUserAdded(true)
      await onSave()
      setUserAdded(false)
    }
  }

  return (
    <div className='modal fade' id='editModal' tabIndex='-1' aria-hidden='true'>
      <div className='modal-dialog modal-dialog-centered modal-lg'>
        <div className='modal-content bg-dark text-white'>
          <div className='modal-header'>
            <h5 className='modal-title'>Editar Usuario</h5>
            <button type='button' className='btn-close btn-close-white' data-bs-dismiss='modal' />
          </div>
          <div className='modal-body'>
            {selectedUser && (
              <form className='row g-3'>
                <div className='col-md-6'>
                  <label className='form-label'>Usuario</label>
                  <input type='text' className={`form-control ${errors.userName ? 'is-invalid' : ''}`} name='userName' value={selectedUser.userName} onChange={handleInputChange} />
                  {errors.userName && <div className='invalid-feedback'>{errors.userName}</div>}
                </div>
                <div className='col-md-6'>
                  <label className='form-label'>Email</label>
                  <input type='email' className={`form-control ${errors.email ? 'is-invalid' : ''}`} name='email' value={selectedUser.email} onChange={handleInputChange} />
                  {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                </div>
                <div className='col-md-6'>
                  <label className='form-label'>Nombre</label>
                  <input type='text' className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} name='firstName' value={selectedUser.firstName} onChange={handleInputChange} />
                  {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                </div>
                <div className='col-md-6'>
                  <label className='form-label'>Apellido</label>
                  <input type='text' className={`form-control ${errors.lastname ? 'is-invalid' : ''}`} name='lastname' value={selectedUser.lastname} onChange={handleInputChange} />
                  {errors.lastname && <div className='invalid-feedback'>{errors.lastname}</div>}
                </div>
                <div className='col-md-12'>
                  <label className='form-label'>Contraseña</label>
                  <input type='password' className={`form-control ${errors.password ? 'is-invalid' : ''}`} name='password' value={selectedUser.password} onChange={handleInputChange} />
                  {errors.password && <div className='invalid-feedback'>{errors.password}</div>}
                </div>
              </form>
            )}
          </div>
          <div className='modal-footer'>
            <button className='btn btn-secondary' data-bs-dismiss='modal' disabled={userAdded}>Cancelar</button>
            <button className='btn btn-primary' onClick={handleSubmit} disabled={userAdded}>Guardar Cambios</button>
          </div>
        </div>
      </div>
    </div>
  )
}
