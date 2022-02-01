import React from 'react'
import { Link, useHistory, useLocation } from "react-router-dom";

function Navbar() {
    let history = useHistory();
    const handleLogout = () => {
        localStorage.removeItem('token')
        history.push('/login')
    }
    let location = useLocation();
    return (
        <>
            {location.pathname === '/home' || location.pathname === '/about' ? <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <Link className="navbar-brand" to="/">iNotebook</Link>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/home' && 'active'}`} aria-current="page" to="/home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' && 'active'}`} to="/about">About</Link>
                            </li>
                        </ul>
                    </div>
                    <button className="btn btn-primary mx-1" onClick={handleLogout}>Logout</button>
                </div>
            </nav> :
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container d-flex justify-content-between">
                        <Link className="navbar-brand" to="/">iNotebook</Link>
                        <div>
                            <Link className={`btn btn-primary d-${location.pathname==='/login' ? 'none':''} mx-1`} to="/login" role="button">Login</Link>
                            <Link className={`btn btn-primary d-${location.pathname==='/' || location.pathname==='/signup' ? 'none':''} mx-1`} to="/signup" role="button">Signup</Link>
                        </div>
                    </div>
                </nav>}
        </>
    )
}

export default Navbar
