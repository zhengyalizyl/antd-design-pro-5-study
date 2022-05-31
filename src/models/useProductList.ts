import { useState, useCallback } from 'react'

export default function useProductList() {
  const [user, setUser] = useState('user')

  const signin = useCallback((account, password) => {
    // signin implementation
    // setUser(user from signin API)
  }, [])

  const signout = useCallback(() => {
    // signout implementation
    // setUser(null)
  }, [])

  return {
    user,
    setUser,
    signin,
    signout
  }
}