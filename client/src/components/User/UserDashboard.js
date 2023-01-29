import React,{ useContext, useEffect,useState } from 'react'
import { GlobalContext } from '../../GlobalContext'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'

function UserDashboard() {
  const context = useContext(GlobalContext)
  const [user] = context.authApi.user
  const [users, setUsers] = useState([])

  const delUser = (id) => {
      if(window.confirm(`Are you sure to delete user ${id} ?`)) {
          axios.delete(`/api/v1/user/delete/${id}`)
            .then(res => {
                toast.success("User deleted successfully");
                window.location.href= "/user/dashboard"
            }).catch(err => toast.error(err.message))
      } else {
          toast.warning("delete terminated")
      }
  }


  useEffect(() =>{
      axios.get(`/api/v1/user/allUser`)
        .then(res => {
          console.log('users =', res.data);
          const curUsers = res.data.users;
          const filterUsers = curUsers.filter((item) => item._id !== user._id)
          setUsers(filterUsers)
        }).catch(err => toast.error(err.message))
  },[])

  return (
    <div className="container">
      <div className="col-md-12">
         <div className="row">
          <div className="col-md-12 text-center">
            <h3 className="display-3">User Dashboard</h3>
          </div>
         </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive">
            <table className="table table-stripped table-bordered">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                   users.map((item,index) => {
                    return (
                        <tr key={index} >
                            <td> {item._id} </td>
                            <td> {item.name} </td>
                            <td> {item.email} </td>
                            <td> {item.mobile} </td>
                            <td>
                                <NavLink to={`/user/edit/${item._id}`} className="btn btn-success">Edit</NavLink>
                                <button onClick={() => delUser(item._id)} className="btn btn-danger float-end">Delete</button>
                            </td>
                        </tr>
                    )
                   })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard