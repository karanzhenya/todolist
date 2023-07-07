import React from 'react';
import s from './Login.module.css'

function Login() {
    return (
        <div className={s.login}>
            <input placeholder={'email'}/>
            <input placeholder={'password'}/>
            <input type={"submit"}/>
        </div>
    );
}

export default Login;