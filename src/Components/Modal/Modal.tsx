import React from "react";
import './ModalStyle.css';

type ModalType = {
    active: boolean
    carId: string
    setActive: (activeStatus: boolean) => void
    children: React.ReactChild | React.ReactNode
}
const Modal = ({active, setActive, children, carId}: ModalType) => {
    console.log(children)
    return (
        <div className={active ? `modal active` : 'modal'} onClick={() => setActive(false)}>
            <div className={active ? 'modalContent active' : 'modalContent'} onClick={e => e.stopPropagation()}>
                {children}
                {children == '' ? <button onClick={() => console.log(carId)}>Добавить</button> : null}
            </div>
        </div>
    )
}

export default Modal;