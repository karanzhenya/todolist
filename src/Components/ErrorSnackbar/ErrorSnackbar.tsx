import React, {useEffect} from 'react';
import s from './ErrorSnackbar.module.css'

type ErrorSnackbarPropsType = {
    error: string
    removeErrorMessage: () => void
}

export const ErrorSnackbar = React.memo(function ({error, removeErrorMessage}: ErrorSnackbarPropsType) {
    useEffect(() => {
        setTimeout(() => {
            removeErrorMessage()
        }, 3000)
    }, [error,removeErrorMessage])
    console.log('error snackbar')
    return (<>
            {error && <div className={s.main_block}>
                <div className={s.error_message}>{error}</div>
                <div className={s.remove_btn} onClick={removeErrorMessage}>X
                </div>
            </div>}

        </>
    );
})

export default ErrorSnackbar;