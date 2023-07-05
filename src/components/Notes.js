import React, { useContext, useEffect, useRef, useState } from 'react'
import notesContext from '../context/notes/notesContext';
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom';

function Notes(props) {
    const context = useContext(notesContext);
    const { notes, getNotes ,editNotes} = context;
    const [note, setnotes] = useState({ id:"",etitle: "", edescription: "", etag: "" });
    let navigate=useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token')!==null){
            getNotes();
        }
        else{ 
            navigate('/login');
        }
        // eslint-disable-next-line
    }, []);

    const ref = useRef(null);
    const refClose = useRef(null);

    const updateNote = (currentnote) => {
        ref.current.click();
        setnotes({
            id:currentnote._id,
            etitle:currentnote.title,
            edescription:currentnote.description,
            etag:currentnote.tag,
        });
        
    }
    const handleclick = (e) => {
        refClose.current.click();
        editNotes(note.id,note.etitle,note.edescription,note.etag);
        props.showalert(" Note is Updated","success");
    }
    const onChange = (e) => {
        setnotes({ ...note, [e.target.name]: e.target.value });
    }
    return (
        <>
            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="name"  value={note.etitle} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<10} type="button" className="btn btn-primary" onClick={handleclick}>Update changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mx-3 ">
                <h1>Your Notes</h1>
                <div className="container mx-2">
                    {notes.length===0 && "Nothing is there to display"}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} showalert={props.showalert} />;
                })}
            </div>
        </>
    )
}

export default Notes
