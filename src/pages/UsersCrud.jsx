import { useState, useEffect } from 'react'
import { AddUserModal } from '../components/AddUserModal'
import { EditUserModal } from '../components/EditUserModal'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import * as bootstrap from 'bootstrap'
import { Button } from 'react-bootstrap'
import { CustomPagination } from '../components/CustomPagination'

export function UsersCrud () {
  const [usersData, setUsersData] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastname: '',
    userName: '',
    email: '',
    password: '',
    description: '',
    country: ''
  })
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 10
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = usersData.slice(indexOfFirstUser, indexOfLastUser)
  const totalPages = Math.ceil(usersData.length / usersPerPage)

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    setCurrentPage(1)
    try {
      const response = await fetch('https://684f5092f0c9c9848d2aaa70.mockapi.io/users')
      if (!response.ok) throw new Error('Error al obtener los productos')
      const data = await response.json()
      setUsersData(data)
    } catch (error) {
      console.error(error.message)
    }
  }

  const handleEditClick = (user) => {
    setSelectedUser({ ...user })
    const modal = bootstrap.Modal.getInstance(document.getElementById('editModal')) || new bootstrap.Modal(document.getElementById('editModal'))
    modal.show()
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSelectedUser((prevUser) => ({ ...prevUser, [name]: value }))
  }

  const putUser = async () => {
    try {
      const response = await fetch(`https://684f5092f0c9c9848d2aaa70.mockapi.io/users/${selectedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedUser)
      })

      if (!response.ok) throw new Error('Error al modificar el usuario')

      await getUsers()

      Swal.fire({
        title: 'Actualizado!',
        text: 'Los datos del usuario han sido editados',
        icon: 'success'
      })

      const data = await response.json()
    } catch (error) {
      console.error(error.message)
    }
    const modal = bootstrap.Modal.getInstance(document.getElementById('editModal'))
    modal.hide()
  }

  const handleNewInputChange = (e) => {
    const { name, value } = e.target
    setNewUser((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddUser = async () => {
    const maxId = Math.max(...usersData.map(u => parseInt(u.id)), 0)
    const formattedDate = new Date().toISOString()
    const userImageURL = await getUrlByUserId(maxId + 1)
    const userToken = await getTokenByUserId(maxId + 1)

    const userToAdd = {
      ...newUser,
      image: userImageURL,
      token: userToken,
      accountCreationDate: formattedDate,
      id: (maxId + 1).toString()
    }

    const addedUser = await postUser(userToAdd)

    if (addedUser) {
      await getUsers()
      const modal = bootstrap.Modal.getInstance(document.getElementById('addUserModal'))
      modal.hide()
      setNewUser({
        firstName: '',
        lastname: '',
        userName: '',
        email: '',
        password: '',
        description: '',
        country: ''
      })
      Swal.fire({
        title: 'Agregado!',
        text: 'Haz agregado un nuevo usuario',
        icon: 'success'
      })
    }
  }

  const postUser = async (user) => {
    try {
      const response = await fetch('https://684f5092f0c9c9848d2aaa70.mockapi.io/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })

      if (!response.ok) throw new Error('Error al agregar al usuario')

      const data = await response.json()
      return data
    } catch (error) {
      console.error(error.message)
    }
  }

  const deleteUser = async (userId) => {
    Swal.fire({
      title: '¿Estas seguro que quieres eliminar al usuario?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar usuario',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`https://684f5092f0c9c9848d2aaa70.mockapi.io/users/${userId}`, {
            method: 'DELETE'
          })

          if (!response.ok) throw new Error('Error al eliminar al usuario')

          await getUsers()

          Swal.fire({
            title: 'Eliminado!',
            text: 'El usuario ha sido eliminado',
            icon: 'success'
          })
        } catch (error) {
          console.error(error.message)
        }
      }
    })
  }

  const getUrlByUserId = async (userId) => {
    try {
      const response = await fetch(`https://randomuser.me/api/?seed=${userId}`)
      if (!response.ok) throw new Error('Error al obtener la URL')
      const data = await response.json()
      const imageURL = data.results[0].picture.large
      return imageURL
    } catch (error) {
      console.error(error.message)
    }
  }

  const getTokenByUserId = async (userId) => {
    try {
      const response = await fetch(`https://68538e95a2a37a1d6f48f361.mockapi.io/token/${userId}`)
      if (!response.ok) throw new Error('Error al obtener los tokens')
      const data = await response.json()
      const userToken = data.token
      return userToken
    } catch (error) {
      console.error(error.message)
    }
  }

  const handlePageChange = (number) => {
    setCurrentPage(number)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className='main flex-grow-1 bg-secondary text-white p-4'>
      <div className='table-responsive mx-auto mt-0' style={{ maxWidth: '1200px' }}>
        <h2 className='mb-3'>Administración de Usuarios</h2>
        <Button
          className='mb-2'
          variant='primary' onClick={() => {
            const modal = new bootstrap.Modal(document.getElementById('addUserModal'))
            modal.show()
          }}
        >
          Agregar usuario
        </Button>
        <table className='table table-dark table-bordered table-hover align-middle'>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Rol</th>
              <th>Fecha Agregado</th>
              <th className='text-center'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map(user => (
              <tr key={user.id}>
                <td>
                  <div className='d-flex align-items-center gap-3 mx-2'>
                    <img src={user.image} alt={user.userName} className='rounded-circle' width='50' height='50' />
                    <div>
                      <div className='fw-bold'>{user.userName}</div>
                      <div className='text-white'>{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>Cliente</td>
                <td>{new Date(user.accountCreationDate).toISOString().split('T')[0]}</td>
                <td className='text-center'>
                  <button className='btn btn-sm btn-outline-light me-2' onClick={() => handleEditClick(user)}>Modificar</button>
                  <button className='btn btn-sm btn-outline-danger' onClick={() => deleteUser(user.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddUserModal handleAddUser={handleAddUser} newUser={newUser} handleNewInputChange={handleNewInputChange} />
      <EditUserModal handleInputChange={handleInputChange} onSave={putUser} selectedUser={selectedUser} />

      <div className='d-flex justify-content-center mt-4'>
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </main>
  )
}
