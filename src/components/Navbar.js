import React,{useEffect} from 'react'
import { Link ,useLocation, useNavigate} from 'react-router-dom'

function Navbar() {
    let location = useLocation();
    useEffect(() => {
      console.log(location.pathname);
    }, [location]);

    let navigate=useNavigate();
    const handleLogout =()=>{
        localStorage.removeItem('token');
        navigate('/login');
    }
    
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Link className="navbar-brand" to="/">Navbar</Link>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${(location.pathname==='/')? "active" : "" }`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${(location.pathname==='/about')? "active" : "" }`} to="/about">About</Link>
                        </li>
                    </ul>
                    {(!localStorage.getItem('token'))?      <form className="d-flex" role="search">
                            <Link className="btn btn-outline-success mx-1" type="submit" to="/login">Login</Link>
                            <Link className="btn btn-outline-success mx-1" type="submit" to="/signup">SignUp</Link>
                    </form> : <button className="btn btn-outline-success mx-1" onClick={handleLogout}  >LogOut</button>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
