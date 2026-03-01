import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router'
import axios from 'axios'

const Register = () => {

  const [username, setusername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleFormSubmit(e) {
    e.preventDefault()

    await axios.post("http://localhost:3000/api/auth/register",{
      username,
      email,
      password
    },{
      withCredentials: true
    })
    .then(res =>{
      console.log(res.data);
      
    })
    
  }


  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleFormSubmit} >
          <input
            value={username}
            onChange={(e) => {
              setusername(e.target.value)
            }}
            type="text" name='username' placeholder='Enter username' />
          <input value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            type="text" name='email' placeholder='Enter email' />
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            type="password" name='password' placeholder='Enter password' />
          <button type='submit'>Register</button>
        </form>

        <p>Already have an account? <Link to="/login" className='toggleAuthForm'>log in</Link></p>
      </div>
    </main>
  )
}

export default Register
