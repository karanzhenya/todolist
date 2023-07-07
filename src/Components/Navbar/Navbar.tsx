import React from 'react';
import s from './Navbar.module.css'

function Navbar() {
    return (
        <nav className={s.navbar}>
            <button>Login</button>
            {/*<button>LogOut</button>*/}
        </nav>
    );
}

export default Navbar;