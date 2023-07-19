import style from './Modal.module.css';

const Modal = ({ children, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className={style.modalOverlay}>
            <div className={style.modalContent}>
                {/* <button className={style.modalCloseButton} onClick={onClose}>
                X
                </button> */}
                {children}
            </div>
        </div>
    )
}

export { Modal };