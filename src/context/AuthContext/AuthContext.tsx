import React, { createContext, useState } from 'react'

export type UserRole = {
  name: string
  type: 'wildcard' | 'read' | 'write'
}

export type AuthenticatedUser = {
  user: string
  token: string
  roles: UserRole[]
}

const AuthContext = createContext({
  auth: {
    token: localStorage.getItem('token') || '',
    user: localStorage.getItem('user') || '',
    roles: localStorage.getItem('roles') || ([] as UserRole[]),
  },
  setAuth: (_: AuthenticatedUser) => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthenticatedUser>({
    token: localStorage.getItem('token') || '',
    user: localStorage.getItem('user') || '',
    roles:
      (JSON.parse(localStorage.getItem('roles') || '[]') as UserRole[]) ||
      ([] as UserRole[]),
  })
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
