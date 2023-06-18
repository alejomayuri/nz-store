import style from './CreateButton.module.css';

const CreateButton = ({ handleRegisterProduct, formProduct, disabled, onClick }) => {
    return (
        <button className={style.createButton} disabled={disabled} onClick={onClick}>
            Agregar producto
        </button>
    );
}

export { CreateButton };