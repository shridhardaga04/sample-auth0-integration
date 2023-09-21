import React from 'react'
import { Navigate } from 'react-router-dom'

interface AuthRouteProps {
  children: React.ReactNode
}

function AuthRoute({ children }: AuthRouteProps) {
  const isAuthenticated = localStorage.getItem('token') != null

  return isAuthenticated ? <>{children}</> : <Navigate to="/unauthorised" />
}

export default AuthRoute
