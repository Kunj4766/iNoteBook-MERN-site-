import React from 'react'
import { Link } from "react-router-dom";

function Welcome() {
    return (
        <div style={{ marginTop: "150px" }}>
            <h1 className="text-center">Welcome to iNotebook - Yours notes in the Cloud</h1>
            <h2 className="text-center" style={{ marginTop: "50px" }}>Login or Signup to use iNotebook</h2>
            <div className="d-flex justify-content-center mt-5">
                <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
            </div>
        </div>
    )
}

export default Welcome
