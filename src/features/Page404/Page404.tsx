import React from 'react';
import s from './Page404.module.css'
import {Link} from "react-router-dom";

function Page404() {

    return (
        <div className={s.page404}>
            <h1>
                PAGE NOT FOUND
            </h1>
            <Link to={'/'} className={s.link}><h3>Return to todolists page</h3></Link>
        </div>

    );
}

export default Page404;