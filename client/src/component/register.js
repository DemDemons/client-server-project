import React, { useContext, useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import {userNameContext} from "./context/userName.js"


const Register = () => {
    const currentUserName = useContext(userNameContext)
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const Navigate = useNavigate();
    
    const handleSumit = (ev) =>  {
    ev.preventDefault()
    fetch('http://localhost:8080/users/register', {
        method: 'POST',
        headers: {
            "content-type": "application/json",
    },
        body: JSON.stringify({username: userName, password: password})
    })
    Navigate("/")
   
        
}

// useEffect(() => console.log(""), [])

  return (
    <>
    <h1>Please input username and password</h1>
      <form onSubmit={(ev) => handleSumit(ev)}> 
        <label>Username</label>
        <input onChange={(ev) => setUserName(ev.target.value)} type="text" name="username"></input>
        <label>Password</label>
        <input onChange={(ev) => setPassword(ev.target.value)} type="password" name="password"></input>
        <button>Submit</button>
      </form>
    </>
  )
}


export default Register
