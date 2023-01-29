import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import {useNavigate, useParams} from 'react-router-dom'

function EditUser() {
  const [user, setUser] = useState({
    name: "",
    email:"",
    mobile:"",
  })
  const navigate = useNavigate()
  const params = useParams()


  useEffect(() => {
    axios.get(`/api/v1/user/single/${params.id}`)
        .then(res => {
            setUser(res.data.user)
        }).catch(err => toast.error(err.message))

  },[])

  const readValue = (e) => {
    let { name, value }= e.target
    setUser({ ...user, [name]: value})
  }

  const submitHandler =  async(e) => {
    e.preventDefault()
    console.log('user=',user);
    await axios.patch(`/api/v1/user/edit/${params.id}`,user)
    .then(res =>{
      toast.success("Successfully updated")
      navigate(`/user/dashboard`)
    }).catch(err => toast.error(err.message))
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <h3 className="display-3">Edit user</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form  onSubmit= {submitHandler} autoComplete="off">
                <div className="form-group mt-2">
                  <label htmlFor="name" >Name</label>
                  <input type="text" name="name" id="name"  value={user.name} onChange={readValue} className="form-control" required />
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="email" >Email</label>
                  <input type="email" name="email" id="email" value={user.email} onChange={readValue} className="form-control" required />
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="mobile" >Mobile</label>
                  <input type="number" name="mobile" id="mobile" value={user.mobile} onChange={readValue}className="form-control" required />
                </div>
                <div className="form-group mt-2">
                  
                  <input type="submit" value="Update" className="btn btn-outline-warning"  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default EditUser
