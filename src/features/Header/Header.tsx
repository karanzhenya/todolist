import React from 'react';
import s from "./Header.module.css";
import logo from "../../files/Logo.svg";

function Header() {
    return (
        <header className={s.header}>
            <img className={s.logo} src={logo}/>
        </header>
    );
}

export default Header;