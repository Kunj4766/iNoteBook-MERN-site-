import noteContext from "./notes/noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:4000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //   fetch All Notes
  const fetchAllNotes = async () => {
    // api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'jwt-token': localStorage.getItem('token')
      },
      body: JSON.stringify()
    });
    const json = await response.json();
    setNotes(json)
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //   Add Note
  const addNotes = async (title, description, tag) => {
    // api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'jwt-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json();
    // Add note ui
    setNotes(notes.concat(note));
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //   Delete Note
  const deleteNote = async (id) => {
    // api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'jwt-token': localStorage.getItem('token')
      }
    });
    const json = await response.json();
    console.log(json)
    // Delete node ui
    const newNote = notes.filter((note) => { return note._id !== id })
    setNotes(newNote);

  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //   Edite Note
  const editNode = async (id, title, description, tag) => {
    // api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'jwt-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json)
    // edit note ui
    let nweNote = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < nweNote.length; index++) {
      const element = nweNote[index];
      if (element._id === id) {
        nweNote[index].title = title
        nweNote[index].description = description
        nweNote[index].tag = tag
        break;
      }
    }
    setNotes(nweNote)
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <noteContext.Provider value={{ notes, addNotes, deleteNote, editNode, fetchAllNotes }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;