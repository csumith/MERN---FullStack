import React,{useContext} from 'react'
import { BrowserRouter as Router,Navigate, Route, Routes } from 'react-router-dom'
import { createBrowserHistory} from 'history'
import AuthGuard from '../middleware/AuthGuard'; // for protecting the application
import {GlobalContext} from '../GlobalContext'



/*toastify */
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

/*components */
import Login from './Auth/Login'
import Register from './Auth/Register'
import About from './Default/About'
import Contact from './Default/Contact'
import Home from './Default/Home'
import Pnf from './Default/Pnf'
import Menu from './Headers/Menu'
import AdminDashboard from './Admin/AdminDashboard';
import UserDashboard from './User/UserDashboard';
import CreateEvent from './Admin/Event/Create';
import UpdateEvent from './Admin/Event/Update';
import EditUser from './User/EditUser';
import MovieApi from './User/Movieapi';

const history = createBrowserHistory()

function Main() {
   const context = useContext(GlobalContext)
   const [isLogged] =context.authApi.isLogged
   const [isUser] = context.authApi.isUser
   const[isAdmin] =context.authApi.isAdmin 

  return (
    <Router history={history}>
        <Menu/>
        <ToastContainer autoClose={2000} position={"top-right"}/>
        <Routes>
            <Route path={`/`} element={isAdmin? <Navigate to={`/admin/dashboard`}/> : <Home/>} />
            <Route path={`/about`} element={<About/>} />
            <Route path={`/contact`} element={<Contact/>} />
            {/* <Route path={`/movie`} element={<MovieApi.js/>} /> */}
            <Route path={`/login`} element={ isLogged ? <Pnf/>:<Login/>} />
            <Route path={`/register`} element={ isLogged ? <Pnf/>: <Register/>} />

            {
              isLogged && isAdmin ? (
                <Route element={<AuthGuard/>}>
                  <Route path={`/admin/dashboard`} element={<AdminDashboard/>} /> 
                  <Route path={`/admin/event/create`} element={<CreateEvent/>} />
                  <Route path={`/admin/event/update/:id`} element={<UpdateEvent/>} />
                </Route>
              ):null
            }
            {
              isLogged && isUser ? (
                <Route element={<AuthGuard/>}>
                <Route path={`/user/dashboard`} element={<UserDashboard/>} />
                <Route path={`/movie`} element={<MovieApi/>} />
                
                <Route path={`/user/edit/:id`} element={<EditUser/>} />
                </Route>
              ):null
            }
            <Route path={`/*`} element={<Pnf/>} />
        </Routes>
    </Router>
  )
}

export default Main