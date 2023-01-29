import React, {useState} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'

function Login() {
  const [user,setUser] = useState({
    email: "",
    password:""
  })
  const navigate = useNavigate()

  const readValue = (e) => {
    let { name, value } = e.target
    setUser({ ...user, [name]:value })
  }

  const submitHandler =  async(e) => {
    e.preventDefault()
    console.log('user=',user);
    await axios.post(`/api/v1/auth/login`,user)
    .then(res =>{
      toast.success("Successfully Login")
      let token = res.data.token
      localStorage.setItem("loginToken", token)
      navigate("/")
      window.location.href ="/"
      //console.log('login response=', res)
    }).catch(err => toast.error(err.response.data.msg))
  }
  return (
    
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <h3 className="display-3">Login</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form  onSubmit={submitHandler} autoComplete="off">
                
                <div className="form-group mt-2">
                  <label htmlFor="email" >Email</label>
                  <input type="email" name="email"  value={user.email} onChange={readValue} id="email" className="form-control" required />
                </div>
                
                <div className="form-group mt-2">
                  <label htmlFor="password" >Password</label>
                  <input type="Password" name="password" value={user.password} onChange={readValue} id="password" className="form-control" required />
                </div>
                <div className="form-group mt-2">
                  
                  <input type="submit" value="Login" className="btn btn-outline-warning"  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login