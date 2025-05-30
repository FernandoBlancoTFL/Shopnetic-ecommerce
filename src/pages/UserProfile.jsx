import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export function UserProfile () {
  const { user } = useContext(AuthContext)

  return (
    <div>
      <h1> Hola {user}! </h1>
    </div>
  )
}
