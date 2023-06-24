import style from './CreateButton.module.css';

const CreateButton = ({ text, disabled, onClick }) => {
    return (
        <button className={style.createButton} disabled={disabled} onClick={onClick}>
            {text}
        </button>
    );
}

export { CreateButton };