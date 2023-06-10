import style from "./BoxLayout.module.css";

const BoxLayout = ({ children, title, small }) => {
    return (
        <div className={`${style.container} ${small ? style.small : ""}`}>
            {title && <h2 className={style.title}>{title}</h2>}
            {children}
        </div>
    );
}

export { BoxLayout };