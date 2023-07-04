import s from './Preloader.module.css';

export const Preloader = () => {
    return (
        <div className={s.loader_wrapper} >
            <div className={s.loader}>
                <div className={`${s.loader} ${s.loader_inner}`}>
                </div>
            </div>
        </div>
    )
}