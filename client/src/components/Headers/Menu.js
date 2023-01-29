import axios from 'axios'
import React, { useContext } from 'react'
import { useNavigate , NavLink } from 'react-router-dom'
import { GlobalContext } from '../../GlobalContext'
import { toast } from 'react-toastify';

const defaultRoute =  (
    <ul className="navbar-nav">
       <li className="nav-item">
          <NavLink to={`/`} className="nav-link">Home</NavLink>
       </li>
       <li className="nav-item">
          <NavLink to={`/about`} className="nav-link">About</NavLink>
       </li>
       <li className="nav-item">
          <NavLink to={`/contact`} className="nav-link">Contact</NavLink>
       </li>
       <li className="nav-item">
          <NavLink to={`/movie`} className="nav-link">Movies</NavLink>
       </li>
    </ul>
)

const rightSideRoute= (
    <ul className="navbar-nav">
      <li className="nav-item">
       <NavLink to={`/login`} className="nav-link">Login</NavLink>
     </li>
      <li className="nav-item">
       <NavLink to={`/register`} className="nav-link">Register</NavLink>
     </li>
    </ul>
)




function Menu() {
  const context = useContext(GlobalContext)
  const [ isUser, setIsUser] = context.authApi.isUser 
  const [ isAdmin, setIsAdmin] = context.authApi.isAdmin 
  const [isLogged, setIsLogged] = context.authApi.isLogged

  const navigate = useNavigate()

  const LogoutUser = async() => {
    if(window.confirm(`Are you sure to logout?`)) {
       const res = await axios.get(`/api/v1/auth/logout`)
      localStorage.clear()
      if(isAdmin) setIsAdmin(false) 
      if(isUser) setIsUser(false)
      setIsLogged(false)
      toast.success(res.data.msg)
      navigate(`/`)
      window.location.href ="/"
    } else {
      toast.warning(`logout terminated`)
    }
  }

  const commonRoute = () => {
    return(
    <ul className= "navbar-nav">
       <li className="nav-item dropdown">
        <NavLink className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
          Account
        </NavLink>
        <ul className="dropdown-menu">
          <li>
            {
              isLogged && isUser ?
              <NavLink to={`/user/dashboard`} className="dropdown-item">User Dashboard</NavLink> :null
            }
            {
              isLogged && isAdmin ?
              <NavLink to={`/admin/dashboard`} className="dropdown-item">Admin Dashboard</NavLink> :null
            }
          </li>
          <li className="dropdown-divider"></li>
          <li>
            <NavLink to ={`/`} onClick={LogoutUser} className="btn btn-danger dropdown-item">Logout</NavLink>
          </li>
        </ul>
       </li>
    </ul>
  )
          }
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-danger">
        <div className="container">
            <NavLink to={`/`} className="navbar-brand">MERN-API-Project</NavLink>

            <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#menu">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={ isAdmin ? "collapse navbar-collapse justify-content-end" : "collapse navbar-collapse justify-content-md-between"} id="menu">
                {isAdmin ? null : defaultRoute}
                {
                 isLogged ? commonRoute(): rightSideRoute
                 }
            </div>
        </div>
    </nav>
  )
}

export default Menu