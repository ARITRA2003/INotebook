import React from 'react';
import Notes from './Notes';
import AddNote from './AddNote';


function Home(props) {
    const {showalert}=props;
    return (
        <>
        <div className='container my-3'>
            <AddNote showalert={showalert}/>
            <Notes showalert={showalert}/>
        </div>
        </>
    )
}

export default Home
