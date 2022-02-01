import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import AddNote from './AddNote';
import NoteItems from './NoteItems';
import { useHistory } from 'react-router-dom';


function Note(props) {
    const context = useContext(noteContext);
    const { notes, fetchAllNotes,editNode } = context;
    let history = useHistory();
    useEffect(() => {
        if(localStorage.getItem('token')){
            fetchAllNotes();
        }
        else{
            history.push("/login")
        }
        // eslint-disable-next-line
    }, [])
    const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: "" })
    const handleOnClick = (e) => {
        editNode(note.id,note.etitle,note.edescription,note.etag);
        refClose.current.click();
        props.showAlert("Your note is updated successfully","success")
    }
    const onChange = (text) => {
        setNote({ ...note, [text.target.name]: text.target.value })
    }
    const ref = useRef(null)
    const refClose = useRef(null)
    const updateNote = (currentNote) => {
        setNote({id: currentNote._id,etitle: currentNote.title,edescription: currentNote.description,etag: currentNote.tag})
        ref.current.click()
    }
    return (
        <>
            <AddNote showAlert={props.showAlert}/>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" onChange={onChange} value={note.etitle} className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp"  minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" onChange={onChange} value={note.edescription} className="form-control" id="edescription" name="edescription"  minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" onChange={onChange} value={note.etag} className="form-control" id="etag" name="etag" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleOnClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container my-3">
                <h2>Your Notes</h2>
                {notes.length === 0 && <h6>Add a Note to Preview it Here</h6>}
                <div className="row">
                    {notes.map((note) => {
                        return <NoteItems key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Note
