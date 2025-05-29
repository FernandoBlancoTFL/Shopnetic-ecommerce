import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export function TemporalFile () {
  const { logout } = useContext(AuthContext)

  return (
    <div>
      <h1> Hola usuario! </h1>
      <button onClick={logout}>Desloguearse</button>
    </div>
  )
}
