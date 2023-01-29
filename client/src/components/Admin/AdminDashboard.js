
import React, {useContext} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { GlobalContext } from '../../GlobalContext'

import axios from 'axios';
import {toast} from 'react-toastify'

function AdminDashboard() {
  const context = useContext(GlobalContext)
  const [events] = context.eventApi.events 

  const navigate = useNavigate()

  // delete event logic
  const deleteEvent = async (id) => {
    if(window.confirm(`Are you sure to delete event?`)){
    await axios.delete(`/api/v1/event/delete/${id}`)
      .then(res => {
        toast.success("Event Deleted Successfully")
        navigate(`/`)
        window.location.href ="/"
      }).catch(err =>console.log(err.message))
    } else {
      toast.warning('delete terminated')
    }
  }


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <h3 className="display-3">Admin Dashboard</h3>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive">
            <table className=" table table-stripped table-bordered">
              <thead>
                <tr>
                  <th colSpan={6}>
                    <NavLink to={`/admin/event/create`} className="btn btn-outline-primary float-end" data-bs-toggle="tool tip" data-bs-tittle="Create An Event" data-bs-placement="bottom">
                       Create <i className="bi bi-plus-circle-fill"></i></NavLink>
                  </th>
                </tr>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Event Date</th>
                 
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  events && events.map((item,index) =>{
                    return (
                      <tr key ={index}>
                        <td> {item.name}</td>
                        <td> {item.description}</td>
                        <td>{item.eventDate}</td>
                        <td>{item.isEnabled ? <span className="text-success">Active</span> : <strong className="text-warning">Waiting </strong>}</td>
                        <td >
                          <NavLink to={`/admin/event/update/${item._id}`} className="btn btn-sm btn-info"><i className="bi bi-pencil-square text-white"></i></NavLink>
                          <button className="btn btn-sm btn-danger ms-2" onClick={() => deleteEvent(item._id)}><i className="bi bi-trash"></i>
                          </button>
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

export default AdminDashboard