import style from "./Alert.module.css";

const Alert = ({ type, message, show }) => {
    return (
        <div className={`${style.alert} ${show && style.show}`}>
            <p className={style.message}>{message}</p>
        </div>
    );
}

export { Alert };