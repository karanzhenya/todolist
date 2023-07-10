import React from 'react';
import s from './Navbar.module.css'
import {Link} from "react-router-dom";

function Navbar() {
    return (
        <nav className={s.navbar}>
            <Link to={'/login'}><h3>Login</h3></Link>
            {/*<button>LogOut</button>*/}
        </nav>
    );
}

export default Navbar;