import { useContext } from 'react'
import AuthContext from '../Store/AuthProvider'

export const useAuth = () => {
  return useContext(AuthContext)
}
