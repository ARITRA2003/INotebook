import notesContext from "./notesContext";
import { useState } from "react";

const NoteState = (props) => {
  const host="http://localhost:5000";
  const notesInitial = [];

  const [notes, setnotes] = useState(notesInitial);

  //Get all Notes
  const getNotes =async () => {

    //API call
    const response = await fetch(`${host}/api/notes/getAllNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'auth-token': localStorage.getItem('token')
      },
    });
    const json=await response.json();
    setnotes(json);
  }

  //Add a note
  const addNotes =async (title, description, tag) => {

    //API call
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'auth-token':localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag}), 
    });
    const note=await response.json();
    setnotes(notes.concat(note));
  }

  //Edit a note
  const editNotes = async(id, title, description, tag) => {
     //API call
     const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
        'auth-token':localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header
    });
    const json= await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);
    //Logic to edit the client
     let currentnotes=JSON.parse(JSON.stringify(notes));
     for (let index = 0; index < currentnotes.length; index++) {                                     
      if(currentnotes[index]._id===id){
        currentnotes[index].description=description;
        currentnotes[index].title=title;
        currentnotes[index].tag=tag;
        break;
      }
     } 
     setnotes(currentnotes);
  }

  //Delete a note
  const deleteNotes = async(id) => {
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE", 
      headers: {
        "Content-Type": "application/json",
        'auth-token':localStorage.getItem('token')
      },
    });
    const json=await response.json(); 

    const newNotes = notes.filter((note) => { return (note._id !== id) });
    setnotes(newNotes);
  }

  return (
    <notesContext.Provider value={{ notes, addNotes, editNotes, deleteNotes ,getNotes}}>
      {props.children}
    </notesContext.Provider>
  )
}

export default NoteState;
