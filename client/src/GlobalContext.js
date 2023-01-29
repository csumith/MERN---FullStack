import React, { createContext , useEffect, useState } from 'react'
import AuthApi from './API/AuthApi'


export const GlobalContext = createContext()

function DataProvider(props) {
    const [token, setToken] = useState(null)
    
    useEffect(() => {
        if(localStorage.getItem('loginToken')) {
            let myToken = localStorage.getItem('loginToken')
            setToken(myToken)
        }
    }, [])
     //context data
    let data = {
        token: [token, setToken],
        authApi :AuthApi(),
    }

    return (
<GlobalContext.Provider value={data}> 
    { props.children }
</GlobalContext.Provider>
    ) // it sending the data child component
}

export default DataProvider