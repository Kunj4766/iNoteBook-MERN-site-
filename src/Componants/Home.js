import React from 'react'
import Note from './Note';

function Home(props) {
    return (
        <>
            <Note showAlert={props.showAlert}/>
        </>
    )
}

export default Home;
