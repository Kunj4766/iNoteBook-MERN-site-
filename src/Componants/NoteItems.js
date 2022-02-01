import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

function NoteItems(props) {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    return (
        <div className="col-md-4 my-3 ">
            <div className="card">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <h5 className="card-title">{props.note.title}</h5>
                        <div>
                        <i role="button" className="fas fa-edit mx-2" onClick={()=>{props.updateNote(props.note)}} data-bs-toggle="tooltip" title="Edit"></i>
                        <i role="button" className="fas fa-trash-alt mx-2" onClick={()=>{deleteNote(props.note._id); props.showAlert("Note has been deleted successfully","success")}} data-bs-toggle="tooltip" title="Delete"></i>
                        </div>
                    </div>
                    <p className="card-text">{props.note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItems
