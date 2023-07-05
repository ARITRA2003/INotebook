import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setcredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  let navigate = useNavigate();
  const { showalert } = props;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password }),
    });
    const json = await response.json();
    if (json.sucess === true) {
      //redirect
      localStorage.setItem('token', json.authid);
      navigate("/");
      showalert("sucessfully Account Created", "success");
    }
    else {
      showalert("Invalid Details", "danger");
    }
  }
  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  return (
    <div className='mt-3'>
       <h2>Create Account in INotebook</h2>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" aria-describedby="emailHelp" name='name' value={credentials.name} onChange={onChange} minLength={6} required />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" value={credentials.password} name='password' onChange={onChange} minLength={8} required />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="cpassword" value={credentials.cpassword} name='cpassword' onChange={onChange} minLength={8} required />
          </div>
          <button type="submit" className="btn btn-primary" >Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default Signup
