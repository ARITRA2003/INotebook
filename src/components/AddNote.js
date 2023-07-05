import React, { useContext, useState } from 'react'
import notesContext from '../context/notes/notesContext';

const AddNote = (props) => {
    const context = useContext(notesContext);
    const { addNotes } = context;
    const [notes, setnotes] = useState({ title: "", description: "", tag: "" });
    const {showalert}=props;

    const handleclick = (e) => {
        addNotes(notes.title, notes.description, notes.tag);
        setnotes({ title: "", description: "", tag: "" });
        showalert("Note is Added in your Notes","success");
    }
    const onChange = (e) => {
        setnotes({ ...notes, [e.target.name]: e.target.value });
    }

    
    return (
        <>
            <h1>Add a Note</h1>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' aria-describedby="name" value={notes.title} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' value={notes.description} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' value={notes.tag} onChange={onChange} />
                </div>
                <button disabled={notes.title.length<5 || notes.description.length<10} type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
            </form>
        </>
    )
}

export default AddNote
