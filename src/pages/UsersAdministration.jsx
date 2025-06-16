import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const users = [
  {
    createdAt: "2025-06-15T03:23:53.583Z",
    firstName: "Alexandrine",
    avatar: "https://avatars.githubusercontent.com/u/82398139",
    password: "N4CRIT6pW7tghW8",
    userName: "Patsy7",
    image: "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/45.jpg",
    token: "4bde74ab775b4e97dde0cef1",
    lastname: "Gottlieb",
    description: "Corporate",
    country: "Anguilla",
    accountCreationDate: "2025-04-20T12:30:50.905Z",
    email: "Micaela.Schneider56@example.net",
    id: "1"
  },
  {
    createdAt: "2025-06-15T21:52:09.227Z",
    firstName: "Jalen",
    avatar: "https://avatars.githubusercontent.com/u/89983326",
    password: "coXt50KDqWnw8dn",
    userName: "Lexi_Bradtke",
    image: "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/48.jpg",
    token: "bdfd1f24a6d3c9dd8fe1daaf",
    lastname: "Rowe",
    description: "Corporate",
    country: "Ukraine",
    accountCreationDate: "2024-10-27T01:55:17.644Z",
    email: "Burdette.Lemke45@example.org",
    id: "2"
  },
  {
    createdAt: "2025-06-15T05:47:39.715Z",
    firstName: "Marlon",
    avatar: "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/35.jpg",
    password: "A6clv9yDU2vCfyD",
    userName: "Tanya_Bergstrom81",
    image: "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/71.jpg",
    token: "efdc5aafcbe997fee7f7d5cd",
    lastname: "Armstrong",
    description: "Chief",
    country: "Democratic Republic of the Congo",
    accountCreationDate: "2025-02-04T14:23:00.416Z",
    email: "Grayson_Boehm@example.net",
    id: "3"
  },
  {
    createdAt: "2025-06-15T09:12:11.438Z",
    firstName: "Makenzie",
    avatar: "https://avatars.githubusercontent.com/u/96273056",
    password: "LeL2P_LLDNDS44h",
    userName: "Angie.Reynolds",
    image: "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/77.jpg",
    token: "bc458aadd40ec463cddd6bd2",
    lastname: "Pacocha",
    description: "Future",
    country: "Niger",
    accountCreationDate: "2024-07-05T10:24:20.146Z",
    email: "Tamara_Padberg@example.net",
    id: "4"
  }
];

export function UsersAdministration() {
  return (
    <main className='flex-grow-1 bg-secondary text-white p-4'>
      <h1 className="mb-4">Administración de Usuarios</h1>
      <div className="table-responsive mx-auto">
        <table className="table table-dark table-bordered table-hover align-middle">
          <thead>
            <tr>
              <th scope="col">Usuario</th>
              <th scope="col">Rol</th>
              <th scope="col">Fecha Agregado</th>
              <th scope="col" className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>
                  <div className="d-flex align-items-center gap-3">
                    <img 
                      src={user.image} 
                      alt={user.userName} 
                      className="rounded-circle" 
                      width="50" 
                      height="50" 
                    />
                    <div>
                      <div className="fw-bold">{user.userName}</div>
                      <div className="text-white">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>Cliente</td>
                <td>{new Date(user.accountCreationDate).toISOString().split('T')[0]}</td>
                <td className="text-center">
                  <button className="btn btn-sm btn-outline-light me-2">Modificar</button>
                  <button className="btn btn-sm btn-outline-danger">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
