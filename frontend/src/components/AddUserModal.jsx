import { useState } from 'react'
import { USERS_URL } from '../constants/constants'
import { getUserAccessTokenFromLocalStorage } from '../utils/getUserAccessTokenFromLocalStorage'

export function AddUserModal ({ newUser, handleNewInputChange, handleAddUser }) {
  const [errors, setErrors] = useState({})
  const [userAdded, setUserAdded] = useState(false)
  const tokenFromLocalStorage = getUserAccessTokenFromLocalStorage()

  const isUserNameTaken = async () => {
    const response = await fetch(USERS_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${tokenFromLocalStorage}`
      }
    })
    const data = await response.json()
    const exists = data.some(user => user.userName === newUser.userName)
    return exists
  }

  const validate = async () => {
    const newErrors = {}

    if (!newUser.firstName.trim()) {
      newErrors.firstName = 'El nombre es obligatorio'
    } else if (newUser.firstName.length > 25) {
      newErrors.firstName = 'El nombre no puede tener más de 25 caracteres'
    }

    if (!newUser.lastname.trim()) {
      newErrors.lastname = 'El apellido es obligatorio'
    } else if (newUser.lastname.length > 25) {
      newErrors.lastname = 'El apellido no puede tener más de 25 caracteres'
    }

    if (!newUser.userName.trim()) {
      newErrors.userName = 'El nombre de usuario es obligatorio'
    } else if (newUser.userName.length > 40) {
      newErrors.userName = 'El nombre de usuario no puede tener más de 40 caracteres'
    } else if (await isUserNameTaken()) {
      newErrors.userName = 'El nombre de usuario ya está en uso'
    }

    if (!newUser.email.trim()) {
      newErrors.email = 'El correo es obligatorio'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.email)) {
      newErrors.email = 'El correo no es válido'
    }

    if (!newUser.password.trim()) {
      newErrors.password = 'La contraseña es obligatoria'
    } else if (newUser.password.length > 30) {
      newErrors.password = 'La contraseña no puede tener más de 30 caracteres'
    }

    if (!newUser.country) {
      newErrors.country = 'El país es obligatorio'
    }

    if (!newUser.description.trim()) {
      newErrors.description = 'La descripción es obligatoria'
    } else if (newUser.description.length > 200) {
      newErrors.description = 'La descripción no puede tener más de 200 caracteres'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    const isValid = await validate()
    if (isValid) {
      setUserAdded(true)
      await handleAddUser()
      setUserAdded(false)
    }
  }

  return (
    <div className='modal fade' id='addUserModal' tabIndex='-1' aria-hidden='true'>
      <div className='modal-dialog modal-dialog-centered modal-lg'>
        <div className='modal-content bg-dark text-white'>
          <div className='modal-header'>
            <h5 className='modal-title'>Agregar Usuario</h5>
            <button type='button' className='btn-close btn-close-white' data-bs-dismiss='modal' />
          </div>
          <div className='modal-body'>
            <form className='row g-3'>
              <div className='col-md-6'>
                <label className='form-label'>Nombre</label>
                <input type='text' className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} name='firstName' value={newUser.firstName} onChange={handleNewInputChange} maxLength={25} />
                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
              </div>
              <div className='col-md-6'>
                <label className='form-label'>Apellido</label>
                <input type='text' className={`form-control ${errors.lastname ? 'is-invalid' : ''}`} name='lastname' value={newUser.lastname} onChange={handleNewInputChange} maxLength={25} />
                {errors.lastname && <div className='invalid-feedback'>{errors.lastname}</div>}
              </div>
              <div className='col-md-6'>
                <label className='form-label'>Nombre de Usuario</label>
                <input type='text' className={`form-control ${errors.userName ? 'is-invalid' : ''}`} name='userName' value={newUser.userName} onChange={handleNewInputChange} maxLength={40} />
                {errors.userName && <div className='invalid-feedback'>{errors.userName}</div>}
              </div>
              <div className='col-md-6'>
                <label className='form-label'>Email</label>
                <input type='email' className={`form-control ${errors.email ? 'is-invalid' : ''}`} name='email' value={newUser.email} onChange={handleNewInputChange} maxLength={45} />
                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
              </div>
              <div className='col-md-6'>
                <label className='form-label'>Contraseña</label>
                <input type='password' className={`form-control ${errors.password ? 'is-invalid' : ''}`} name='password' value={newUser.password} onChange={handleNewInputChange} maxLength={30} />
                {errors.password && <div className='invalid-feedback'>{errors.password}</div>}
              </div>
              <div className='col-md-6'>
                <label className='form-label'>País</label>
                <select
                  className='form-select'
                  name='country'
                  value={newUser.country}
                  onChange={handleNewInputChange}
                >
                  <option value='Argentina'>Argentina</option>
                  <option value='Brasil'>Brasil</option>
                  <option value='Chile'>Chile</option>
                  <option value='México'>México</option>
                  <option value='Colombia'>Colombia</option>
                  <option value='Perú'>Perú</option>
                  <option value='España'>España</option>
                  <option value='EEUU'>EE.UU.</option>
                  <option value='Uruguay'>Uruguay</option>
                </select>
                {errors.country && <div className='invalid-feedback'>{errors.country}</div>}
              </div>
              <div className='col-12'>
                <label className='form-label'>Descripción</label>
                <textarea className={`form-control ${errors.description ? 'is-invalid' : ''}`} name='description' rows='3' value={newUser.description} onChange={handleNewInputChange} maxLength={200} />
                {errors.description && <div className='invalid-feedback'>{errors.description}</div>}
              </div>
            </form>
          </div>
          <div className='modal-footer'>
            <button className='btn btn-secondary' disabled={userAdded} data-bs-dismiss='modal'>Cancelar</button>
            <button className='btn btn-success' onClick={handleSubmit} disabled={userAdded}>Agregar Usuario</button>
          </div>
        </div>
      </div>
    </div>
  )
}
