import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify';
import axios from 'axios'


function CreateEvent() {
  const [event, setEvent] = useState({
    name: "",
    description:"",
    eventDate:""
  })
  const navigate = useNavigate()

  const readValue =(e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value})
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    //console.log('event=', event);
   try {
    await axios.post(`/api/v1/event/create`,event)
    .then(res => {
      toast.success('Event created successfully')
      navigate(`/`)
      window.location.href= "/"
    }).catch(err => toast.error(err.message))
   } catch (error) {
    toast.error(error.response.data.msg)
   }
  }
  return (
  <div className="container">
    <div className="row">
      <div className="col-md-12 text-center">
        <h3 className="display-3">Create Event</h3>
      </div>
    </div>
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div className="card">
          <div className="card-body">
            <form onSubmit={submitHandler} autoComplete="off">
              <div className="form-group mt-12">
              <label htmlFor="name" >Name</label>
              <input type="text" name="name" id="name" value={event.name} onChange={readValue} className="form-control" />
              </div>
              <div className="form-group mt-2">
                <label htmlFor="description">Description</label>
                <textarea name="description" id="description" value={event.description} onChange={readValue} cols="30" rows="5" className="form-control" placeholder="min 20 characters-max 250 character" required></textarea>
              </div>
              <div className="form-group mt-2">
                <label htmlFor="eventDate" >Event Date</label>
                <input type="datetime-local" name="eventDate" id="eventDate" value={event.eventDate} onChange={readValue} className="form-control" required/>
                
              </div>
              <div className="form-group mt-2">
                <input type="submit"  value="create" className="btn btn-success" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default CreateEvent