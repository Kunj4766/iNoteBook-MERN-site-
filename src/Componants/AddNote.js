import React,{useContext} from 'react'
import { useState } from 'react';
import noteContext from '../context/notes/noteContext'

function AddNote(props) {
    const context = useContext(noteContext)
    const { addNotes } = context;
    const [note, setNote] = useState({title:"",description:"",tag:""})
    const handleOnClick = (e)=>{
        e.preventDefault();
        addNotes(note.title,note.description,note.tag)
        setNote({title:"",description:"",tag:""})
        props.showAlert("Note has been Added successfully","success")
    }
    const onChange = (text)=>{
       setNote({...note,[text.target.name]: text.target.value})
    }
    return (
        <div className="my-3">
            <h2>Add a Note</h2>
            <form  onSubmit={handleOnClick}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" onChange={onChange} className="form-control" value={note.title} id="title" name="title" aria-describedby="emailHelp"  minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" onChange={onChange} className="form-control" value={note.description} id="description" name="description"  minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" onChange={onChange} className="form-control" value={note.tag} id="tag" name="tag"/>
                </div>
                <button type="submit" className="btn btn-primary">Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
