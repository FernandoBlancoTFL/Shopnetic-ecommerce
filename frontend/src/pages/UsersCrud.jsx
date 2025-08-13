import { useState, useEffect } from 'react'
import { AddUserModal } from '../components/AddUserModal'
import { EditUserModal } from '../components/EditUserModal'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import * as bootstrap from 'bootstrap'
import { Button } from 'react-bootstrap'
import { CustomPagination } from '../components/CustomPagination'
import { USERS_URL } from '../constants/constants'
import { getUserAccessTokenFromLocalStorage } from '../utils/getUserAccessTokenFromLocalStorage'
import { getUserProfileUrlImage } from '../utils/getUserProfileUrlImage'
import { Seo } from '../components/Seo'

export function UsersCrud () {
  const [usersData, setUsersData] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    description: '',
    country: 'Argentina'
  })
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 10
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = usersData.slice(indexOfFirstUser, indexOfLastUser)
  const totalPages = Math.ceil(usersData.length / usersPerPage)
  const tokenFromLocalStorage = getUserAccessTokenFromLocalStorage()

  const refreshUsersPreservingPage = async (change = 0) => {
    await getUsers(true)
    const newTotalPages = Math.ceil((usersData.length + change) / usersPerPage)
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages)
    } else if (change > 0 && currentPage < newTotalPages) {
      setCurrentPage(newTotalPages)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async (preservePage = false) => {
    const response = await fetch(USERS_URL, {
      headers: {
        Authorization: `Bearer ${tokenFromLocalStorage}`
      }
    })
    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(errorMessage)
    }
    const usersResponse = await response.json()
    setUsersData(usersResponse)

    if (!preservePage) setCurrentPage(1)
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
    console.log(selectedUser)
    try {
      const response = await fetch(`${USERS_URL}/${selectedUser.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${tokenFromLocalStorage}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedUser)
      })

      if (!response.ok) throw new Error('Error user modification')

      refreshUsersPreservingPage(0)

      Swal.fire({
        title: 'Actualizado!',
        text: 'Los datos del usuario han sido editados',
        icon: 'success'
      })
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
    const userImageURL = await getUserProfileUrlImage()

    const userToAdd = {
      ...newUser,
      image: userImageURL,
      created_at: formattedDate,
      role: 'cliente'
    }

    const addedUser = await postUser(userToAdd)

    if (addedUser) {
      refreshUsersPreservingPage(1)
      const updatedTotalPages = Math.ceil((usersData.length + 1) / usersPerPage)
      if (currentPage < updatedTotalPages) {
        setCurrentPage(updatedTotalPages)
      }
      const modal = bootstrap.Modal.getInstance(document.getElementById('addUserModal'))
      modal.hide()
      setNewUser({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        description: '',
        country: 'Argentina'
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
      const response = await fetch(USERS_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${tokenFromLocalStorage}`,
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
          const response = await fetch(`${USERS_URL}/${userId}`, {
            headers: {
              Authorization: `Bearer ${tokenFromLocalStorage}`,
              'Content-Type': 'application/json'
            },
            method: 'DELETE'
          })

          if (!response.ok) throw new Error('Error deleting user')

          refreshUsersPreservingPage(-1)

          const newTotalPages = Math.ceil((usersData.length - 1) / usersPerPage)
          if (currentPage > newTotalPages) {
            setCurrentPage(newTotalPages)
          }

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

  const handlePageChange = (number) => {
    setCurrentPage(number)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className='main flex-grow-1 bg-secondary text-white p-4'>
      <Seo
        title='UsersCrud | Shopnetic'
        description='Administra los usuarios.'
        keywords='administración, usuarios, shopnetic'
        url='https://shopneticfb.netlify.app/userAdmin'
      />

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
              <th>ID</th>
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
                  <div className='d-flex justify-content-center'>
                    {user.id}
                  </div>
                </td>
                <td>
                  <div className='d-flex align-items-center gap-3 mx-2'>
                    <img src={user.image} alt={user.userName} className='rounded-circle' width='50' height='50' />
                    <div>
                      <div className='fw-bold'>{user.userName}</div>
                      <div className='text-white'>{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>{user.role}</td>
                <td>{new Date(user.created_at).toLocaleDateString('es-AR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                })}
                </td>
                <td className='text-center'>
                  <div className='d-flex flex-wrap justify-content-center gap-2'>
                    <button className='btn btn-sm btn-outline-light' onClick={() => handleEditClick(user)}>Modificar</button>
                    {user.role === 'admin' || <button className='btn btn-sm btn-outline-danger' onClick={() => deleteUser(user.id)}>Eliminar</button>}
                  </div>
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
