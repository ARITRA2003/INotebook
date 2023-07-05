import React, { useContext } from 'react'
import notesContext from '../context/notes/notesContext';

function Noteitem(props) {
    const {note,updateNote,showalert} = props;
    const context=useContext(notesContext);
    const {deleteNotes}=context;


    const deleteNote =() => {
        deleteNotes(note._id);
        showalert("Note is deleted","success");
    }
    const edit=()=>{
        updateNote(note);
    }
    return (
        <div className='col-md-3 my-3'>
            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="far fa-trash-alt mx-2" onClick={deleteNote}></i>
                    <i class="fa-solid fa-file-pen" onClick={edit}></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
