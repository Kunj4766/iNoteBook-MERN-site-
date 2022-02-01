import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

function Login(props) {
    const [cred, setCred] = useState({ email: "", password: "" })
    let history = useHistory()
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:4000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: cred.email,password: cred.password})
        })
        const json = await response.json();
        console.log(json)
        if(json.success===true){
            // save the jwttoken and redirect
            localStorage.setItem('token',json.jwtToken);
            props.showAlert("You have successfully loged in","success")
            history.push('/home')
        }
        else{
            props.showAlert("Please enter valid credential of your account","danger")
        }
    }
    const onChange = (text) => {
        setCred({ ...cred, [text.target.name]: text.target.value })
    }
    return (
        <div style={{marginTop: "15px"}}>
            <h2 className="mb-3">Login into iNotebook</h2>
            <form onSubmit={handleOnSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" value={cred.email} className="form-control" onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className ="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" value={cred.password} className="form-control" onChange={onChange} id="password" name="password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
