import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

function SignUp(props) {
    const [cred, setCred] = useState({name: "",email: "", password: "",cpassword: ""})
    let history = useHistory()
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:4000/api/auth/creatuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: cred.name,email: cred.email,password: cred.password})
        })
        const json = await response.json();
        console.log(json)
        if(json.success===true){
            // save the jwttoken and redirect
            localStorage.setItem('token',json.jwtToken);
            history.push('/home')
            props.showAlert("You have successfully signed in","success")
        }
        else{
            props.showAlert("Please enter valid Details","warning")
        }
    }
    const onChange = (text) => {
        setCred({ ...cred, [text.target.name]: text.target.value })
    }
    return (
        <div style={{marginTop: "15px"}}>
            <h2 className="mb-3">Signup to use iNotebook</h2>
            <form onSubmit={handleOnSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" onChange={onChange} value={cred.name} id="name" name="name" minLength={3} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onChange} value={cred.email} id="email" name="email" aria-describedby="emailHelp" required/>
                    <div id="emailHelp" className ="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} value={cred.password} id="password" name="password" minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" onChange={onChange} value={cred.cpassword} id="cpassword" name="cpassword" minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default SignUp
