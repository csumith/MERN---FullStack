import React, {useState, useEffect} from 'react'
import axios from 'axios';

function AuthApi() {
    //user info
    const [ user, setUser] = useState(null)

    //login status
    const[isLogged, setIsLogged] = useState(false)

    //role
    const [isUser, setIsUser] = useState(false)
    const [ isAdmin, setIsAdmin] = useState(false)

    useEffect(() =>{
      const getData = async() => {
          const res = await axios.get(`/api/v1/user/show`)
          setUser(res.data.user)
          setIsLogged(true)
          if(res.data.user.role === "superadmin") {
            setIsAdmin(true)
            setIsUser(false)
          }
          if(res.data.user.role === "user") {
            setIsUser(true)
            setIsAdmin(false)
          }
      }
      getData()
    }, [ user, isLogged, isUser, isAdmin])
    
  return {
    user: [user, setUser],
    isLogged: [isLogged, setIsLogged],
    isUser:[isUser,setIsUser],
    isAdmin:[isAdmin, setIsAdmin]

  }
}
export default AuthApi