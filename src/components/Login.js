import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom';


const Login = (props) => {
    const [credentials, setcredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();
    const { showalert } = props;
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();
        if (json.sucess === true) {
            //redirecet
            localStorage.setItem('token', json.authid);
            navigate("/");
            showalert("sucessfully Logged in", "success");
        }
        else {
            showalert("Invalid Credentials", "danger");
        }
    }

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div className='mt-3'>
            <h2>Login to continue in INotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={credentials.password} name='password' onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary" >Log In</button>
            </form>
        </div>
    )
}

export default Login
