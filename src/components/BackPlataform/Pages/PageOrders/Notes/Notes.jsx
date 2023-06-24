import style from "./Notes.module.css";

const Notes = ({ notes }) => {
    let message = null

    if (notes) {
        message = notes
    } else {
        message = "Lo más pronto posible"
    }

    return (
       <div>
            <p className={style.notes}>{message}</p>
       </div>
    );
}

export { Notes };