import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useSidebar from '../../hooks/useSidebar'
import { PageLayout, Wrapper } from '../globalComponents'
import Sidebar from '../Sidebar'

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { auth } = useAuth()
  const { open } = useSidebar()
  if (!auth.token) {
    return <Navigate to="/" replace />
  }

  return (
    <Wrapper>
      <Sidebar />
      <PageLayout open={open}>{children}</PageLayout>
    </Wrapper>
  )
}
export default PrivateRoute
