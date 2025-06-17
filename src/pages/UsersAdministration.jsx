import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import * as bootstrap from 'bootstrap';
import { Button } from 'react-bootstrap';

export function UsersAdministration() {
  const [usersData, setUsersData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastname: '',
    userName: '',
    email: '',
    password: '',
    description: '',
    country: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
      try {
        const response = await fetch('https://684f5092f0c9c9848d2aaa70.mockapi.io/users');
        if (!response.ok) throw new Error('Error al obtener los productos');
        const data = await response.json();
        setUsersData(data);
      } catch (error) {
        console.error(error.message);
      }
    };

  const handleEditClick = (user) => {
    setSelectedUser({ ...user });
    const modal = bootstrap.Modal.getInstance(document.getElementById('editModal')) || new bootstrap.Modal(document.getElementById('editModal'));
    modal.show();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSaveChanges = async () => {
    console.log(selectedUser)
    try {
      const response = await fetch(`https://684f5092f0c9c9848d2aaa70.mockapi.io/users/${selectedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedUser)
      })

      if (!response.ok) throw new Error('Error al modificar el usuario');
        
      await fetchUsers()

      Swal.fire({
            title: "Actualizado!",
            text: "Los datos del usuario han sido editados",
            icon: "success"
          });

      const data = await response.json()
      console.log(data)

    } catch (error) {
          console.error(error.message)
      }
    const modal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
    modal.hide();
  };

  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = async () => {
    const maxId = Math.max(...usersData.map(u => parseInt(u.id)), 0);
    const formattedDate = new Date().toISOString();

    const userToAdd = {
      ...newUser,
      image: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
      token: 'ced61a686b6f1f6c5c9036b3',
      accountCreationDate: formattedDate,
      id: (maxId + 1).toString()
    };

    const addedUser = await addUser(userToAdd)

    if(addedUser){
      await fetchUsers()
      const modal = bootstrap.Modal.getInstance(document.getElementById('addUserModal'));
      modal.hide();
      setNewUser({
        firstName: '',
        lastname: '',
        userName: '',
        email: '',
        password: '',
        description: '',
        country: ''
      });
      Swal.fire({
        title: "Agregado!",
        text: "Haz agregado un nuevo usuario",
        icon: "success"
      });
    }
  };

  const addUser = async (user) => {
    try {
    const response = await fetch('https://684f5092f0c9c9848d2aaa70.mockapi.io/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    
    if (!response.ok) throw new Error('Error al agregar al usuario');
    
    const data = await response.json()
    return data

    } catch (error) {
      console.error(error.message)
    }
  }

  const handleDeleteUser = async (userId) => {
    Swal.fire({
      title: "¿Estas seguro que quieres eliminar al usuario?",
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar usuario",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`https://684f5092f0c9c9848d2aaa70.mockapi.io/users/${userId}`, {
            method: 'DELETE',
          })

          if (!response.ok) throw new Error('Error al eliminar al usuario');
        
          await fetchUsers()
        
          Swal.fire({
            title: "Eliminado!",
            text: "El usuario ha sido eliminado",
            icon: "success"
          });
        
        } catch (error) {
          console.error(error.message)
        }
      }
    });
  }

  return (
    <main className='flex-grow-1 bg-secondary text-white p-4'>
      <h1 className="mb-4">Administración de Usuarios</h1>
      <Button variant='primary' onClick={() => {
        const modal = new bootstrap.Modal(document.getElementById('addUserModal'));
        modal.show();
      }}>
        Agregar usuario
      </Button>

      <div className="table-responsive mx-auto mt-3">
        <table className="table table-dark table-bordered table-hover align-middle">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Rol</th>
              <th>Fecha Agregado</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map(user => (
              <tr key={user.id}>
                <td>
                  <div className="d-flex align-items-center gap-3">
                    <img src={user.image} alt={user.userName} className="rounded-circle" width="50" height="50" />
                    <div>
                      <div className="fw-bold">{user.userName}</div>
                      <div className="text-white">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>Cliente</td>
                <td>{new Date(user.accountCreationDate).toISOString().split('T')[0]}</td>
                <td className="text-center">
                  <button className="btn btn-sm btn-outline-light me-2" onClick={() => handleEditClick(user)}>Modificar</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="modal fade" id="editModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content bg-dark text-white">
            <div className="modal-header">
              <h5 className="modal-title">Editar Usuario</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              {selectedUser && (
                <form className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Usuario</label>
                    <input type="text" className="form-control" name="userName" value={selectedUser.userName} onChange={handleInputChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" value={selectedUser.email} onChange={handleInputChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-control" name="firstName" value={selectedUser.firstName} onChange={handleInputChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Apellido</label>
                    <input type="text" className="form-control" name="lastname" value={selectedUser.lastname} onChange={handleInputChange} />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">Contraseña</label>
                    <input type="password" className="form-control" name="password" value={selectedUser.password} onChange={handleInputChange} />
                  </div>
                </form>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button className="btn btn-primary" onClick={handleSaveChanges}>Guardar Cambios</button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="addUserModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content bg-dark text-white">
            <div className="modal-header">
              <h5 className="modal-title">Agregar Usuario</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Nombre</label>
                  <input type="text" className="form-control" name="firstName" value={newUser.firstName} onChange={handleNewInputChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Apellido</label>
                  <input type="text" className="form-control" name="lastname" value={newUser.lastname} onChange={handleNewInputChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Nombre de Usuario</label>
                  <input type="text" className="form-control" name="userName" value={newUser.userName} onChange={handleNewInputChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" name="email" value={newUser.email} onChange={handleNewInputChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Contraseña</label>
                  <input type="password" className="form-control" name="password" value={newUser.password} onChange={handleNewInputChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">País</label>
                  <input type="text" className="form-control" name="country" value={newUser.country} onChange={handleNewInputChange} />
                </div>
                <div className="col-12">
                  <label className="form-label">Descripción</label>
                  <textarea className="form-control" name="description" rows="3" value={newUser.description} onChange={handleNewInputChange}></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button className="btn btn-success" onClick={handleAddUser}>Agregar Usuario</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
