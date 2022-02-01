import React from 'react'

export default function Alert(props) {
    return (
        <div style={{height: "50px"}}>
        {props.save && <div className={`alert alert-${props.save.type} alert-dismissible fade show`} role="alert">
            <strong>{props.save.type.toUpperCase().slice(0,1) +props.save.type.slice(1)} </strong>{props.save.msg}
        </div>}
        </div>
    )
}

