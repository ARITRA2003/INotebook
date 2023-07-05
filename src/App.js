import './App.css';
import {BrowserRouter,Route,Routes,} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/notesState';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
import Alert from './components/Alert';

function App() {
  const [alert, setalert] =useState(null);
  const showalert = (message, type) => {
    setalert({
      message: message,
      type: type
    });

    setTimeout(() => {
      setalert(null);
    }, 1000);
  }
  return (
    <>
    <NoteState>
     <BrowserRouter>
      <Navbar/>
      <Alert alert={alert} />
      <div className="container">
      <Routes>
        <Route path='/' element={<Home showalert={showalert}/>}></Route>
        <Route path='/about'  element={<About/>}></Route>
        <Route path='/login'  element={<Login showalert={showalert}/>}></Route>
        <Route path='/signup' element={<Signup showalert={showalert}/>}></Route>
      </Routes>
      </div>
     </BrowserRouter>
     </NoteState>
     </>
  );
}

export default App;
