import React , {useContext} from 'react'
import {GlobalContext} from '../GlobalContext'
import { Outlet, Navigate } from 'react-router-dom'

function AuthGuard() {
    const context = useContext(GlobalContext)
    const [token] = context.token

  return (
    <React.Fragment>
        {
            token ? <Outlet/> : <Navigate to={`/login`} />
        }
    </React.Fragment>
  )
}

export default AuthGuard