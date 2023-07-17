import React from "react";
import s from './ModalStyle.module.css';

type ModalType = {
    active: boolean
    setActive: (activeStatus: boolean) => void
    children: React.ReactNode
}
const Modal = ({active, setActive, children}: ModalType) => {
    return (
        <div className={active ? `${s.modal} ${s.active}` : s.modal} onClick={() => setActive(false)}>
            <div className={active ? `${s.modal_content} ${s.active}` : s.modal_content} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default Modal;