// import { useAuth } from '../context/AuthContext'
// import { Navigate, Outlet } from 'react-router-dom'

// const AdminRoute = () => {
//   const { adminCurrent, loading } = useAuth()

//   if (loading) {
//     return <div>Loading...</div> 
//   }

//   // return adminCurrent ? <Outlet /> : <Navigate to="/login/admin" replace />
//   // return adminCurrent ? <Outlet /> : <Navigate to="/admin" replace />
// }

// export default AdminRoute



import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = ({children}) => {
  const token = localStorage.getItem('token');
  if(!token) {
    return <Navigate to="/admin"/>
  }
  return children ?  children : <Outlet/>;
}

export default AdminRoute



